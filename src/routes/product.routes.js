import express from 'express'
import { createProduct, deleteProduct, getAllProducts, getByIdProduct, getProductsByCategory, updateProduct } from '../controller/product.controller.js'

const router = express.Router()

router.get('/all', getAllProducts)
router.get('/:id', getByIdProduct)
router.post('/create', createProduct)
router.put('/update/:id', updateProduct)
router.delete('/delete/:id', deleteProduct)
router.get('/category/name', getProductsByCategory)

export default router