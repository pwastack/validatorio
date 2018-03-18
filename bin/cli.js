#! /usr/bin/env node
// -*- js -*-
const validator = require('../src/validatorio');
const fs = require('fs');

const program = require('commander');
program
  .version('1.0.0')
  .option('-i, --inputFile <inputFile>','Intput html file path')
  .option('-o, --outputFile <outputFile>','Output result')
  .option('-r, --rulesFile <rulesFile>','Rules file')
  .option('-d, --debugMode <debugMode>','debug mode true/false')
  .parse(process.argv);

var { rulesFile,inputFile,outputFile,debugMode } = program;

if (rulesFile) {
    // can load rule from a json input or nodejs array
    var rules = require(rulesFile);
} else {
    // default rule.
    var rules = require('../config/rules');
}

if (debugMode === 'true') {
    validator.debugMode = true;
}
if (outputFile) {
    var streamOut = fs.createWriteStream(outputFile, {'flags': 'w'});
} else {
    if (process.stdout.isTTY) {
        var color = require('colors');
        validator.outputFormatter = color;
    }
    var streamOut = process.stdout;
}

if (process.stdin.isTTY) {
    if (!inputFile) {
        program.help();
        return;
    }
    var streamIn = fs.createReadStream(inputFile, {'flags': 'r'});
} else {
    var streamIn = process.stdin;
}


var stdin_input = '';

streamIn.on('data', function (data) {
    stdin_input += data;
});

streamIn.on('end', function () {
    rules.forEach(function (rule) {
        var {output} = validator.valid(rule, stdin_input);
        streamOut.write(output);
    })
});
