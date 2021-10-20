#!/usr/bin/env node

"use strict";

var util = require("util");
var path = require("path");
var http = require("http");

var express = require("express");
var app = express();
var sqlite3 = require("sqlite3");


// ************************************

const DB_PATH = path.join(__dirname,"my.db");
const WEB_PATH = path.join(__dirname,"web");
const HTTP_PORT = 8039;

var delay = util.promisify(setTimeout);

// define some SQLite3 database helpers
//   (comment out if sqlite3 not working for you)
var myDB = new sqlite3.Database(DB_PATH);
var SQL3 = {
	run(...args) {
		return new Promise(function c(resolve,reject){
			myDB.run(...args,function onResult(err){
				if (err) reject(err);
				else resolve(this);
			});
		});
	},
	get: util.promisify(myDB.get.bind(myDB)),
	all: util.promisify(myDB.all.bind(myDB)),
	exec: util.promisify(myDB.exec.bind(myDB)),
};

// use express (app) by passing it to a http server instance
// app is a handleRequest function
var httpserv = http.createServer(app);


main();


// ************************************

function main() {
    defineRoutes();
	httpserv.listen(HTTP_PORT);
	console.log(`Listening on http://localhost:${HTTP_PORT}...`);
}

function defineRoutes() {
    app.get(/\/get-records\b/, async function(req, res) {
        await delay(1000);
        let records = await getAllRecords() || [];
        // res.setHeader("Content-Type","application/json");
		// res.setHeader("Cache-Control","max-age: 0, no-cache");
		res.writeHead(200, {
            "Content-Type": "application/json",
			"Cache-Control": "max-age: 0, no-cache",
        });
		res.end(JSON.stringify(records));
    });

    app.use(function rewriter(req,res,next){
		if (/^\/(?:index\/?)?(?:[?#].*$)?$/.test(req.url)) {
			req.url = "/index.html";
		}
		else if (/^\/js\/.+$/.test(req.url)) {
			next(); // tell Xpress to move on to the next route
			return;
		}
		else if (/^\/(?:[\w\d]+)(?:[\/?#].*$)?$/.test(req.url)) {
			let [,basename] = req.url.match(/^\/([\w\d]+)(?:[\/?#].*$)?$/);
			req.url = `${basename}.html`;
		}
		next();
	});

    // handle static file requests
    // app.use: generic for all incoming requests
    let fileServer = express.static(WEB_PATH, {
        maxAge: 100,
        // add custom headers
		setHeaders(res) {
			res.setHeader("Server","Node Workshop: ex6");
		}
    });
    app.use(fileServer);
    app.get(/\.html$/,function friendly404(req,res,next){
		req.url = "/404.html";
		fileServer(req,res,next);
	});
    
}

// *************************
// NOTE: if sqlite3 is not working for you,
//   comment this version out
// *************************
async function getAllRecords() {
	var result = await SQL3.all(
		`
		SELECT
			Something.data AS "something",
			Other.data AS "other"
		FROM
			Something
			JOIN Other ON (Something.otherID = Other.id)
		ORDER BY
			Other.id DESC, Something.data
		`
	);

	return result;
}
