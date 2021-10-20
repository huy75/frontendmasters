#!/usr/bin/env node

"use strict";
var path = require("path");
// to access the content of a file, we need fs: file system
var fs = require("fs");
// compress
var zlib = require("zlib");
var Transform = require("stream").Transform;

var args = require("minimist")(process.argv.slice(2),{
	boolean: ["help","in","out","uncompress","compress",],
	string: ["file",],
});

// Cancelable Async Flows
var CAF = require("caf");

// async initializations
// var fsStatAsync = util.promisify(fs.stat);
// var fsMkdirAsync = util.promisify(fs.mkdir);
processFile = CAF(processFile);
// ************

function streamComplete(stream){
	return new Promise(function c(res){
		stream.on("end",res);
	});
}

const BASE_PATH =
	path.resolve(process.env.BASE_PATH || __dirname);

var OUTPATH = path.join(BASE_PATH,"out.txt");

if (args.help) {
    printHelp();
}
else if (args._.includes("-") || args.in) {
	let tooLong = CAF.timeout(25, "Took too long!");
	processFile(tooLong, process.stdin)
	.catch(error);
}
else if (args.file) {
	let filePath = path.join(BASE_PATH,args.file);
	let stream = fs.createReadStream(filePath);
	let tooLong = CAF.timeout(25, "Took too long!");

	processFile(tooLong, stream)
	.then(function(){
		console.log("Complete!");
	})
	.catch(error);
}
else {
    error("Incorrect usage.", true);
}

// printHelp();
// get an array of arguments, get rid of node file name
// console.log(args);

// ************************************

function printHelp() {
	console.log("ex3 usage:");
	console.log("  ex3.js --file={FILENAME}");
	console.log("");
	console.log("--help                      print this help");
	console.log("-, --in                     read file from stdin");
	console.log("--file={FILENAME}           read file from {FILENAME}");
	console.log("--uncompress                uncompress input file with gzip");
	console.log("--compress                  compress output with gzip");
	console.log("--out                       print output");
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

function *processFile(signal, inputStream) {
	var outStream = inputStream; // readable

	if (args.uncompress) {
		let gunzip = zlib.createGunzip();
		outStream = outStream.pipe(gunzip);
	}

	var upperStream = new Transform({
		transform(chunk,encoding,callback) {
			this.push(chunk.toString().toUpperCase());
			// setTimeout(callback, 500);
			callback();
		}
	});
	outStream = outStream.pipe(upperStream);
	var targetStream;

	if (args.compress) {
		OUTPATH = `${OUTPATH}.gz`;
		let gzip = zlib.createGzip();
		outStream = outStream.pipe(gzip);
	}

	if (args.out) {
		targetStream = process.stdout;
	}
	else {
		targetStream = fs.createWriteStream(OUTPATH);
	}

	outStream.pipe(targetStream);

	// listen for cancelation to abort output
	signal.pr.catch(function onCancelation(){
		// undo the last piping
		outStream.unpipe(targetStream);
		// stop the incoming stream
		outStream.destroy();
	});

	yield streamComplete(outStream);
}
