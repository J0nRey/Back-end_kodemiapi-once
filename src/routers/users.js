const express = require('express')

const router = express.Router()

const users = require('../usecases/users') 

router.post('/', async (request, response)=>{
    try {

        const newUser = await users.signUp(request.body)
        response.json({
             success: true,
             message: 'user registered',
             data: { // Por seguridad no regresar este susario
                 user: newUser
             }
        })

    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Could not register',
            error: error.message 
        })
    }
})


router.get('/', async (request, response)=>{
    try {

        const allUsers = await users.getAll()

        response.json({
            success: true,
            message: 'All users',
            data: {
                users: allUsers
            } 
        })

    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Could not get users',
            error: error.message 
        })
    }
})

//Router de login
router.post('/login', async (request, response)=>{
    try {

        const { email, password} = request.body
        const token = await users.login( email, password ) // const jwt

        response.json({
            success: true,
            message: 'Logged in',
            data:{
                token // jwt
            }
        })

    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Could not log in',
            error: error.message 
        })
    }
})

module.exports = router