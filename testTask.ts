import * as fs from 'fs';

// Define the range of the piano keyboard
const MIN_OCTAVE = -3;
const MAX_OCTAVE = 5;

interface Note {
    octave: number;
    note: number;
}

// Function to transpose a note by a given number of semitones
export function transpose(providedNote: Note, semitones: number): Note {
    // validating of input note
    if (providedNote.octave < MIN_OCTAVE || providedNote.octave > MAX_OCTAVE || 
        (providedNote.octave === MIN_OCTAVE && providedNote.note < 10) || 
        (providedNote.octave === MAX_OCTAVE && providedNote.note > 1)){
            throw new Error('Provided note is out of the keyboard range.');
    }
    
    let totalNotes = providedNote.octave * 12 + providedNote.note + semitones;
    let newOctave = Math.floor(totalNotes / 12);
    let newNote = totalNotes % 12;
    if (newNote === 0) {
        newOctave -= 1;
        newNote = 12;
    }

    if (newOctave < MIN_OCTAVE || newOctave > MAX_OCTAVE || (newOctave === MIN_OCTAVE && newNote < 10) || (newOctave === MAX_OCTAVE && newNote > 1)) {
        throw new Error('Resulting note is out of the keyboard range.');
    }

    return {
        octave: newOctave,
        note: newNote,
    };
}

// Main function to perform transposition
export function main(inputFilePath: string, semitones: number, outputFilePath: string): void {
    const arrayData = JSON.parse(fs.readFileSync(inputFilePath, 'utf-8')) as [number, number][];
    const inputData: Note[] = arrayData.map(([octave, note]) => ({ octave, note }));
    const transposedNotes = inputData.map(note => transpose(note, semitones));
    fs.writeFileSync(outputFilePath, JSON.stringify(transposedNotes.map(n => [n.octave, n.note])));
}


// Example usage
const inputFilePath = 'dataFiles/input.json';
const outputFilePath = 'dataFiles/output.json';
const semitonesToTranspose = -3;
try {
    main(inputFilePath, semitonesToTranspose, outputFilePath);
    console.log(`Notes transposed successfully. Check ${outputFilePath}`);
} catch (error) {
    console.error((error as Error).message);
}
