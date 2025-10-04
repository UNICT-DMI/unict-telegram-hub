import { toGroupEntities } from './groups';
import { Groups } from './models';
import { getData } from './shared';

export const groupsNames: Groups = [
  [
    { title: 'Multimedia LM - 18', suffix: 'AAAAAEumJdcVYjQrSQkZhA', teamsCodes: ['28vtwgp'] },
    { title: 'Quality Development Chat', suffix: 'W3UhKxQBI5llMTBk', teamsCodes: [] },
    { title: 'Algoritmi e Complessità', suffix: 'UFeehRZWhBcFlG7X', teamsCodes: ['d73lytc'] },
    { title: 'Ottimizzazione', suffix: 'qMgNPeZexoY0ZTlk', teamsCodes: ['f6olju2'] },
    { title: '[Discussione] Multimedia - LM 18', suffix: 'AAAAAE5nRXgGkTCJtuOEAA', teamsCodes: [] },
    { title: 'Machine Learning', suffix: 'OTvdQqj2moRkZjY0', teamsCodes: ['j8rls3j'] },
    { title: 'Fondamenti di Analisi Dati', suffix: 'ksHSJBVZ5PIxNDg0', teamsCodes: ['wjbote3'] },
    { title: 'Ingegneria dei sistemi distribuiti', suffix: 'MB3YVAEQY_4zMzBk', teamsCodes: ['g0le51h'] },
    { title: 'Crittografia', suffix: 'PKQX0uRHRe83OTA0', teamsCodes: ['hc9v2gu'] },
    { title: 'Analisi Numerica', suffix: 'xg891RSBurRkYzE0', teamsCodes: ['87fsubo'] },
    { title: 'Computer Vision', suffix: 'diqNm3HZl7RhZTQ0', teamsCodes: ['sf90883'] },
    { title: 'Big Data', suffix: 'w6H7lVHZ1u4yNmI0', teamsCodes: ['zlpjgic'] },
    { title: 'Programmazione di sistemi robotici autonomi', suffix: 'WFxDB7MXHoU2YTc0', teamsCodes: ['ipwouav'] },
    { title: 'Blockchain e cryptocurrencies', suffix: 'EwsEQ73HrVk3OWE0', teamsCodes: ['c2ipibm'] },
    { title: 'Computer Security', suffix: 'Fp_HFGCEBJU5ODU0', teamsCodes: ['x43kd4z'] },
    { title: 'Computazione naturale', suffix: 'ahhcCKsjgEMzZjFk', teamsCodes: ['0w88ij6'] },
    { title: 'Computabilità', suffix: '7GlWLbrErlNlNDg8', teamsCodes: ['kyprfw2'] },
    { title: 'Fondamenti e linguaggi programmazione distribuita', suffix: 'T2wegyZNpUJlNGI0', teamsCodes: ['8ea329g'] }
  ],
  [
    { title: 'Sistemi Cloud e IOT', suffix: 'h3gtICXW8GIyMGNk', teamsCodes: ['ru8x5mv'] },
    { title: 'Ulteriori conoscenze linguistiche (lingua Inglese)', suffix: 'GKebv14N1b4wZjE0', teamsCodes: [] },
    { title: 'Deep Learning', suffix: '_yX8D62T8uMzNGFk', teamsCodes: ['t3hnzcx'] },
    { title: 'Intelligenza artificiale', suffix: 'EyELTlor4RAwYzc8', teamsCodes: ['9i6ixq5'] },
    { title: 'Web Reasoning', suffix: '_Wg21aMzr-Q0MzY0', teamsCodes: ['zso2z7h'] },
    { title: 'Cryptographic Engineering', suffix: 'HTyEI5p28igwMmY0', teamsCodes: ['69va22r'] },
    { title: 'Bioinformatica', suffix: 'XX-L7grTCiIzZTE0', teamsCodes: ['35pfgd1'] },
    { title: 'Quantum Computer Programming', suffix: 'HK0BmnYU-Qo5Yzlk', teamsCodes: [] },
    { title: 'Peer to peer and wireless networks', suffix: 'od3MHOJfR902ODc0', teamsCodes: ['cdt2hgq'] },
    { title: 'Internet of Things 2023', suffix: 'rWH6-dQ_Ne9hYjY0', teamsCodes: [] },
    { title: 'Advanced Programming Languages', suffix: 'yPANgE6Xe944MWY8', teamsCodes: ['uq0embk'] },
    { title: 'Tecnologie per i servizi web', suffix: 'zXnJqudnIpEyMzM0', teamsCodes: [] },
    { title: 'Linguaggi Formali', suffix: 'hanuZx52W29mZGU0', teamsCodes: ['28xafrz'] },
    { title: 'Vulnerability assessment e penetration testing (VAPT)', suffix: '', teamsCodes: ['r1lzo7s'] }
  ]
];

export default async function getMasterGroups() {
  return toGroupEntities(await getData('master', groupsNames.flat(), '123'));
}
