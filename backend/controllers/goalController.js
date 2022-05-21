//const asyncHandler = require('express-async-handler')

// @ desc Get Goals
// @route GET /api/goals/
// @access Private
const getGoals = (req,res) => {
    res.status(200).json({ message: 'Get Goals' })
}

// @ desc Set Goal
// @route POST /api/goals/
// @access
const setGoal = (req,res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a new text field')
    }
    
    res.status(200).json({message: 'Set Goal'})
}

// @ desc Update Goal
// @route POST /api/goals/:id
// @access
const updateGoal = (req,res) => {
    res.status(200).json({message: 'Update Goal'})
}

// @ desc Delete Goal
// @route POST /api/goals/:id
// @access
const deleteGoal = (req,res) => {
    res.status(200).json({message: 'Delete Goal'})
}


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}