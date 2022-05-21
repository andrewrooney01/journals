const { feeling } = require('express')
const { thought } = require('express')
const asyncHandler = require('express-async-handler')
const { rawListeners } = require('../models/entryModel')
const Entry = require('../models/entryModel')


// @ desc Get Entries
// @route GET /api/goals/
// @access Private
const getEntries = asyncHandler(async (req,res) => {
    const target = await Entry.find()

    res.status(200).json(target)
})

// @ desc Set Goal
// @route POST /api/goals/
// @access
const setEntry = asyncHandler(async (req,res) => {
    if(!req.body.feeling || !req.body.thought) {
        res.status(400)
        throw new Error('Please add a new text field')
    }

    const target = await Entry.create({
        feeling: req.body.feeling,
        thought: req.body.thought
    })
    res.status(200).json(target)
})

// @ desc Update Entry
// @route POST /api/goals/:id
// @access
const updateEntry = asyncHandler(async (req,res) => {
    const target = await Entry.findById(req.params.id)

    if(!target) {
        req.status(400)
        throw new Error('Entry not found.')
    }
    const updatedEntry = await Entry.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(target)
})

// @ desc Delete Entry
// @route POST /api/goals/:id
// @access
const deleteEntry = asyncHandler(async (req,res) => {
    const target = await Entry.findById(req.params.id)

    if(!target) {
        req.status(400)
        throw new Error('Entry not found.')
    }

    await target.remove()

    res.status(200).json({id: req.params.id})
})


module.exports = {
    getEntries,
    setEntry,
    updateEntry,
    deleteEntry,
}