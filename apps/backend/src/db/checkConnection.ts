import prisma from './prisma.js';

export async function checkConnection(): Promise<void> {
  try {
    const result = await prisma.$queryRaw<[{ now: Date }]>`SELECT NOW() as now`;

    console.log('✅ PostgreSQL connected');
    console.log(result[0]);
  } catch (error) {
    console.error('❌ Failed to connect to PostgreSQL');
    console.error(error);

    process.exit(1);
  }
}
