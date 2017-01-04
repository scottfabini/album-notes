var classification = {
  genre: [
    'Rock',
    'Indie Rock',
    'Techno',
    'Ambient',
    'Punk Rock',
    'Post-Hardcore',
    'Math Rock',
    'Undefined']
};

export default [
  {
    id: 'Rank',
    label: 'Rank',
    show: true,
    sample: '1',
    align: 'left'
  },
  {
    id: 'Title',
    label: 'Album',
    show: true,
    sample: 'Sergent Pepper\'s Lonely Hearts Club Band',
    align: 'center'
  },
  {
    id: 'Band',
    label: 'Artist',
    show: true,
    sample: 'The Beatles',
    align: 'left'
  },
  {
    id: 'Year',
    label: 'Year',
    type: 'year',
    show: true,
    sample: 2015
  },
  {
    id: 'Rating',
    label: 'Rating',
    type: 'rating',
    show: true,
    sample: 3
  },
  {
    id: 'Genre',
    label: 'Genre',
    show: true,
    options: classification.genre,
    sample: 'Undef.',
    type: 'genre',
    align: 'left'
  },
];

