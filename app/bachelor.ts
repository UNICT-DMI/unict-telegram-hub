import { toGroupEntities } from './groups';
import { GroupsDictionary, GroupsYear } from './models';
import { getData } from './shared';

export const groupsNames: Omit<GroupsDictionary, GroupsYear.AllYears> = {
  1: {
    'PROGRAMMAZIONE I E LABORATORIO': {
      suffix: 'CBrlIVEAFB-nRjAvEnDdkw',
      teamsCodes: ['2v8sv7c', 'qtrs803']
    },
    'ELEMENTI DI ANALISI MATEMATICA 1': {
      suffix: 'CBrlIVQ8_DPFaQGHETxGjw',
      teamsCodes: ['d6xcbpr', 'lp5w1fv']
    },
    'FONDAMENTI DI INFORMATICA': {
      suffix: 'CBrlIVSBNrdJNkk53o08tA',
      teamsCodes: ['ejrynpm', 'c2j8hks']
    },
    'PROGRAMMAZIONE II': { suffix: 'CBrlIU3bfvqPTBfF11iOow', teamsCodes: ['lmygl88', '2a1gpff'] },
    'ALGEBRA LINEARE E GEOMETRIA': {
      suffix: 'CBrlIU3QBjfWP-EUJcFgZg',
      teamsCodes: ['tv73vxy', '7ul1o62']
    },
    'ARCHITETTURA DEGLI ELABORATORI E LABORATORIO': {
      suffix: 'CBrlIVVU5S_SCyQBL-fSOw',
      teamsCodes: ['75p16zi', 'ng7jsih']
    },
    'STRUTTURE DISCRETE': { suffix: 'CBrlIVkSPZRNcpri3AofUA', teamsCodes: ['nn0ukwu', 'vmwcsyn'] },
    'ULTERIORI CONOSCENZE LINGUISTICHE': {
      suffix: 'CBrlIU649nHwSICrddW5Vw',
      teamsCodes: ['tf42bu0']
    },
    'Quality Development Chat': { suffix: 'W3UhKxQBI5llMTBk', teamsCodes: [] }
  },
  2: {
    'SISTEMI OPERATIVI': { suffix: 'CBrlIVFOiMah4AXblVULjg', teamsCodes: ['i412gv5', 'qlxao81'] },
    'RETI DI CALCOLATORI': { suffix: 'CBrlIVdKV2ynosTCF6FXDw', teamsCodes: ['wro3re7'] },
    'INGEGNERIA DEL SOFTWARE': { suffix: 'CBrlIVk9UxA4dL45yDiKOg', teamsCodes: ['0dg7gab'] },
    'ALGORITMI E LABORATORIO': {
      suffix: 'CBrlIUVDCCJ38sE87xIcgg',
      teamsCodes: ['jm6xvd6', '5llo7w4']
    },
    'BASI DI DATI': { suffix: 'CBrlIRtpLNU_A2KwNmwVhg', teamsCodes: ['zcndn3g', 'cp6ryjr'] },
    'ELEMENTI DI ANALISI MATEMATICA 2': {
      suffix: 'CBrlIVTJ76lA5HGYfjJtcg',
      teamsCodes: ['63og1li', '0wdw57b']
    }
  },
  3: {
    'Web Development 2022': { suffix: 'AZhFaRsSN9W3cfcXYi4PDA', teamsCodes: ['j0bqg8n'] },
    'METODI MATEMATICI E STATISTICI': { suffix: 'CBrlIVFVIfl_w8WhReAZPg', teamsCodes: ['jy5rnn8'] },
    FISICA: { suffix: 'CBrlIUeuTu5odGt6eRgOpA', teamsCodes: ['qd3vr5p'] },
    'STARTUP DI IMPRESA E MODELLI DI BUSINESS': {
      suffix: 'CBrlIU0DaBKsxNErRZ5njQ',
      teamsCodes: ['jdy4mk5']
    },
    'TECNOLOGIE PER I SISTEMI DISTRIBUITI E IL WEB CON LABORATORIO': {
      suffix: 'CBrlIVIOYEycrYL7MP3hQQ',
      teamsCodes: ['bfei9jj']
    },
    tap: { suffix: 'DPCishPgqXBxeWUbrUKyCg', teamsCodes: ['cwecmqh'] },
    'INTRODUZIONE AL DATA MINING': { suffix: 'CBrlIVVLvys5ud9dYiWCyw', teamsCodes: ['9n8fwtm'] },
    'INTERNET SECURITY': { suffix: 'CBrlIUTyTMASy6PmH-QSTQ', teamsCodes: ['a6vfkk5'] },
    'PROGRAMMAZIONE MOBILE': { suffix: 'CBrlIVYAvOA_ojVVh27acw', teamsCodes: ['pdzgqm8'] },
    'COMPUTER GRAFICA': { suffix: 'CBrlIUWYpjRgjchQWwouUA', teamsCodes: ['mnzsn9j'] },
    'IT LAW': { suffix: 'CBrlIVYsN-0wnWb_bECbXA', teamsCodes: ['hob6saf'] },
    'DIGITAL FORENSICS': { suffix: 'CBrlIVcja2kE2R5NoMGLww', teamsCodes: ['2jc74j2'] },
    'SVILUPPO DI GIOCHI DIGITALI': { suffix: 'CBrlIUO9fK2DGryQA1uNxw', teamsCodes: ['x7fuqlt'] },
    'SOCIAL MEDIA MANAGEMENT': { suffix: 'CBrlIUvKnmOSU7JAEG4Dkg', teamsCodes: ['e4mbxsj'] },
    'LABORATORIO DI SISTEMI A MICROCONTROLLORE': {
      suffix: 'CBrlIU61FgAEE3SgYXMadg',
      teamsCodes: ['618usrd']
    },
    'PROGRAMMAZIONE PARALLELA SU ARCHITETTURE GPU': {
      suffix: 'CBrlIVAlAFfpGlVDLm7SNQ',
      teamsCodes: ['3icuged']
    },
    'INFORMATICA MUSICALE': { suffix: 'CBrlIURbPezFW11x1Z386A', teamsCodes: ['7p26czo'] },
    'SISTEMI CENTRALI': { suffix: 'CBrlIUiemx0FlarkbsqG8w', teamsCodes: ['bs923lh'] },
    'CALCOLO NUMERICO': { suffix: 'CBrlIVY39wvx6i6ERrVPQw', teamsCodes: [] }
  }
};

export default async function getBachelorGroups() {
  const allYearsGroupNames = { ...groupsNames[1], ...groupsNames[2], ...groupsNames[3] };
  return toGroupEntities(await getData('bachelor', Object.values(allYearsGroupNames), '123'));
}
