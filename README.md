# RTTTL Parse
A JavaScript library for parsing Nokia Ring Tone Text Transfer Language (RTTTL)

[![travis build](https://travis-ci.org/adamonsoon/rtttl-parse.svg?branch=master)](https://travis-ci.org/adamonsoon/rtttl-parse)
[![codecov](https://img.shields.io/codecov/c/github/adamonsoon/rtttl-parse.svg)](https://codecov.io/gh/adamonsoon/rtttl-parse)

# Usage
```javascript
> rtttlParse.parse('Back to the Future:d=16,o=5,b=200:4g.,p,4c.,p,2f#.,p,g.,p,a.,p,8g,p,8e,p,8c,p,4f#,p,g.,p,a.,p,8g.,p,8d.,p,8g.,p,8d.6,p,4d.6,p,4c#6,p,b.,p,c#.6,p,2d.6');
{ name: 'Back to the Future',
  defaults: { duration: '16', octave: '5', bpm: '200' },
  melody: 
   [ { duration: 450, frequency: 784 },
     { duration: 75, frequency: 0 },
     { duration: 450, frequency: 523.3 },
     { duration: 75, frequency: 0 },
     { duration: 900, frequency: 740 },
     { duration: 75, frequency: 0 },
     { duration: 112.5, frequency: 784 },
     { duration: 75, frequency: 0 },
     { duration: 112.5, frequency: 880 },
     { duration: 75, frequency: 0 },
     { duration: 150, frequency: 784 },
     { duration: 75, frequency: 0 },
     { duration: 150, frequency: 659.3 },
     { duration: 75, frequency: 0 },
     { duration: 150, frequency: 523.3 },
     { duration: 75, frequency: 0 },
     { duration: 300, frequency: 740 },
     { duration: 75, frequency: 0 },
     { duration: 112.5, frequency: 784 },
     { duration: 75, frequency: 0 },
     { duration: 112.5, frequency: 880 },
     { duration: 75, frequency: 0 },
     { duration: 225, frequency: 784 },
     { duration: 75, frequency: 0 },
     { duration: 225, frequency: 587.3 },
     { duration: 75, frequency: 0 },
     { duration: 225, frequency: 784 },
     { duration: 75, frequency: 0 },
     { duration: 225, frequency: 587.3 },
     { duration: 75, frequency: 0 },
     { duration: 450, frequency: 587.3 },
     { duration: 75, frequency: 0 },
     { duration: 300, frequency: 1108.7 },
     { duration: 75, frequency: 0 },
     { duration: 112.5, frequency: 987.8 },
     { duration: 75, frequency: 0 },
     { duration: 112.5, frequency: 554.4 },
     { duration: 75, frequency: 0 },
     { duration: 900, frequency: 587.3 } ] }
```
