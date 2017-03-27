"use strict";

module.exports = {
  parse,
  getName,
  getDefaults,
  getData
};

/**
 * Parse RTTTL
 *
 * @param {string} rtttl - RTTTL String
 * @returns {object} - An object specifying frequency and duration for each note
 */
function parse(rtttl) {

  const REQUIRED_SECTIONS_NUM = 3;
  const SECTIONS = rtttl.split(':');

  if (SECTIONS.length !== REQUIRED_SECTIONS_NUM) {
    throw new Error('Invalid RTTTL file.');
  }

  const NAME     = getName(SECTIONS[0]);
  const DEFAULTS = getDefaults(SECTIONS[1]);
  const MELODY   = getData(SECTIONS[2], DEFAULTS);

  return {
    name     : NAME,
    defaults : DEFAULTS,
    melody   : MELODY
  }
}

/**
 * Get ring tone name
 *
 * @param {string} name
 * @returns {string}
 */
function getName(name) {

  const MAX_LENGTH = 10;

  if (name.length > MAX_LENGTH) {
    console.warn('Tune name should not exceed 10 characters.');
  }

  if (!name) {
    return 'Unknown';
  }

  return name;

}

/**
 * Get duration, octave and BPM
 *
 * @param {string} defaults
 * @returns {object}
 */
function getDefaults(defaults) {

  const VALUES = defaults.split(',');

  const VALUES_ARR = VALUES.map((value) => {

    if (value === '') {
      return {}
    }

    const KEY_VAL = value.split('=');

    if (KEY_VAL.length !== 2) {
      throw new Error('Invalid setting ' + value);
    }

    const KEY = KEY_VAL[0];
    const VAL = KEY_VAL[1];

    const ALLOWED_DURATION = ['1', '2', '4', '8', '16', '32'];
    const ALLOWED_OCTAVE   = ['4', '5', '6', '7'];
    const ALLOWED_BPM      = [
      '25', '28', '31', '35', '40', '45', '50', '56', '63', '70', '80', '90', '100',
      '112', '125', '140', '160', '180', '200', '225', '250', '285', '320', '355',
      '400', '450', '500', '565', '635', '715', '800', '900'
      ];

    switch(KEY) {
      case 'd':
        if (ALLOWED_DURATION.indexOf(VAL) !== -1) {
          return {duration: VAL};
        } else {
          throw new Error('Invalid duration ' + VAL);
        }
      case 'o':
        if (ALLOWED_OCTAVE.indexOf(VAL) === -1) {
          console.warn('Invalid octave ' + VAL);
        }
        return {octave: VAL};
      case 'b':
        if (ALLOWED_BPM.indexOf(VAL) === -1) {
          console.warn('Invalid BPM ' + VAL);
        }
        return {bpm: VAL};
    }

  });

  const VALUES_OBJ = _toObject({}, VALUES_ARR);

  const DEFAULT_VALUES = {
    duration : '4',
    octave   : '6',
    bpm      : '63'
  };

  return Object.assign(DEFAULT_VALUES, VALUES_OBJ);

}

/**
 * Convert an array of objects into an object
 *
 * @param {object} obj
 * @param {Array} arr
 * @returns {object}
 * @private
 */
function _toObject(obj, arr) {

  if (arr.length === 0) {
    return obj;
  }

  const newObj = Object.assign(obj, arr[0]);

  return _toObject(newObj, arr.slice(1));
}

/**
 * Get the parsed melody data
 *
 * @param {string} melody
 * @param {object} defaults
 * @returns {Array}
 */
function getData(melody, defaults) {

  const NOTES       = melody.split(',');
  const BEAT_EVERY  = 60000 / parseInt(defaults.bpm);

  return NOTES.map((note) => {

    const NOTE_REGEX = /(1|2|4|8|16|32|64)?((?:[a-g]|h|p)#?){1}(\.?)(4|5|6|7)?/;
    const NOTE_PARTS = note.match(NOTE_REGEX);

    const NOTE_DURATION = NOTE_PARTS[1] || parseInt(defaults.duration);
    const NOTE          = NOTE_PARTS[2] === 'h' ? 'b' : NOTE_PARTS[2];
    const NOTE_DOTTED   = NOTE_PARTS[3] === '.';
    const NOTE_OCTAVE   = NOTE_PARTS[4] || parseInt(defaults.octave);

    return {
      note: NOTE,
      duration: _calculateDuration(BEAT_EVERY, parseFloat(NOTE_DURATION), NOTE_DOTTED),
      frequency: _calculateFrequency(NOTE, NOTE_OCTAVE)
    };
  });
}

/**
 * Calculate the frequency of a note
 *
 * @param {string} note
 * @param {number} octave
 * @returns {number}
 * @private
 */
function _calculateFrequency(note, octave) {

  if (note === 'p') {
    return 0;
  }

  const C4           = 261.63;
  const TWELFTH_ROOT = Math.pow(2, 1/12);
  const N            = _calculateSemitonesFromC4(note, octave);
  const FREQUENCY    = C4 * Math.pow(TWELFTH_ROOT, N);

  return Math.round(FREQUENCY * 1e1) / 1e1;
}

function _calculateSemitonesFromC4(note, octave) {

  const NOTE_ORDER          = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];
  const MIDDLE_OCTAVE       = 4;
  const SEMITONES_IN_OCTAVE = 12;

  const OCTAVE_JUMP = (octave - MIDDLE_OCTAVE) * SEMITONES_IN_OCTAVE;

  return NOTE_ORDER.indexOf(note) + OCTAVE_JUMP;

}

/**
 * Calculate the duration a note should be played
 *
 * @param {number} beatEvery
 * @param {number} noteDuration
 * @param {boolean} isDotted
 * @returns {number}
 * @private
 */
function _calculateDuration(beatEvery, noteDuration, isDotted) {
  const DURATION = (beatEvery * 4) / noteDuration;
  const PROLONGED = isDotted ? (DURATION / 2) : 0;
  return DURATION + PROLONGED;
}
