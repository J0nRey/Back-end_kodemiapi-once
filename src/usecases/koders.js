
// endpoint -> caso de uso -> modelo

const Koders = require('../models/koders')

function getAll () {
    return Koders.find() // Regresa una promesa
}


function create ({ name, lastName, age, gender }) {
    return Koders.create({name, lastName, age, gender})
}

function deleteById (id) {
    return Koders.findByIdAndDelete(id)
}

function updateById (id, dataToUpdate) {
    return Koders.findByIdAndUpdate(id, dataToUpdate)
}

// Regla, Solo se puede importar una sola cosa
module.exports = { // Se crea un objeto con las keys como queramos 
    getAll,
    create,
    deleteById,
    updateById
}