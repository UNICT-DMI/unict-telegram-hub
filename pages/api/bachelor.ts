import type { NextApiRequest, NextApiResponse } from 'next';
import { Group } from '../../models/api/Entity';
import { getGroups } from './groups';

export default function handler(req: NextApiRequest, res: NextApiResponse<Array<Group>>) {
  getGroups(['PRIMO_ANNO', 'SECONDO_ANNO', 'TERZO_ANNO'], req.query.year, res);
}
