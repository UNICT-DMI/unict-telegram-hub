import type { NextApiRequest, NextApiResponse } from 'next';
import { Group } from '../../models/api/Entity';
import { getGroups } from './groups';

export default function handler(req: NextApiRequest, res: NextApiResponse<Array<Group> | void>) {
  getGroups(['PRIMO_ANNO_MAGISTRALE', 'SECONDO_ANNO_MAGISTRALE'], req.query.year, res);
}
