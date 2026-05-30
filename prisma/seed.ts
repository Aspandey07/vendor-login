import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting to seed database...')

  // Clear existing data
  await prisma.notification.deleteMany()
  await prisma.communicationLog.deleteMany()
  await prisma.note.deleteMany()
  await prisma.inquiryTimeline.deleteMany()
  await prisma.quote.deleteMany()
  await prisma.inquiry.deleteMany()
  await prisma.vendor.deleteMany()
  await prisma.user.deleteMany()

  console.log('Existing data cleared.')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.create({
    data: {
      email: 'admin@vendorbook.com',
      password: adminPassword,
      role: 'ADMIN'
    }
  })

  // Create vendor user
  const vendorPassword = await bcrypt.hash('vendor123', 10)
  const vendorUser = await prisma.user.create({
    data: {
      email: 'vendor@example.com',
      password: vendorPassword,
      role: 'VENDOR'
    }
  })

  // Create vendor profile
  const vendor = await prisma.vendor.create({
    data: {
      userId: vendorUser.id,
      name: 'Premium Event Solutions',
      category: 'Venue & Catering',
      location: 'New York, NY',
      email: 'contact@example.com',
      phone: '+1 (555) 123-4567',
      description: 'The best all-in-one venue and catering solution for your premium events.',
      services: ['Venue Rental', 'Catering', 'Photography', 'Decor'],
    }
  })

  // Create inquiries
  const i1 = await prisma.inquiry.create({
    data: {
      vendorId: vendor.id,
      customerName: 'Alice Johnson',
      customerEmail: 'alice@example.com',
      customerPhone: '555-1000',
      eventType: 'Wedding Reception',
      eventDate: new Date('2026-08-15T18:00:00Z'),
      budget: 5000,
      message: 'Looking for a venue for our wedding reception for 150 guests.',
      status: 'New',
    }
  })

  const i2 = await prisma.inquiry.create({
    data: {
      vendorId: vendor.id,
      customerName: 'Bob Smith',
      customerEmail: 'bob@example.com',
      customerPhone: '555-2000',
      eventType: 'Corporate Party',
      eventDate: new Date('2026-07-20T19:00:00Z'),
      budget: 2500,
      message: 'Need a small space and catering for a team of 40.',
      status: 'Confirmed',
    }
  })
  const i3 = await prisma.inquiry.create({
    data: {
      vendorId: vendor.id,
      customerName: 'Charlie Davis',
      customerEmail: 'charlie@example.com',
      customerPhone: '555-3000',
      eventType: 'Birthday Party',
      eventDate: new Date('2026-06-10T14:00:00Z'),
      budget: 800,
      message: 'Looking for an energetic space for a 10th birthday party with catering.',
      status: 'Contacted',
    }
  })

  const i4 = await prisma.inquiry.create({
    data: {
      vendorId: vendor.id,
      customerName: 'Diana Prince',
      customerEmail: 'diana@example.com',
      customerPhone: '555-4000',
      eventType: 'Anniversary Dinner',
      eventDate: new Date('2026-09-05T20:00:00Z'),
      budget: 1200,
      message: 'Intimate dinner setting for our 25th anniversary with close family.',
      status: 'New',
    }
  })

  const i5 = await prisma.inquiry.create({
    data: {
      vendorId: vendor.id,
      customerName: 'Evan Wright',
      customerEmail: 'evan@example.com',
      customerPhone: '555-5000',
      eventType: 'Gala Event',
      eventDate: new Date('2026-11-12T19:00:00Z'),
      budget: 10000,
      message: 'Large charity gala requiring full venue and premium catering.',
      status: 'Rejected',
    }
  })
  console.log('Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
