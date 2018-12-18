import { expect } from 'chai';
import animalHash from '../src';
import compress from '../src/compress';
import adjectives from '../src/adjectives';
import colors from '../src/colors';
import animals from '../src/animals';

describe('animalHash', () => {
  it('should turn arbitrary string input into an animal hash', () => {
    const expectedVal = 'Rapid Grey Rattlesnake'
    expect(animalHash('my ugly input string')).to.equal(expectedVal)
  });

  it('should use a specified separator', () => {
    const expectedVal = 'Rapid-Grey-Rattlesnake'
    expect(animalHash('my ugly input string', { separator: '-' })).to.equal(expectedVal)
  });

  it('should support lowercased style', () => {
    const expectedVal = 'rapid grey rattlesnake'
    expect(animalHash('my ugly input string', { style: 'lowercase' })).to.equal(expectedVal)
  });

  it('should support uppercased style', () => {
    const expectedVal = 'RAPID GREY RATTLESNAKE'
    expect(animalHash('my ugly input string', { style: 'uppercase' })).to.equal(expectedVal)
  });

  it('should throw an error if passed an unknown style', () => {
    expect(() => animalHash('xyz', { style: 'garbage' })).to.throw(/Unknown style/);
  });
});

describe('compress', () => {
  it('compresses an md5 hash into an array of requested length integers', () => {
    const bytes = [ 23, 45, 234, 111, 46, 165, 33, 58, 156, 140, 91, 138, 50, 245, 103, 210 ];
    const compressed = [ 145, 174, 163 ];
    expect(compress(bytes, 3)).to.eql(compressed);
  });

  it('should throw an error if given fewer bytes than requested output', () => {
    expect(() => compress([ 23 ], 3)).to.throw(/Fewer input bytes/);
  });
});

describe('wordlists', () => {
  it('should contain no duplicate entries', () => {
    const wordlist = adjectives.concat(colors).concat(animals);
    const wordcount = wordlist.reduce((tally, word) => {
      if(!tally[word]) {
        tally[word] = 1;
      } else {
        tally[word] = tally[word] + 1;
      }
      return tally;
    }, {});
    expect(Object.keys(wordlist).length).to.equal(256 * 3);
  })
})
