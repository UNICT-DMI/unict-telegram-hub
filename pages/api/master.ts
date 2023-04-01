import { NextApiRequest, NextApiResponse } from 'next';
import { Group, GroupsDictionary, GroupsDictionaryValue } from '../../models/api/Entity';
import { BaseWithScore, getData } from '../../shared/api';

const groupsNames: Omit<GroupsDictionary, 3> = {
  1: {
    'Multimedia LM - 18': { suffix: 'AAAAAEumJdcVYjQrSQkZhA', teamsCodes: ['28vtwgp'] },
    'Quality Development Chat': { suffix: 'W3UhKxQBI5llMTBk', teamsCodes: [] },
    'Algoritmi e Complessità': { suffix: 'UFeehWFHAlXlw5Mx', teamsCodes: ['d73lytc'] },
    Ottimizzazione: { suffix: 'qMgNPeZexoY0ZTlk', teamsCodes: ['f6olju2'] },
    '[Discussione] Multimedia - LM 18': { suffix: 'AAAAAE5nRXgGkTCJtuOEAA', teamsCodes: [] },
    'Machine Learning': { suffix: 'OTvdQqj2moRkZjY0', teamsCodes: ['j8rls3j'] },
    'Fondamenti di Analisi Dati': { suffix: 'ksHSJBVZ5PIxNDg0', teamsCodes: ['wjbote3'] },
    'Ingegneria dei sistemi distribuiti': { suffix: 'MB3YVAEQY_4zMzBk', teamsCodes: ['g0le51h'] },
    Crittografia: { suffix: 'PKQX0uRHRe83OTA0', teamsCodes: ['hc9v2gu'] },
    'Analisi Numerica': { suffix: 'xg891RSBurRkYzE0', teamsCodes: ['a02uce2'] },
    'Computer Vision': { suffix: 'diqNm3HZl7RhZTQ0', teamsCodes: ['sf90883'] },
    'Big Data': { suffix: 'w6H7lVHZ1u4yNmI0', teamsCodes: ['zlpjgic'] },
    'Programmazione di sistemi robotici autonomi': {
      suffix: 'WFxDB7MXHoU2YTc0',
      teamsCodes: ['ipwouav']
    },
    'Blockchain e cryptocurrencies': { suffix: 'EwsEQ73HrVk3OWE0', teamsCodes: ['c2ipibm'] },
    'Computer Security': { suffix: 'Fp_HFGCEBJU5ODU0', teamsCodes: ['x43kd4z'] },
    'Computazione naturale': { suffix: 'ahhcCKsjgEMzZjFk', teamsCodes: ['0w88ij6'] },
    Computabilità: { suffix: '7GlWLbrErlNlNDg8', teamsCodes: ['kyprfw2'] },
    'Fondamenti e linguaggi programmazione distribuita': {
      suffix: 'T2wegyZNpUJlNGI0',
      teamsCodes: ['8ea329g']
    }
  },
  2: {
    'Sistemi Cloud e IOT': { suffix: 'h3gtICXW8GIyMGNk', teamsCodes: ['ru8x5mv'] },
    'Ulteriori conoscenze linguistiche (lingua Inglese)': {
      suffix: 'GKebv14N1b4wZjE0',
      teamsCodes: []
    },
    'Deep Learning': { suffix: '_yX8D62T8uMzNGFk', teamsCodes: ['t3hnzcx'] },
    'Intelligenza artificiale': { suffix: 'EyELTlor4RAwYzc8', teamsCodes: ['9i6ixq5'] },
    'Web Reasoning': { suffix: '_Wg21aMzr-Q0MzY0', teamsCodes: ['zso2z7h'] },
    'Cryptographic Engineering': { suffix: 'HTyEI5p28igwMmY0', teamsCodes: ['69va22r'] },
    Bioinformatica: { suffix: 'XX-L7grTCiIzZTE0', teamsCodes: ['35pfgd1'] },
    'Quantum Computer Programming': { suffix: 'HK0BmnYU-Qo5Yzlk', teamsCodes: [] },
    'Peer to peer and wireless networks': { suffix: 'od3MHOJfR902ODc0', teamsCodes: ['cdt2hgq'] },
    'Internet of Things 2023': { suffix: 'rWH6-dQ_Ne9hYjY0', teamsCodes: [] },
    'Advanced Programming Languages': { suffix: 'yPANgE6Xe944MWY8', teamsCodes: ['uq0embk'] },
    'Tecnologie per i servizi web': { suffix: 'zXnJqudnIpEyMzM0', teamsCodes: [] },
    'Linguaggi Formali': { suffix: 'hanuZx52W29mZGU0', teamsCodes: ['28xafrz'] }
  }
};

function toGroupEntities(
  entitiesData: Array<BaseWithScore>,
  teamsCodes?: ReadonlyArray<GroupsDictionaryValue['teamsCodes']>
): ReadonlyArray<Group> {
  return entitiesData.map<Group>((entity, index) => {
    const score = entity.score ?? 0;
    delete entity.score;

    const groupEntity: Group = entity as Group;
    groupEntity.members = score;

    if (teamsCodes) {
      groupEntity.code = teamsCodes[index][0];
    }

    return groupEntity;
  });
}

function returnGroupEntities(
  groupEntities: Array<BaseWithScore>,
  res: NextApiResponse<ReadonlyArray<Group>>,
  teamsCodes?: ReadonlyArray<GroupsDictionaryValue['teamsCodes']>
): void {
  res.json(toGroupEntities(groupEntities, teamsCodes));
}

export default function handler(req: NextApiRequest, res: NextApiResponse<ReadonlyArray<Group>>) {
  const year = (req.query.year as '1' | '2' | undefined) ?? '1';
  getData('master', Object.values(groupsNames[year]), returnGroupEntities, res, year);
}
