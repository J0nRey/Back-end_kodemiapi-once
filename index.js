
require('dotenv').config()

// console.log('env: ', process.env)

const server = require('./src/server')

const dbConnect = require('./src/lib/db')

const model = require('./src/models/koders')
 
const modelMentors = require('./src/models/mentors')

dbConnect()
    .then(()=>{

        console.log('DB Connected')

        server.listen(8080, ()=>{
            console.log('Server is listening')
        })

    })
    .catch((error)=>{
        console.error('DB Connection Error: ', error)
    })

    /*
    1. Crear o asegurarse de que exista el modelo nesesario.
    2. Crear el caso de uso nesesario.
    3. Crear el EndPoint nesesario.
    */

    /*
    Practica:
    - POST /koders
    - DELETE /koders/:id koders.findByIdAndDelete(id)
    - PATCH /koders/:id
    */

    /*
    practica:
    - GET /mentores
    - POST /mentores
    - DELETE /mentores/:id mentores.findByIdAndDelete(id)
    - PATCH /mentores/:id

    Mentors model
    name
    lastName
    age
    modulo [ "front", "back", "cloud", "react" ]
    */

    /*
    Practica:
    Middleware que loggea mis peticiones

    [Metodo] [Ruta] [Body]
    GET /koders {}
    POST /mentors { name: '', lastName: '', ... }
    */

    /*
    Autenticación
    Autorización

    bcrypt -> incriptar / instalar, instanciar libreria / crear archivo lib/bcrypt / modelo / caso de uso / rutas
    jwt
    flujo de registro y logueo


    registro
    1. Otorgamos datos de usuario
        -Email
        -Password
        -name

    2. Validacion de usuario existente

    3. incriptar el password

    Cifrado cesar

    llave = 2 adelante

    fghijklmnopqrstuvwxyzabcde

    mensaje:
    normal  -   Este es un mensaje
    cifrado -   guvg gu wp ogpuclg25

    2 adelante y 5 atras


    llave = la misma contraseña

    JONATHANbcdefgiklmpqrsuvwxyz


    4. Guardar en la base de datos
        - El password incriptado es el unico que se guarda en la base
        - Nunca guardamos password en texto plano  
    */