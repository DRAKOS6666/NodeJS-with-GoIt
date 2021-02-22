const fs = require('fs')
const path = require('path')
const handleerror = require('./utils/handleerror')


const contactPath = path.join('.', '/db', '/contacts.json')

const doParseData = data => JSON.parse(data)

const addContact = (name, email, phone) => {
    try {
        fs.readFile(contactPath, (err, data) => {
            if (err) {
                handleerror(err)
            }
            const contacts = doParseData(data)
            const allID = contacts.map(contact => contact.id)
            const newID = Math.max(...allID) + 1
            const newContact = { name, email, phone, id: newID }
            const newContactList = [...contacts, newContact]
            console.log('New contact added: ')
            console.table(newContact);

            fs.writeFile(contactPath, JSON.stringify(newContactList, null, 2), (err) => {
                if (err) {
                    handleerror(err)
                }
            })
        })
    } catch (error) {
        handleerror(error)
    }
}

const listContacts = () => {
    fs.readFile(contactPath, (err, data) => {
        if (err) {
            handleerror(err)
        }
        console.table(doParseData(data));
    })
}

const getContactById = async (contactId) => {
    try {
        await fs.readFile(contactPath, (err, data) => {
            if (err) {
                handleerror(err)
            }
            const contacts = doParseData(data)
            const findedContact = contacts.find(contact => contact.id === contactId)
            console.table(findedContact)
        })
    } catch (error) {
        handleerror(error)
    }
}

const removeContact = (contactId) => {
    try {

        let fileForDelete = null

        fs.readFile(contactPath, (err, data) => {
            if (err) {
                handleerror(err)
            }
            const contacts = doParseData(data)
            fileForDelete = contacts.find(contact => contact.id === contactId)
            const newContactList = contacts.filter(contact => contact.id !== contactId)

            fs.writeFile(contactPath, JSON.stringify(newContactList, null, 2), (err) => {
                if (err) {
                    handleerror(err)
                }
            })
            if (fileForDelete) {
                console.log('Contact is deleted: ')
                console.table(fileForDelete);
            }
        })
    } catch (error) {
        handleerror(error)
    }
}



module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}