import type { NextApiRequest, NextApiResponse } from 'next';
import { Group } from '../../models/api/Entity';

async function getData(groupName: string, year: string): Promise<Group> {
  const newGroup: Group = {} as Group;

  await fetch(`${process.env.API}/mid.php?path=GRUPPI/${year}/${groupName}.json`)
    .then(res => res.json())
    .then(data => {
      const tmpLink: string = data.link;
      newGroup.title = groupName;
      newGroup.link = tmpLink.substring(1, tmpLink.length - 1);
      newGroup.description = data.description;
      newGroup.pictureURL = data.image_link.substring(1);
      const tmpMembers: string[] = (data.members_number as string).split(' ');
      newGroup.members = parseInt(tmpMembers[0], 10);
      newGroup.code = data.code;
      newGroup.mz_code = data.mzcode;
    });

  return newGroup;
}

async function getGroups(year: string): Promise<Array<Group>> {
  return fetch(`${process.env.API}/mid.php?path=GRUPPI/${year}.json`)
    .then(res => res.json())
    .then(data => {
      return data.names as string[];
    })
    .then(groupsNames => Promise.all(groupsNames.map(groupName => getData(groupName, year))));
}

function compareMembers(a: Group, b: Group): number {
  if (a.members < b.members) return 1;
  if (a.members > b.members) return -1;
  return 0;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Array<Group> | void>) {
  const years = ['PRIMO_ANNO', 'SECONDO_ANNO', 'TERZO_ANNO'];

  if (req.query.year === '1' || req.query.year === '2' || req.query.year === '3') {
    getGroups(years[parseInt(req.query.year) - 1])
      .then(groups => {
        groups.sort(compareMembers);
        res.send(groups);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send();
      });
  } else {
    console.error('Invalid "year" query parameter value');
    res.status(500).send([]);
  }
}
