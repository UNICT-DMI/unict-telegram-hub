import { toGroupEntities } from './groups';
import { GroupsDictionary, GroupsYear } from './models';
import { getData } from './shared';

export const groupsNames: Omit<GroupsDictionary, GroupsYear.AllYears | GroupsYear.Third> = {
  1: {
    'Multimedia LM - 18': { suffix: 'AAAAAEumJdcVYjQrSQkZhA', teamsCodes: ['28vtwgp'] },
    'Quality Development Chat': { suffix: 'W3UhKxQBI5llMTBk', teamsCodes: [] },
    'Algoritmi e Complessità': { suffix: 'UFeehRZWhBcFlG7X', teamsCodes: ['d73lytc'] },
    Ottimizzazione: { suffix: 'qMgNPeZexoY0ZTlk', teamsCodes: ['f6olju2'] },
    '[Discussione] Multimedia - LM 18': { suffix: 'AAAAAE5nRXgGkTCJtuOEAA', teamsCodes: [] },
    'Machine Learning': { suffix: 'OTvdQqj2moRkZjY0', teamsCodes: ['j8rls3j'] },
    'Fondamenti di Analisi Dati': { suffix: 'ksHSJBVZ5PIxNDg0', teamsCodes: ['wjbote3'] },
    'Ingegneria dei sistemi distribuiti': { suffix: 'MB3YVAEQY_4zMzBk', teamsCodes: ['g0le51h'] },
    Crittografia: { suffix: 'PKQX0uRHRe83OTA0', teamsCodes: ['hc9v2gu'] },
    'Analisi Numerica': { suffix: 'xg891RSBurRkYzE0', teamsCodes: ['87fsubo'] },
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

export default async function getMasterGroups() {
  const allYearsGroupNames = { ...groupsNames[1], ...groupsNames[2] };
  return toGroupEntities(await getData('master', Object.values(allYearsGroupNames), '123'));
}
