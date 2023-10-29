# Transposition Tool for Piano Notes

This tool performs the musical operation of transposition on a collection of piano notes. Given an input JSON file with a series of notes and a specified number of semitones, the tool produces a JSON file with the transposed notes.

## Table of Contents
- [Setup](#setup)
- [Usage](#usage)
- [Testing](#testing)

## Setup

1. **Node.js Setup**:
   Ensure you have [Node.js](https://nodejs.org/) installed.

2. **TypeScript Setup**:
   Install TypeScript globally using npm:
   npm install -g typescript ts-node

3. **Project Dependencies**:
   Navigate to the project root and install the required dependencies:
   npm install

## Usage

1. **Run the Tool**:
   Before running the script, set the input and output file paths in `testTask.ts`:
    const inputFilePath = 'input.json';
    const outputFilePath = 'output.json';

   Then, run the script:
   npm start


## Testing

1. **Run Tests**:
   This project uses Jest for testing and mock-fs to mock file system operations during tests.
   Navigate to test folder and execute the tests using the command:
   npm test

