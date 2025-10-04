import { groupsNames as bachelorGroupsNames } from './bachelor';
import { groupsNames as masterGroupsNames } from './master';
import { Group, GroupEntry } from './models';
import { BaseWithScore, getData } from './shared';

const groupNames: ReadonlyArray<GroupEntry> = [...bachelorGroupsNames.flat(), ...masterGroupsNames.flat()];

export function toGroupEntities(entitiesData: Array<BaseWithScore>): ReadonlyArray<Group> {
  return entitiesData.map<Group>(entity => {
    const score = entity.score ?? 0;
    delete entity.score;

    const groupEntity = entity as Group;
    groupEntity.members = score;

    return groupEntity;
  });
}

export default async function getGroups() {
  return toGroupEntities(await getData('groups', groupNames));
}
