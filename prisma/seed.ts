import { UserRole, RoomType } from '../src/generated/prisma/enums.js';
import { PrismaClient } from '../src/generated/prisma/client.js';
import { PrismaService } from '../src/prisma/prisma.service.js';

const prisma = new PrismaService();

async function main() {
  console.log('🌱 Start seeding...');

  /**
   * CLEAN DATABASE (ORDER MATTERS)
   */
  await prisma.payment.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.blockedTime.deleteMany();
  await prisma.coworkingSpace.deleteMany();
  await prisma.user.deleteMany();

  /**
   * USERS
   */
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      phone: '0800000001',
      role: UserRole.ADMIN,
    },
  });

  const provider1 = await prisma.user.create({
    data: {
      name: 'Provider One',
      email: 'provider1@example.com',
      password: 'password123',
      phone: '0800000002',
      role: UserRole.PROVIDER,
    },
  });

  const provider2 = await prisma.user.create({
    data: {
      name: 'Provider Two',
      email: 'provider2@example.com',
      password: 'password123',
      phone: '0800000003',
      role: UserRole.PROVIDER,
    },
  });

  const user1 = await prisma.user.create({
    data: {
      name: 'User One',
      email: 'user1@example.com',
      password: 'password123',
      phone: '0800000004',
      role: UserRole.USER,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'User Two',
      email: 'user2@example.com',
      password: 'password123',
      phone: '0800000005',
      role: UserRole.USER,
    },
  });

  /**
   * COWORKING SPACES (ONLY PROVIDERS)
   */
  await prisma.coworkingSpace.createMany({
    data: [
      {
        ownerId: provider1.id,
        name: 'Downtown Meeting Room',
        address: 'Jl. Sudirman No. 1',
        description: 'Perfect for business meetings',
        amenities: ['WiFi', 'Projector', 'Whiteboard'],
        pricePerDay: 50,
        type: RoomType.MEETING_ROOM,
        isVerified: true,
      },
      {
        ownerId: provider1.id,
        name: 'Private Office Elite',
        address: 'Jl. Thamrin No. 10',
        description: 'Private office for professionals',
        amenities: ['WiFi', 'AC', 'Printer'],
        pricePerDay: 80,
        type: RoomType.PRIVATE_OFFICE,
      },
      {
        ownerId: provider2.id,
        name: 'Podcast Studio Pro',
        address: 'Jl. Gatot Subroto No. 5',
        description: 'Professional podcast studio',
        amenities: ['Microphone', 'Soundproof', 'Mixer'],
        pricePerDay: 120,
        type: RoomType.PODCAST_STUDIO,
        isVerified: true,
      },
      {
        ownerId: provider2.id,
        name: 'Startup Meeting Space',
        address: 'Jl. Kuningan No. 20',
        description: 'Ideal for startups',
        amenities: ['WiFi', 'TV', 'Coffee'],
        pricePerDay: 60,
        type: RoomType.MEETING_ROOM,
      },
      {
        ownerId: provider2.id,
        name: 'Executive Private Office',
        address: 'Jl. SCBD No. 8',
        description: 'Premium private office',
        amenities: ['WiFi', 'AC', 'Parking', 'Reception'],
        pricePerDay: 100,
        type: RoomType.PRIVATE_OFFICE,
      },
    ],
  });

  console.log('✅ Seeding completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
