const express = require ('express')
const router = express.Router()
const {
    getEntries,
    setEntry,
    updateEntry,
    deleteEntry
} = require('../controllers/goalController')
const { protect } = require('../middleware/authMiddleware')


router.route('/').get(protect, getEntries).post(protect, setEntry)
router.route('/:id').put(protect, updateEntry).delete(protect, deleteEntry)

module.exports = router