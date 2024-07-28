import { groupsNames as bachelorGroupsNames } from './bachelor';
import { groupsNames as masterGroupsNames } from './master';
import { Group, GroupsDictionary } from './models';
import { BaseWithScore, getData } from './shared';

export function toGroupEntities(entitiesData: Array<BaseWithScore>): ReadonlyArray<Group> {
  return entitiesData.map<Group>(entity => {
    const score = entity.score ?? 0;
    delete entity.score;

    const groupEntity: Group = entity as Group;
    groupEntity.members = score;

    return groupEntity;
  });
}

const groupNames: GroupsDictionary[0] = {
  ...bachelorGroupsNames[1],
  ...bachelorGroupsNames[2],
  ...bachelorGroupsNames[3],
  ...masterGroupsNames[1],
  ...masterGroupsNames[2]
};

export default async function getGroups() {
  return toGroupEntities(await getData('groups', Object.values(groupNames)));
}
