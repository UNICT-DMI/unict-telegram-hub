import type { NextApiRequest, NextApiResponse } from 'next';
import { Group } from '../../models/api/Entity';

async function getNames(year: string): Promise<Array<string>> {
  return fetch(`${process.env.API}/mid.php?path=GRUPPI/${year}.json`)
    .then(res => res.json())
    .then(data => {
      return data.names as string[];
    });
}

async function getData(groupName: string, year: string): Promise<Group> {
  const newGroup: Group = {} as Group;

  await fetch(`${process.env.API}/mid.php?path=GRUPPI/${year}/${groupName}.json`)
    .then(res => res.json())
    .then(data => {
      const tmpLink: string = data.link;
      newGroup.title = groupName;
      newGroup.link = tmpLink.substring(1, tmpLink.length - 1);
      newGroup.description = data.description;
      newGroup.pictureURL = data.image_link.substring(1, data.image_link.length - 1);
      const tmpMembers: string[] = (data.members_number as string).split(' ');
      newGroup.members = parseInt(tmpMembers[0], 10);
      newGroup.code = data.code;
      newGroup.mz_code = data.mzcode;
    });

  return newGroup;
}

function compareMembers(a: Group, b: Group): number {
  if (a.members < b.members) return 1;
  if (a.members > b.members) return -1;
  return 0;
}

export function getGroups(
  yearsStrings: Array<string>,
  year: NextApiRequest['query'][string],
  res: NextApiResponse<Array<Group>>
): void {
  try {
    if (year && typeof year === 'string') {
      const specificYear = yearsStrings[parseInt(year) - 1];

      if (specificYear) {
        getNames(specificYear)
          .then(groupsNames =>
            Promise.all(groupsNames.map(groupName => getData(groupName, specificYear)))
          )
          .then(groups => {
            groups.sort(compareMembers);
            res.send(groups);
          });
      } else {
        throw new Error('Specified "year" query parameter value is not in range of allowed values');
      }
    } else throw new Error('Missing or invalid "year" query parameter value');
  } catch (e) {
    console.error(e);
    res.status(500).send([]);
  }
}
