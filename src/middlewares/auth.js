/* con esto ya tenemos las rutas protegidas, po rlo cual
no se puede crear, leer, modificar o eliminar si no se tiene un token */

// mandamos a llamar jwt para verificar el token

const jwt = require('../lib/jwt')
const users = require('../usecases/users')

function auth (request, response, next) {

    try {

    const {authorization: token} = request.headers 
    console.log('token: ', token)

    const isValidToken = jwt.verify(token) // .verify() regresa:  null-undefined / {id}


        console.log('isValidToken: ', isValidToken)    


    if(!isValidToken){
        throw new Error('Not Authorized')
    }

    next()
    
    } catch (error) {
        response.status(401) // .status(401) No autorizado
        response.json({
            success: false,
            message: 'Not Authorized',
            error: error.message
        })
    }
    
    
}


// Validamos que solamente que pasen los que tienen el rol de Administrados o que pasen los que tienen el rol de usuario 

//function authRoles (allowedRoles = ['admin', 'users']){
function authRoles (allowedRoles){ // allowedRoles -> Roles Permitidos
    return async (request, response, next)=>{

        try {

            const {authorization: token} = request.headers 
            console.log('token: ', token)
        
            const isValidToken = jwt.verify(token) // .verify() regresa:  null-undefined / {id}
        
            if(!isValidToken){
                throw new Error('Not Authorized')
            }
        

           const userFound = await users.getById(isValidToken.id)

           const userRoles = userFound.role || []
        
           const isAllowedRole = userRoles.find( userRole => {
               return allowedRoles.find( allowedRole => userRole === allowedRole)
           })


           if (!isAllowedRole) {
            throw new Error('Insufficient permissions')
           }


            next()
            
            } catch (error) {
                response.status(401) // .status(401) No autorizado
                response.json({
                    success: false,
                    message: 'Not Authorized',
                    error: error.message
                })
            }

    }
}

module.exports = {
    auth,
    authRoles
}


/*  no se puede esportar a nivel de servidor por que la prepimer llamada
    que se use para logear o registrar nos va a pedir un token, no podemos
    tener un token si no estamos registrados o logeados. */