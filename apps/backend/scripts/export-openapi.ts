import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { swaggerSpec } from '../src/config/swagger/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.join(__dirname, '../openapi.json');

writeFileSync(outputPath, `${JSON.stringify(swaggerSpec, null, 2)}\n`, 'utf8');

console.log(`OpenAPI schema exported to ${outputPath}`);
