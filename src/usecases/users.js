const Users = require('../models/users')
const bcrypt = require('../lib/bcrypt')
const jwt = require('../lib/jwt')

function getAll () {
    return Users.find()
}

function getById (id) {
    return Users.findById(id)
}

// signup - inscribirse 

// Creamos la encriptacion
async function signUp ({name, email, password, role}) {

    // Revisamos si existe el Email
    const userFound = await Users.findOne({ email }) // findOne() regresa el primer objeto que encontro o nos regresa indefinido

    if (userFound) {
        throw new Error('User already exists')
    }

    const encriptedPassword = await bcrypt.hash(password)

    return Users.create({
        name,
        email,
        password: encriptedPassword,
        role
    })
}

// Revisamos si el password es valido o no
async function login (email, password) {

    const userFound = await Users.findOne({ email})
    
    if (!userFound) {
        throw new Error('Invalid data email')
    }

    const isValidPassword = await bcrypt.compare(password, userFound.password)

    if (!isValidPassword) {
        throw new Error('invalid data password')
    }

    // Regresamos un token
    return jwt.sign({ id: userFound._id }) //.sign() ayuda a expedir tokens
}


module.exports = {
    getAll,
    signUp,
    login,
    getById
}