import express from 'express'
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from '../controller/category.controller.js'

const router = express.Router()

router.get('/all', getAllCategories)
router.get('/:id', getCategoryById)
router.post('/create', createCategory)
router.put('/update/:id', updateCategory)
router.delete('/delete/:id', deleteCategory)

export default router