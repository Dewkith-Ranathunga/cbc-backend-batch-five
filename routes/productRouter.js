import express from 'express';
import { deleteProduct, getProducts, saveProduct } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get('/', getProducts);    
productRouter.post('/', saveProduct); 
productRouter.delete('/:productId', deleteProduct);

export default productRouter; 