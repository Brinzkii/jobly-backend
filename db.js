'use strict';
/** Database setup for jobly. */
const { Client } = require('pg');
const parse = require('pg-connection-string').parse;
const dotenv = require('dotenv');
const { getDatabaseUri } = require('./config');
dotenv.config();

let ssl = null;

if (process.env.NODE_ENV === 'production') {
	ssl = {
		rejectUnauthorized: false,
	};
}

if (process.env.CONNECTION_STRING) {
	const config = parse(process.env.CONNECTION_STRING);
	let db = new Client({
		user: config.user,
		host: config.host,
		database: config.database,
		password: config.password,
		port: config.port,
		ssl: ssl,
	});
} else {
	const { USER, HOST, PASSWORD, PORT } = process.env;

	let db = new Client({
		user: USER,
		host: HOST,
		database: getDatabaseUri(),
		password: PASSWORD,
		port: PORT,
		ssl: ssl,
	});
}



db.connect();

module.exports = db;
