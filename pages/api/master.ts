import { NextApiRequest, NextApiResponse } from 'next';
import { Group } from '../../models/api/Entity';
import { BaseWithScore, getData } from '../../shared/api';

const groupsNames: Record<1 | 2, Record<string, string>> = {
  1: {
    'Multimedia LM - 18': 'AAAAAEumJdcVYjQrSQkZhA',
    'Quality Development Chat': 'W3UhKxQBI5llMTBk',
    'Algoritmi e Complessità': 'UFeehWFHAlXlw5Mx',
    Ottimizzazione: 'qMgNPeZexoY0ZTlk',
    '[Discussione] Multimedia - LM 18': 'AAAAAE5nRXgGkTCJtuOEAA',
    'Machine Learning': 'OTvdQqj2moRkZjY0',
    'Fondamenti di Analisi Dati': 'ksHSJBVZ5PIxNDg0',
    'Ingegneria dei sistemi distribuiti': 'MB3YVAEQY_4zMzBk',
    Crittografia: 'PKQX0uRHRe83OTA0',
    'Analisi Numerica': 'xg891RSBurRkYzE0',
    'Computer Vision': 'diqNm3HZl7RhZTQ0',
    'Big Data': 'w6H7lVHZ1u4yNmI0',
    'Programmazione di sistemi robotici autonomi': 'WFxDB7MXHoU2YTc0',
    'Blockchain e cryptocurrencies': 'EwsEQ73HrVk3OWE0',
    'Computer Security': 'Fp_HFGCEBJU5ODU0',
    'Computazione naturale': 'ahhcCKsjgEMzZjFk',
    Computabilità: '7GlWLbrErlNlNDg8',
    'Fondamenti e linguaggi programmazione distribuita': 'T2wegyZNpUJlNGI0'
  },
  2: {
    'Sistemi Cloud e IOT': 'h3gtICXW8GIyMGNk',
    'Ulteriori conoscenze linguistiche (lingua Inglese)': 'GKebv14N1b4wZjE0',
    'Deep Learning': '_yX8D62T8uMzNGFk',
    'Intelligenza artificiale': 'EyELTlor4RAwYzc8',
    'Web Reasoning': '_Wg21aMzr-Q0MzY0',
    'Cryptographic Engineering': 'HTyEI5p28igwMmY0',
    Bioinformatica: 'XX-L7grTCiIzZTE0',
    'Quantum Computer Programming': 'HK0BmnYU-Qo5Yzlk',
    'Peer to peer and wireless networks': 'od3MHOJfR902ODc0',
    'Internet of Things 2023': 'rWH6-dQ_Ne9hYjY0',
    'Advanced Programming Languages': 'yPANgE6Xe944MWY8',
    'Tecnologie per i servizi web': 'zXnJqudnIpEyMzM0',
    'Linguaggi Formali': 'hanuZx52W29mZGU0'
  }
};

function toGroupEntities(entitiesData: Array<BaseWithScore>): ReadonlyArray<Group> {
  return entitiesData.map<Group>(entity => {
    const score = entity.score ?? 0;
    delete entity.score;

    const groupEntity: Group = entity as Group;
    groupEntity.members = score;

    return groupEntity;
  });
}

function returnGroupEntities(
  groupEntities: Array<BaseWithScore>,
  res: NextApiResponse<ReadonlyArray<Group>>
): void {
  res.json(toGroupEntities(groupEntities));
}

export default function handler(req: NextApiRequest, res: NextApiResponse<ReadonlyArray<Group>>) {
  const year = (req.query.year as '1' | '2' | undefined) ?? '1';
  getData('master', Object.values(groupsNames[year]), returnGroupEntities, res, year);
}
