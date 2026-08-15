import { Router } from 'express';

import productController from '../controllers/products.controller.js';
import { validateBody } from '../middlewares/validateBody.js';
import { validateId } from '../middlewares/validateId.js';
import { CreateProductSchema, UpdateProductSchema } from '../schemas/product.schema.js';

const router = Router();

router.get('/', productController.getProducts);
router.post('/', validateBody(CreateProductSchema), productController.createProduct);
router.get('/:id', validateId, productController.getProductById);
router.patch(
  '/:id',
  validateId,
  validateBody(UpdateProductSchema),
  productController.updateProduct
);
router.delete('/:id', validateId, productController.deleteProduct);

export default router;
