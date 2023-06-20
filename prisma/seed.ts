import { PrismaClient } from '@prisma/client'
import { ExtColor, IntColor } from './data/color'
import { car, carModel, carType, drive, engine, mission, trim } from './data/model'
import { carDrive, carEngine, carMission, carTrim, CarTrimIntColor, IntExtColor } from './data/relation'

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

  for (const t of engine) {
    await prisma.engine.create({
      data: t
    })
  }

  for (const t of mission) {
    await prisma.mission.create({
      data: t
    })
  }

  for (const t of drive) {
    await prisma.drive.create({
      data: t
    })
  }

  for (const t of trim) {
    await prisma.trim.create({
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

  for (const t of IntColor) {
    await prisma.intColor.create({
      data: t
    })
  }

  for (const t of ExtColor) {
    await prisma.extColor.create({
      data: t
    })
  }

  for (const t of IntExtColor) {
    await prisma.intExtColor.create({
      data: t
    })
  }

  for (const t of CarTrimIntColor) {
    await prisma.carTrimIntColor.create({
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
