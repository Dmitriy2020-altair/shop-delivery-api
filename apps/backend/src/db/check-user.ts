import prisma from './prisma.js';

const user = await prisma.users.findUnique({
  where: {
    id: 2,
  },
  include: {
    orders: true,
  },
});

console.log(user);

await prisma.$disconnect();
