export type MockProduct = {
  id: string;
  name: string;
  category: string;
  price: number;
  available: boolean;
  quantity: number;
  description: string;
};

export const mockProducts: MockProduct[] = [
  {
    id: "p1",
    name: "Organic Avocados",
    category: "Grocery",
    price: 6.49,
    available: true,
    quantity: 48,
    description: "Ripe Hass avocados, pack of 4.",
  },
  {
    id: "p2",
    name: "Sparkling Water",
    category: "Drinks",
    price: 3.25,
    available: true,
    quantity: 120,
    description: "Lemon sparkling water, 12-pack.",
  },
  {
    id: "p3",
    name: "Ceramic Mug Set",
    category: "Household",
    price: 24.0,
    available: true,
    quantity: 18,
    description: "Matte ceramic mugs, set of 2.",
  },
  {
    id: "p4",
    name: "Sourdough Loaf",
    category: "Bakery",
    price: 5.75,
    available: false,
    quantity: 0,
    description: "Freshly baked country sourdough.",
  },
  {
    id: "p5",
    name: "Cold Brew Concentrate",
    category: "Drinks",
    price: 11.9,
    available: true,
    quantity: 32,
    description: "Smooth cold brew, 750ml bottle.",
  },
  {
    id: "p6",
    name: "Bamboo Cutting Board",
    category: "Household",
    price: 18.5,
    available: true,
    quantity: 21,
    description: "Sustainable bamboo board, medium.",
  },
  {
    id: "p7",
    name: "Heirloom Tomatoes",
    category: "Grocery",
    price: 4.2,
    available: true,
    quantity: 64,
    description: "Locally grown mixed tomatoes.",
  },
  {
    id: "p8",
    name: "Dark Chocolate Bar",
    category: "Grocery",
    price: 3.8,
    available: true,
    quantity: 90,
    description: "72% cocoa single-origin chocolate.",
  },
];

export const productCategories = [
  "All",
  "Grocery",
  "Drinks",
  "Household",
  "Bakery",
] as const;
