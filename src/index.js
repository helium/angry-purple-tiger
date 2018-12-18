import md5 from 'md5';
import compress from './compress';
import adjectives from './adjectives';
import colors from './colors';
import animals from './animals';


const toStyled = (words, style) => {
  switch (style) {
    case 'titlecase':
      return words.map(w => w.replace(/^\w/, c => c.toUpperCase()));
    case 'lowercase':
      return words.map(w => w.toLowerCase());
    case 'uppercase':
      return words.map(w => w.toUpperCase());
    default:
      throw new Error('Unknown style');
  }
};

const format = (words, style, separator) => toStyled(words, style).join(separator);

const animalHash = (input, { style = 'titlecase', separator = ' ' } = {}) => {
  const hexdigest = md5(input);
  const pairs = hexdigest.match(/(..?)/g);
  const bytes = pairs.map(x => parseInt(x, 16));
  const compressed = compress(bytes, 3);

  const adjective = adjectives[compressed[0]];
  const color = colors[compressed[1]];
  const animal = animals[compressed[2]];


  return format([adjective, color, animal], style, separator);
};

export default animalHash;
