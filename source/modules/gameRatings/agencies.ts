
interface AgentIface {
  name: string;
  ratings: {label: string, value: string}[];
  defRating: string;
}

const result: AgentIface[] = [
  {
    name: 'ESRB',
    defRating: 'AO',
    ratings: [
      {label: '', value: ''},
      {label: 'Early childhood (EC)', value: 'EC'},
      {label: 'Everyone (E)', value: 'E'},
      {label: 'Everyone 10+ (E10+)', value: 'E10+'},
      {label: 'Teen (T)', value: 'T'},
      {label: 'Mature (M)', value: 'M'},
      {label: 'Adults Only (AO)', value: 'AO'},
      {label: 'Rating Pending (RP)', value: 'RP'},
    ],
  },
  {
    name: 'PEGI',
    defRating: '3',
    ratings: [
      {label: '', value: ''},
      {label: 'For all ages (3)', value: '3'},
      {label: 'For persons 7 and older', value: '7'},
      {label: 'For persons 12 and older', value: '12'},
      {label: 'For persons 16 and older', value: '16'},
      {label: 'Only for persons 18 and older', value: '18'},
    ],
  },
  {
    name: 'BBFC',
    defRating: 'U',
    ratings: [
      {label: '', value: ''},
      {label: 'Universal (U)', value: 'U'},
      {label: 'Parental Guidance (PG)', value: 'PG'},
      {label: '12A', value: '12A'},
      {label: '12', value: '12'},
      {label: '15', value: '15'},
      {label: '18', value: '18'},
      {label: 'Restricted 18', value: '18R'},
    ],
  },

  {
    name: 'USK',
    defRating: '0',
    ratings: [
      {label: '', value: ''},
      {label: 'Without age restriction', value: '0'},
      {label: 'Aged 6 and above (6)', value: '6'},
      {label: 'Aged 12 and above (12)', value: '12'},
      {label: 'Aged 16 and above (16)', value: '16'},
      {label: 'Not approved for anyone under 18', value: '18'},
    ],
  },
  {
    name: 'CERO',
    defRating: 'A',
    ratings: [
      {label: '', value: ''},
      {label: 'All Ages (A)', value: 'A'},
      {label: 'Ages 12 and up (B)', value: 'B'},
      {label: 'Ages 15 and up (C)', value: 'C'},
      {label: 'Ages 17 and up (D)', value: 'D'},
      {label: 'Ages 18 and up only (Z)', value: 'Z'},
    ],
  },
];

export default result;