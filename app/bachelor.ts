import { toGroupEntities } from './groups';
import { Groups } from './models';
import { getData } from './shared';

export const groupsNames: Groups = [
  [
    {
      title: 'PROGRAMMAZIONE I E LABORATORIO',
      suffix: 'CBrlIVEAFB-nRjAvEnDdkw',
      teamsCodes: ['2v8sv7c', 'qtrs803']
    },
    {
      title: 'ELEMENTI DI ANALISI MATEMATICA 1',
      suffix: 'CBrlIVQ8_DPFaQGHETxGjw',
      teamsCodes: ['d6xcbpr', 'lp5w1fv']
    },
    {
      title: 'FONDAMENTI DI INFORMATICA',
      suffix: 'CBrlIVSBNrdJNkk53o08tA',
      teamsCodes: ['ejrynpm', 'c2j8hks']
    },
    {
      title: 'PROGRAMMAZIONE II',
      suffix: 'CBrlIU3bfvqPTBfF11iOow',
      teamsCodes: ['lmygl88', '2a1gpff']
    },
    {
      title: 'ALGEBRA LINEARE E GEOMETRIA',
      suffix: 'CBrlIU3QBjfWP-EUJcFgZg',
      teamsCodes: ['tv73vxy', '7ul1o62']
    },
    {
      title: 'ARCHITETTURA DEGLI ELABORATORI E LABORATORIO',
      suffix: 'CBrlIVVU5S_SCyQBL-fSOw',
      teamsCodes: ['75p16zi', 'ng7jsih']
    },
    {
      title: 'STRUTTURE DISCRETE',
      suffix: 'CBrlIVkSPZRNcpri3AofUA',
      teamsCodes: ['nn0ukwu', 'vmwcsyn']
    },
    {
      title: 'ULTERIORI CONOSCENZE LINGUISTICHE',
      suffix: 'CBrlIU649nHwSICrddW5Vw',
      teamsCodes: ['tf42bu0']
    },
    {
      title: 'Quality Development Chat',
      suffix: 'W3UhKxQBI5llMTBk',
      teamsCodes: []
    }
  ],
  [
    {
      title: 'SISTEMI OPERATIVI',
      suffix: 'CBrlIVFOiMah4AXblVULjg',
      teamsCodes: ['i412gv5', 'qlxao81']
    },
    {
      title: 'RETI DI CALCOLATORI',
      suffix: 'CBrlIVdKV2ynosTCF6FXDw',
      teamsCodes: ['wro3re7']
    },
    {
      title: 'INGEGNERIA DEL SOFTWARE',
      suffix: 'CBrlIVk9UxA4dL45yDiKOg',
      teamsCodes: ['0dg7gab']
    },
    {
      title: 'ALGORITMI E LABORATORIO',
      suffix: 'CBrlIUVDCCJ38sE87xIcgg',
      teamsCodes: ['jm6xvd6', '5llo7w4']
    },
    {
      title: 'BASI DI DATI',
      suffix: 'CBrlIRtpLNU_A2KwNmwVhg',
      teamsCodes: ['zcndn3g', 'cp6ryjr']
    },
    {
      title: 'ELEMENTI DI ANALISI MATEMATICA 2',
      suffix: 'CBrlIVTJ76lA5HGYfjJtcg',
      teamsCodes: ['63og1li', '0wdw57b']
    }
  ],
  [
    {
      title: 'Web Development 2022',
      suffix: 'AZhFaRsSN9W3cfcXYi4PDA',
      teamsCodes: ['j0bqg8n']
    },
    {
      title: 'METODI MATEMATICI E STATISTICI',
      suffix: 'CBrlIVFVIfl_w8WhReAZPg',
      teamsCodes: ['jy5rnn8']
    },
    {
      title: 'FISICA',
      suffix: 'CBrlIUeuTu5odGt6eRgOpA',
      teamsCodes: ['qd3vr5p']
    },
    {
      title: 'STARTUP DI IMPRESA E MODELLI DI BUSINESS',
      suffix: 'CBrlIU0DaBKsxNErRZ5njQ',
      teamsCodes: ['jdy4mk5']
    },
    {
      title: 'TECNOLOGIE PER I SISTEMI DISTRIBUITI E IL WEB CON LABORATORIO',
      suffix: 'CBrlIVIOYEycrYL7MP3hQQ',
      teamsCodes: ['bfei9jj']
    },
    {
      title: 'TAP',
      suffix: 'DPCishPgqXBxeWUbrUKyCg',
      teamsCodes: ['cwecmqh']
    },
    {
      title: 'INTRODUZIONE AL DATA MINING',
      suffix: 'CBrlIVVLvys5ud9dYiWCyw',
      teamsCodes: ['9n8fwtm']
    },
    {
      title: 'INTERNET SECURITY',
      suffix: 'CBrlIUTyTMASy6PmH-QSTQ',
      teamsCodes: ['a6vfkk5']
    },
    {
      title: 'PROGRAMMAZIONE MOBILE',
      suffix: 'CBrlIVYAvOA_ojVVh27acw',
      teamsCodes: ['pdzgqm8']
    },
    {
      title: 'COMPUTER GRAFICA',
      suffix: 'CBrlIUWYpjRgjchQWwouUA',
      teamsCodes: ['mnzsn9j']
    },
    {
      title: 'IT LAW',
      suffix: 'CBrlIVYsN-0wnWb_bECbXA',
      teamsCodes: ['hob6saf']
    },
    {
      title: 'DIGITAL FORENSICS',
      suffix: 'CBrlIVcja2kE2R5NoMGLww',
      teamsCodes: ['2jc74j2']
    },
    {
      title: 'SVILUPPO DI GIOCHI DIGITALI',
      suffix: 'CBrlIUO9fK2DGryQA1uNxw',
      teamsCodes: ['x7fuqlt']
    },
    {
      title: 'SOCIAL MEDIA MANAGEMENT',
      suffix: 'CBrlIUvKnmOSU7JAEG4Dkg',
      teamsCodes: ['e4mbxsj']
    },
    {
      title: 'LABORATORIO DI SISTEMI A MICROCONTROLLORE',
      suffix: 'CBrlIU61FgAEE3SgYXMadg',
      teamsCodes: ['618usrd']
    },
    {
      title: 'PROGRAMMAZIONE PARALLELA SU ARCHITETTURE GPU',
      suffix: 'CBrlIVAlAFfpGlVDLm7SNQ',
      teamsCodes: ['3icuged']
    },
    {
      title: 'INFORMATICA MUSICALE',
      suffix: 'CBrlIURbPezFW11x1Z386A',
      teamsCodes: ['7p26czo']
    },
    {
      title: 'SISTEMI CENTRALI',
      suffix: 'CBrlIUiemx0FlarkbsqG8w',
      teamsCodes: ['bs923lh']
    },
    {
      title: 'CALCOLO NUMERICO',
      suffix: 'CBrlIVY39wvx6i6ERrVPQw',
      teamsCodes: []
    }
  ]
];

export default async function getBachelorGroups() {
  return toGroupEntities(await getData('bachelor', groupsNames.flat(), '123'));
}
