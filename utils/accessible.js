const fs = require('fs/promises');

const isAccessible = async (path) => {
    try {
        await fs.access(path)
        return (true)
    } catch (error) {
        return false
    }
}


module.exports = {
    isAccessible,
}
