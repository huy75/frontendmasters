#!/usr/bin/env node

"use strict";
var util = require("util");
var path = require("path");
// to access the content of a file, we need fs: file system
var fs = require("fs");

var args = require("minimist")(process.argv.slice(2),{
	boolean: ["help","in",],
	string: ["file",],
});

const BASE_PATH =
	path.resolve(process.env.BASE_PATH || __dirname);

if (args.help) {
    printHelp();
}
else if (args.file) {
	let filePath = path.join(BASE_PATH,args.file);
	fs.readFile(filePath,function(err,contents){
		if (err) error(err.toString());
		else processFile(contents.toString());
	});
}
else {
    error("Incorrect usage.", true);
}

// printHelp();
// get an array of arguments, get rid of node file name
// console.log(args);

// ************************************

function printHelp() {
	console.log("ex1 usage:");
	console.log("");
	console.log("--help                      print this help");
	console.log("-, --in                     read file from stdin");
	console.log("--file={FILENAME}           read file from {FILENAME}");
	console.log("");
	console.log("");
}

function error(err,showHelp = false) {
	process.exitCode = 1;
	console.error(err);
	if (showHelp) {
        // empty line
		console.log("");
		printHelp();
	}
}

function processFile(contents) {
	contents = contents.toUpperCase();
	process.stdout.write(contents);
}
