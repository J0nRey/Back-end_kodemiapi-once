const express = require('express')
const Koders = require('../usecases/koders')

const authMiddlewares = require('../middlewares/auth') /*const auth*/

const router = express.Router()

//router.use(auth)

router.get('/', authMiddlewares.auth, async (request, response)=>{
    try{
        
        const allKoders = await Koders.getAll()

        response.json({
            success: true,
            message: 'All Koders',
            data: {
                koders: allKoders
            }
        })

    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: ' Error at get all koders',
            error: error.message
        })
    }
})


router.post('/', authMiddlewares.authRoles(['admin']), async (request, response)=>{
    try {

        const koderCreated = await Koders.create(request.body)

        response.json({
            success: true,
            message: ' Koder created ',
            data: {
                koders: koderCreated
            }
        })

    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: ' Error at koder creation ',
            error: error.message
        })
    }
})


router.delete('/:id', async (request, response)=>{
    try {

        const { id } = request.params
        const koderDelete = await Koders.deleteById(id)

        response.json({
            success: true,
            message: ' Koder deleted ',
            data: {
                koder: koderDelete
            }
        })

    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: ' Error at koder deletion ',
            error: error.message
        })
    }
})


router.patch('/:id', async (request, response)=>{
    try {

        const { id } = request.params
        const koderUpdated = await Koders.updateById(id, request.body)
  
        response.json({
            success: true,
            message: ' Koder updated ',
            data: {
                koder: koderUpdated
            }
        })

    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: ' Error at koder update ',
            error: error.message
        })
    }
})


module.exports = router
