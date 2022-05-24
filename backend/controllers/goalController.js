const { feeling } = require('express')
const { thought } = require('express')
const asyncHandler = require('express-async-handler')
const { rawListeners } = require('../models/entryModel') // deprecated?
const Entry = require('../models/entryModel')
const User = require('../models/userModel')


// @ desc Get Entries
// @route GET /api/goals/
// @access Private
const getEntries = asyncHandler(async (req,res) => {
    const target = await Entry.find({user: req.user.id})

    res.status(200).json(target)
})

// @ desc Set Entry
// @route POST /api/goals/
// @access
const setEntry = asyncHandler(async (req,res) => {
    if(!req.body.feeling || !req.body.thought) {
        res.status(400)
        throw new Error('Please pass the user feeling type String')
    }

    const target = await Entry.create({
        feeling: req.body.feeling,
        thought: req.body.thought,
        user: req.user.id,
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

    const user = await User.findById(req.user.id)

    // Check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Validate user
    if(Entry.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
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
    
    const user = await User.findById(req.user.id)

    // Check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Validate user
    if(Entry.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
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