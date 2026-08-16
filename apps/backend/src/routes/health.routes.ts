import { Router } from 'express';
import { getHealth } from '../controllers/health.controller.js';

const router = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check
 *     tags:
 *       - Health
 *     responses:
 *       '200':
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthStatus'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/', getHealth);

export default router;
