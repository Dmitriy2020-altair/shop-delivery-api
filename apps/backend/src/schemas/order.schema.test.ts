import { describe, expect, it } from 'vitest';

import { CreateOrderSchema } from '../schemas/order.schema.js';

describe('CreateOrderSchema', () => {
  it('accepts a valid order with at least one item', () => {
    const result = CreateOrderSchema.safeParse({
      items: [{ productId: 1, quantity: 2 }],
    });

    expect(result.success).toBe(true);
  });

  it('rejects an empty items array', () => {
    const result = CreateOrderSchema.safeParse({ items: [] });

    expect(result.success).toBe(false);
  });

  it('rejects non-positive productId or quantity', () => {
    expect(
      CreateOrderSchema.safeParse({
        items: [{ productId: 0, quantity: 1 }],
      }).success,
    ).toBe(false);

    expect(
      CreateOrderSchema.safeParse({
        items: [{ productId: 1, quantity: -1 }],
      }).success,
    ).toBe(false);
  });
});
