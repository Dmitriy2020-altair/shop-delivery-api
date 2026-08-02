import { Router } from 'express';

import productController from '../controllers/products.controller.js';
import { validateBody } from '../middlewares/validateBody.js';
import { validateId } from '../middlewares/validateId.js';
import { CreateProductSchema } from '../schemas/product.schema.js';

const router = Router();

router.get('/', productController.getProducts);
router.post(
  '/',
  validateBody(CreateProductSchema),
  productController.createProduct,
);
router.get('/:id', validateId, productController.getProductById);
router.put('/:id', validateId, productController.updateProduct);
router.delete('/:id', validateId, productController.deleteProduct);

export default router;
