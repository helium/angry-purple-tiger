const compress = (bytes, target) => {
  const { length } = bytes;
  if (target > length) throw new Error('Fewer input bytes than requested output');

  // Calculate the segment size (divide and round down)
  const segSize = length / target >> 0;

  // Split 'bytes' array into 'target' number of segments.
  const segments = [];
  for (let i = 0; i < segSize * target; i += segSize) {
    segments.push(bytes.slice(i, i + segSize));
  }

  // Catch any left-over bytes in the last segment.
  const lastSeg = segments[segments.length - 1];
  segments[segments.length - 1] = lastSeg.concat(bytes.slice(target * segSize));

  const checksums = segments.map(x => x.reduce((acc, curr) => acc ^ curr));
  return checksums;
};

export default compress;
