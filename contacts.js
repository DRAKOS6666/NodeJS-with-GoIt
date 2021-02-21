const fs = require('fs')
const path = require('path')

const contactPath = './db/contacts.json'

const doParseData = data => JSON.parse(data)

const listContacts = () => {
    fs.readFile(contactPath, (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        console.table(doParseData(data));
    })
}

const getContactById = async (contactId) => {
    try {
        await fs.readFile(contactPath, (err, data) => {
            if (err) {
                console.log(err.message)
                return
            }
            const contacts = doParseData(data)
            const findedContact = contacts.find(contact => contact.id === contactId)
            console.table(findedContact)
        })
    } catch (error) {
        console.log(error)
    }
}

const removeContact = (contactId) => {

}

const addContact = (name, email, phone) => {

}


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}