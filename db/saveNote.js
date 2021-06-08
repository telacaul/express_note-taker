// imports
const fs = require('fs');
// add syntax to use util properties and methods
const util = require('util');


const readData = util.promisify(fs.readFile);
const writeData = util.promisify(fs.writeFile);

class saveNotes {
    write(notes) {
        return writeData('db/db.json', JSON.stringify(notes));
    }

    read() {
        return readData('db/db.json', 'utf8');
    }

    getNotesData() {
        return this.read().then(info => {
            let parseInfo;
            try {
                parseInfo = [].concat(JSON.parse(info));
            } catch (err) {
                parseInfo = [];
            }
            return parseInfo;
        });
    }

    add(note) {
        const { title, text } = note;
        let noteList = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));

        let currentId;
        if (noteList.length) {
            currentId = Math.max(...(noteList.map(note => note.id)));
        } else {
            currentId = [0];
        }

        let id = currentId + 1;
        
        const newNotes = { title, text, id };

        return this.getNotesData()
        .then(info => [...info, newNotes])
        .then(newInfo => this.write(newInfo))
        .then(() => newNotes);
    }

    delete(id) {
        return this.getNotesData()
        .then(info => info.filter(info => info.id !== parseInt(id)))
        .then(filteredInfo => this.write(filteredInfo));
    }

}

module.exports = new saveNotes();