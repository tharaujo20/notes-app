const chalk = require('chalk');
const validator = require('validator');
const yargs = require('yargs');
const note = require('./notes');

yargs.command({
	command: 'add',
	describe: 'Add a new note',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string',
		},
		body: {
			describe: 'The content of the note',
			demandOption: true,
			type: 'string',
		},
	},
	handler(argv) {
		note.addNote(argv.title, argv.body);
	},
});

yargs.command({
	command: 'remove',
	describe: 'Remove a new note',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string',
		},
	},
	handler(argv) {
		note.removeNote(argv.title);
	},
});

yargs.command({
	command: 'list',
	describe: 'Listing notes',
	handler() {
		console.log('Listing...   ');
	},
});

// yargs.command({
// 	command: 'read',
// 	describe: 'Reading notes',
// 	handler() {
// 		console.log('Reading...   ');
// 	},
// });

yargs.command({
	command: 'list',
	describe: 'Listing the titles',
	handler() {
		note.listNotes();
	},
});

yargs.command({
	command: 'read',
	describe: 'Read a note by the given title',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string',
		},
	},
	handler(argv) {
		note.readNotes(argv.title);
	},
});

yargs.parse();
