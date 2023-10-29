import { transpose, main } from '../testTask';
import mockFs from 'mock-fs';
import * as fs from 'fs';
declare module 'mock-fs';

describe('transpose function', () => {
  it('should transpose a note by a given number of semitones', () => {
    expect(transpose({ octave: 2, note: 1 }, 3)).toEqual({ octave: 2, note: 4 });
  });

  it('should handle negative transpositions', () => {
    expect(transpose({ octave: 2, note: 1 }, -3)).toEqual({ octave: 1, note: 10 });
  });

  it('should handle transpositions that change the octave', () => {
    expect(transpose({ octave: 2, note: 11 }, 3)).toEqual({ octave: 3, note: 2 });
  });

  it('should throw an error if resulting note is out of the keyboard range', () => {
    expect(() => transpose({ octave: 5, note: 1 }, 1)).toThrow('Resulting note is out of the keyboard range.');
  });

  it('should throw an error if resulting note is out of the keyboard range', () => {
    expect(() => transpose({ octave: -3, note: 9 }, 11)).toThrow('Provided note is out of the keyboard range.');
  });

  it('should throw an error if resulting note is out of the keyboard range', () => {
    expect(() => transpose({ octave: 5, note: 2 }, 1)).toThrow('Provided note is out of the keyboard range.');
  });

  it('should throw an error if resulting note is out of the keyboard range', () => {
    expect(() => transpose({ octave: -3, note: 10 }, -1)).toThrow('Resulting note is out of the keyboard range.');
  });
  it('should throw an error if resulting note is out of the keyboard range', () => {
    expect(() => transpose({ octave: -4, note: 13 }, 2)).toThrow('Provided note is out of the keyboard range.');
  });
  it('should throw an error if resulting note is out of the keyboard range', () => {
    expect(() => transpose({ octave: -5, note: 13 }, 2)).toThrow('Provided note is out of the keyboard range.');
  });
  it('should throw an error if resulting note is out of the keyboard range', () => {
    expect(()=> transpose({ octave: 2, note: 11 }, 88)).toThrow('Resulting note is out of the keyboard range.');
  });
});

describe('main function', () => {
  afterEach(() => {
      mockFs.restore();  // Restore the file system after each test
  });

  it('should transpose notes and write to output file', () => {
      // Mock the file system
      mockFs({
          'dataFiles': {
              'input.json': '[[2,1],[2,6],[2,1],[2,8],[2,1],[2,9],[2,1],[2,6],[2,1],[2,8] ]' 
          }
      });
      const outputFilePath = 'dataFiles/output.json';
      main('dataFiles/input.json', -3, outputFilePath);
      const result = JSON.parse(fs.readFileSync(outputFilePath, 'utf-8'));
      expect(result).toEqual([ [1,10],[2,3],[1,10],[2,5],[1,10],[2,6],[1,10],[2,3],[1,10],[2,5] ]);
  });
});
