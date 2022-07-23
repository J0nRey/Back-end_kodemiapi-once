const express = require('express')
const Mentors = require('../usecases/mentors')
const router = express.Router()

router.get('/', async (request, response)=>{
    try{

        const allMentors = await Mentors.getAll()

        response.json({
            success: true,
            message: 'All Mentors',
            data: {
                mentors: allMentors
            }
        })
    }catch(error){
        response.status(400)
        response.json({
            success: false,
            message: ' Error at get all Mentors ',
            error: error.message
        })
    }
})

router.post('/', async (request, response)=>{
    try {

        const mentorCreated = await Mentors.create(request.body)

        response.json({
            success: true,
            message: ' Mentor created',
            data: {
                mentors: mentorCreated
            }
        })

    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: ' Error at mentor creation ',
            error: error.message
        })
    }
})


router.delete('/:id', async (request, response)=>{
    try {

        const { id } = request.params
        const mentorDelete = await Mentors.deleteById(id)

        response.json({
            success: true,
            message: ' Mentor deleted ',
            data: {
                mentors: mentorDelete
            }
        })

    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: ' Error at mentor deletion ',
            error: error.message
        })
    }
})


router.patch('/:id', async (request, response)=>{
    try {

        const { id } = request.params
        const mentorUpdated = await Mentors.updateById(id, request.body)
  
        response.json({
            success: true,
            message: ' Mentor updated ',
            data: {
                mentors: mentorUpdated
            }
        })

    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: ' Error at mentor update ',
            error: error.message
        })
    }
})

module.exports = router