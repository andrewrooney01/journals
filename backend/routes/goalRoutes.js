const express = require ('express')
const router = express.Router()
const {
    getEntries,
    setEntry,
    updateEntry,
    deleteEntry
} = require('../controllers/goalController')

router.route('/').get(getEntries).post(setEntry)
router.route('/:id').put(updateEntry).delete(deleteEntry)

module.exports = router