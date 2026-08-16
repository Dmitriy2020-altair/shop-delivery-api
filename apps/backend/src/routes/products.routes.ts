import { Router } from 'express';

import productController from '../controllers/products.controller.js';
import { validateBody } from '../middlewares/validateBody.js';
import { validateId } from '../middlewares/validateId.js';
import { CreateProductSchema, UpdateProductSchema } from '../schemas/product.schema.js';

const router = Router();

/**
 * @openapi
 * /api/v1/products:
 *   get:
 *     summary: List products
 *     tags:
 *       - Products
 *     responses:
 *       '200':
 *         description: Product list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 *   post:
 *     summary: Create a product
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductRequest'
 *     responses:
 *       '201':
 *         description: Product created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '400':
 *         $ref: '#/components/responses/ValidationError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/', productController.getProducts);
router.post('/', validateBody(CreateProductSchema), productController.createProduct);

/**
 * @openapi
 * /api/v1/products/{id}:
 *   get:
 *     summary: Get a product by id
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           exclusiveMinimum: 0
 *     responses:
 *       '200':
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 *   patch:
 *     summary: Update a product by id
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           exclusiveMinimum: 0
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProductRequest'
 *     responses:
 *       '200':
 *         description: Product updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '400':
 *         description: Invalid id, empty body, or validation failed
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/ErrorMessage'
 *                 - $ref: '#/components/schemas/ValidationError'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 *   delete:
 *     summary: Delete a product by id
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           exclusiveMinimum: 0
 *     responses:
 *       '204':
 *         description: Product deleted
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id', validateId, productController.getProductById);
router.patch(
  '/:id',
  validateId,
  validateBody(UpdateProductSchema),
  productController.updateProduct
);
router.delete('/:id', validateId, productController.deleteProduct);

export default router;
