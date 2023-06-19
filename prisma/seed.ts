import { PrismaClient } from '@prisma/client'
import { car, carDrive, carEngine, carMission, carModel, carTrim, carType } from './model'

const prisma = new PrismaClient()

async function main() {
  for (const t of carType) {
    await prisma.carType.create({
      data: t
    })
  }

  for (const t of car) {
    await prisma.car.create({
      data: t
    })
  }

  for (const t of carEngine) {
    await prisma.carEngine.create({
      data: t
    })
  }

  for (const t of carMission) {
    await prisma.carMission.create({
      data: t
    })
  }

  for (const t of carDrive) {
    await prisma.carDrive.create({
      data: t
    })
  }

  for (const t of carTrim) {
    await prisma.carTrim.create({
      data: t
    })
  }

  for (const t of carModel) {
    await prisma.carModel.create({
      data: t
    })
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
