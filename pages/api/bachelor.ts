import { NextApiRequest, NextApiResponse } from 'next';
import { Group } from '../../models/api/Entity';
import { BaseWithScore, getData } from '../../shared/api';

const groupsNames: Record<1 | 2 | 3, Record<string, string>> = {
  1: {
    'PROGRAMMAZIONE I E LABORATORIO': 'CBrlIVEAFB-nRjAvEnDdkw',
    'ELEMENTI DI ANALISI MATEMATICA 1': 'CBrlIVQ8_DPFaQGHETxGjw',
    'FONDAMENTI DI INFORMATICA': 'CBrlIVSBNrdJNkk53o08tA',
    'PROGRAMMAZIONE II': 'CBrlIU3bfvqPTBfF11iOow',
    'ALGEBRA LINEARE E GEOMETRIA': 'CBrlIU3QBjfWP-EUJcFgZg',
    'ARCHITETTURA DEGLI ELABORATORI E LABORATORIO': 'CBrlIVVU5S_SCyQBL-fSOw',
    'STRUTTURE DISCRETE': 'CBrlIVkSPZRNcpri3AofUA',
    'ULTERIORI CONOSCENZE LINGUISTICHE': 'CBrlIU649nHwSICrddW5Vw',
    'Quality Development Chat': 'W3UhKxQBI5llMTBk'
  },
  2: {
    'SISTEMI OPERATIVI': 'CBrlIVFOiMah4AXblVULjg',
    'RETI DI CALCOLATORI': 'CBrlIVdKV2ynosTCF6FXDw',
    'INGEGNERIA DEL SOFTWARE': 'CBrlIVk9UxA4dL45yDiKOg',
    'ALGORITMI E LABORATORIO': 'CBrlIUVDCCJ38sE87xIcgg',
    'BASI DI DATI': 'CBrlIRtpLNU_A2KwNmwVhg',
    '[Discussione] Interazione e Multimedia L-31': 'BKvM41e9Tg7uTwz8kHj-wQ',
    'ELEMENTI DI ANALISI MATEMATICA 2': 'CBrlIVTJ76lA5HGYfjJtcg'
  },
  3: {
    'Web Development 2022': 'AZhFaRsSN9W3cfcXYi4PDA',
    'METODI MATEMATICI E STATISTICI': 'CBrlIVFVIfl_w8WhReAZPg',
    FISICA: 'CBrlIUeuTu5odGt6eRgOpA',
    'STARTUP DI IMPRESA E MODELLI DI BUSINESS': 'CBrlIU0DaBKsxNErRZ5njQ',
    'TECNOLOGIE PER I SISTEMI DISTRIBUITI E IL WEB CON LABORATORIO': 'CBrlIVIOYEycrYL7MP3hQQ',
    tap: 'DPCishPgqXBxeWUbrUKyCg',
    'INTRODUZIONE AL DATA MINING': 'CBrlIVVLvys5ud9dYiWCyw',
    'INTERNET SECURITY': 'CBrlIUTyTMASy6PmH-QSTQ',
    'PROGRAMMAZIONE MOBILE': 'CBrlIVYAvOA_ojVVh27acw',
    'COMPUTER GRAFICA': 'CBrlIUWYpjRgjchQWwouUA',
    'IT LAW': 'CBrlIVYsN-0wnWb_bECbXA',
    'DIGITAL FORENSICS': 'CBrlIVcja2kE2R5NoMGLww',
    'SVILUPPO DI GIOCHI DIGITALI': 'CBrlIUO9fK2DGryQA1uNxw',
    'SOCIAL MEDIA MANAGEMENT': 'CBrlIUvKnmOSU7JAEG4Dkg',
    'LABORATORIO DI SISTEMI A MICROCONTROLLORE': 'CBrlIU61FgAEE3SgYXMadg',
    'PROGRAMMAZIONE PARALLELA SU ARCHITETTURE GPU': 'CBrlIVAlAFfpGlVDLm7SNQ',
    'INFORMATICA MUSICALE': 'CBrlIURbPezFW11x1Z386A',
    'SISTEMI CENTRALI': 'CBrlIUiemx0FlarkbsqG8w',
    'CALCOLO NUMERICO': 'CBrlIVY39wvx6i6ERrVPQw'
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
  const year = (req.query.year as '1' | '2' | '3' | undefined) ?? '1';
  getData('bachelor', Object.values(groupsNames[year]), returnGroupEntities, res, year);
}
