import { PrismaClient } from '@prisma/client'
import { ExtColors, IntColors } from './seeding/color'
import { cars, carModels, carTypes, drives, engines, missions, trims, options } from './seeding/model'
import {
  carDrives,
  carEngines,
  carMissions,
  carTrims,
  CarTrimIntColors,
  IntExtColors,
  autoChoiceOptions,
  requiredOptions,
  disabledOptions,
  carModelOptions
} from './seeding/relation'

const prisma = new PrismaClient()

async function main() {
  for (const carType of carTypes) {
    await prisma.carType.create({
      data: carType
    })
  }

  for (const car of cars) {
    await prisma.car.create({
      data: car
    })
  }

  for (const engine of engines) {
    await prisma.engine.create({
      data: engine
    })
  }

  for (const mission of missions) {
    await prisma.mission.create({
      data: mission
    })
  }

  for (const drive of drives) {
    await prisma.drive.create({
      data: drive
    })
  }

  for (const trim of trims) {
    await prisma.trim.create({
      data: trim
    })
  }

  for (const carEngine of carEngines) {
    await prisma.carEngine.create({
      data: carEngine
    })
  }

  for (const carMission of carMissions) {
    await prisma.carMission.create({
      data: carMission
    })
  }

  for (const carDrive of carDrives) {
    await prisma.carDrive.create({
      data: carDrive
    })
  }

  for (const carDrive of carTrims) {
    await prisma.carTrim.create({
      data: carDrive
    })
  }

  for (const carModel of carModels) {
    const checkDriveCode = drives.findIndex(drive => drive.driveCode === carModel.driveCode)
    await prisma.carModel.create({
      data: {
        modelCode: carModel.modelCode,
        modelName: carModel.modelName,
        modelPrice: carModel.modelPrice,
        carId: cars.findIndex(car => car.carCode === carModel.carCode) + 1,
        engineId: engines.findIndex(engine => engine.engineCode === carModel.engineCode) + 1,
        missionId: missions.findIndex(mission => mission.missionCode === carModel.missionCode) + 1,
        driveId: checkDriveCode === -1 ? null : checkDriveCode + 1,
        trimId: trims.findIndex(trim => trim.trimCode === carModel.trimCode) + 1
      }
    })
  }

  for (const IntColor of IntColors) {
    await prisma.intColor.create({
      data: IntColor
    })
  }

  for (const ExtColor of ExtColors) {
    await prisma.extColor.create({
      data: ExtColor
    })
  }

  for (const intExtColor of IntExtColors) {
    await prisma.intExtColor.create({
      data: {
        intColorId: IntColors.findIndex(intColor => intColor.intColorCode === intExtColor.intColorCode) + 1,
        extColorId: ExtColors.findIndex(extColor => extColor.extColorCode === intExtColor.extColorCode) + 1
      }
    })
  }

  for (const CarTrimIntColor of CarTrimIntColors) {
    await prisma.carTrimIntColor.create({
      data: {
        carId: cars.findIndex(car => car.carCode === CarTrimIntColor.carCode) + 1,
        trimId: trims.findIndex(trim => trim.trimCode === CarTrimIntColor.trimCode) + 1,
        intColorId: IntColors.findIndex(intColor => intColor.intColorCode === CarTrimIntColor.intColorCode) + 1
      }
    })
  }

  for (const option of options) {
    await prisma.option.create({
      data: option
    })
  }

  for (const autoChoiceOption of autoChoiceOptions) {
    await prisma.autoChoiceOption.create({
      data: {
        intColorId: IntColors.findIndex(intColor => intColor.intColorCode === autoChoiceOption.intColorCode) + 1,
        optionId: options.findIndex(option => option.optionCode === autoChoiceOption.optionCode) + 1
      }
    })
  }

  for (const requiredOption of requiredOptions) {
    await prisma.requiredOption.create({
      data: {
        optionId: options.findIndex(option => option.optionCode === requiredOption.optionCode) + 1,
        requiredOptionId: options.findIndex(option => option.optionCode === requiredOption.requiredOptionCode) + 1
      }
    })
  }

  for (const disabledOption of disabledOptions) {
    await prisma.disabledOption.create({
      data: {
        optionId: options.findIndex(option => option.optionCode === disabledOption.optionCode) + 1,
        disabledOptionId: options.findIndex(option => option.optionCode === disabledOption.disabledOptionCode) + 1
      }
    })
  }

  for (const carModelOption of carModelOptions) {
    const modelCode = carModelOption.modelCode
    const optionCodes = carModelOption.optionCodes
    for (const optionCode of optionCodes) {
      await prisma.carModelOption.create({
        data: {
          modelId: carModels.findIndex(carModel => carModel.modelCode === modelCode) + 1,
          optionId: options.findIndex(option => option.optionCode === optionCode) + 1
        }
      })
    }
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
