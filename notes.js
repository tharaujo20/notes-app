const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
	return 'Your notes...';
};

const addNote = (title, body) => {
	const notes = loadNotes();
	const duplicateNote = notes.find((nt) => nt.title === title);

	if (!duplicateNote) {
		notes.push({
			title: title,
			body: body,
		});
		console.log('New note added');
	} else {
		console.log('Note title taken');
	}

	saveNotes(notes);
};

const saveNotes = (notes) => {
	const dataJSON = JSON.stringify(notes);
	fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
	try {
		const dataBuffer = fs.readFileSync('notes.json');
		const dataJSON = dataBuffer.toString();
		return JSON.parse(dataJSON);
	} catch (e) {
		return [];
	}
};

const removeNote = (title) => {
	const myNotes = loadNotes();

	const notesToKeep = myNotes.filter((note) => note.title !== title);

	if (myNotes.length > notesToKeep.length) {
		console.log(chalk.green.inverse('Note removed'));
	} else {
		console.log(chalk.red.inverse('Note not found'));
	}

	saveNotes(notesToKeep);
};

const listNotes = () => {
	const myNotes = loadNotes();

	myNotes.forEach((note) => {
		console.log(chalk.blue(note.title));
	});
};

const readNotes = (title) => {
	const myNotes = loadNotes();
	const noteToRead = myNotes.find((note) => note.title === title);

	noteToRead
		? console.log(
				'Title: ' +
					chalk.inverse(noteToRead.title) +
					'\nBody: ' +
					noteToRead.body
		  )
		: console.log('Note not found');
};

module.exports = {
	getNotes: getNotes,
	addNote: addNote,
	removeNote: removeNote,
	listNotes: listNotes,
	readNotes: readNotes,
};
