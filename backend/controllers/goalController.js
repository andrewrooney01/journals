const { text } = require('express')
const asyncHandler = require('express-async-handler')
const { rawListeners } = require('../models/entryModel')
const Entry = require('../models/entryModel')


// @ desc Get Goals
// @route GET /api/goals/
// @access Private
const getGoals = asyncHandler(async (req,res) => {
    const target = await Entry.find()

    res.status(200).json(target)
})

// @ desc Set Goal
// @route POST /api/goals/
// @access
const setGoal = asyncHandler(async (req,res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a new text field')
    }

    const target = await Entry.create({
        text: req.body.text,
    })
    res.status(200).json(target)
})

// @ desc Update Goal
// @route POST /api/goals/:id
// @access
const updateGoal = asyncHandler(async (req,res) => {
    const target = await Entry.findById(req.params.id)

    if(!target) {
        req.status(400)
        throw new Error('Entry not found.')
    }
    const updatedGoal = await Entry.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })


    res.status(200).json(target)
})

// @ desc Delete Goal
// @route POST /api/goals/:id
// @access
const deleteGoal = asyncHandler(async (req,res) => {
    const target = await Entry.findById(req.params.id)

    if(!target) {
        req.status(400)
        throw new Error('Entry not found.')
    }

    await target.remove()

    res.status(200).json({id: req.params.id})
})


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}