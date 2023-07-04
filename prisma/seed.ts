import { PrismaClient } from '@prisma/client'
import { ExtColors, IntColors } from './seeding/color'
import { cars, carModels, carTypes, drives, engines, missions, trims } from './seeding/model'
import { options, tuixs } from './seeding/option'
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
  carModelOptions,
  carModelTuixs,
  disabledTuixs,
  tuixRequiredOptions
} from './seeding/relation'
import * as fs from 'fs'
import * as util from 'util'

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query'
    }
  ]
})

const writeFile = util.promisify(fs.writeFile)
const appendFile = util.promisify(fs.appendFile)

prisma.$on('query', async e => {
  if (e.query === 'BEGIN' || e.query === 'COMMIT') return

  const params = JSON.parse(e.params)
  const completeQuery = replacePlaceholders(e.query, params)
    .replace(/`database`\./g, '')
    .replace(/, /g, ',\n  ')

  await appendFile('./prisma/seed-query-log.sql', `${completeQuery}\n`)
})

function replacePlaceholders(query: string, params: string[]) {
  let i = 0
  return query.replace(/\?/g, () => {
    if (i < params.length) {
      let param = params[i]
      if (typeof param === 'string') {
        param = `'${param}'`
      }
      i++
      return param
    } else {
      return '?'
    }
  })
}

async function main() {
  await writeFile('./prisma/seed-query-log.sql', '')

  for (const carType of carTypes) {
    await prisma.carType.createMany({
      data: carType
    })
  }
  await appendFile('./prisma/seed-query-log.sql', `\n\n`)

  for (const car of cars) {
    await prisma.car.createMany({
      data: car
    })
  }
  await appendFile('./prisma/seed-query-log.sql', `\n\n`)

  for (const engine of engines) {
    await prisma.engine.createMany({
      data: engine
    })
  }
  await appendFile('./prisma/seed-query-log.sql', `\n\n`)

  for (const mission of missions) {
    await prisma.mission.createMany({
      data: mission
    })
  }
  await appendFile('./prisma/seed-query-log.sql', `\n\n`)

  for (const drive of drives) {
    await prisma.drive.createMany({
      data: drive
    })
  }
  await appendFile('./prisma/seed-query-log.sql', `\n\n`)

  for (const trim of trims) {
    await prisma.trim.createMany({
      data: trim
    })
  }
  await appendFile('./prisma/seed-query-log.sql', `\n\n`)

  for (const carEngine of carEngines) {
    await prisma.carEngine.createMany({
      data: carEngine
    })
  }
  await appendFile('./prisma/seed-query-log.sql', `\n\n`)

  for (const carMission of carMissions) {
    await prisma.carMission.createMany({
      data: carMission
    })
  }
  await appendFile('./prisma/seed-query-log.sql', `\n\n`)

  for (const carDrive of carDrives) {
    await prisma.carDrive.createMany({
      data: carDrive
    })
  }
  await appendFile('./prisma/seed-query-log.sql', `\n\n`)

  for (const carDrive of carTrims) {
    await prisma.carTrim.createMany({
      data: carDrive
    })
  }
  await appendFile('./prisma/seed-query-log.sql', `\n\n`)

  for (const carModel of carModels) {
    const checkDrive = drives.findIndex(drive => drive.driveCode === carModel.driveCode)
    await prisma.carModel.createMany({
      data: {
        modelCode: carModel.modelCode,
        modelName: carModel.modelName,
        modelImagePath: carModel.modelImagePath,
        modelPrice: carModel.modelPrice,
        carId: cars.findIndex(car => car.carCode === carModel.carCode) + 1,
        engineId: engines.findIndex(engine => engine.engineCode === carModel.engineCode) + 1,
        missionId: missions.findIndex(mission => mission.missionCode === carModel.missionCode) + 1,
        driveId: checkDrive != -1 ? checkDrive + 1 : null,
        trimId: trims.findIndex(trim => trim.trimCode === carModel.trimCode) + 1
      }
    })
  }
  await appendFile('./prisma/seed-query-log.sql', `\n\n`)

  for (const IntColor of IntColors) {
    await prisma.intColor.createMany({
      data: IntColor
    })
  }
  await appendFile('./prisma/seed-query-log.sql', `\n\n`)

  for (const ExtColor of ExtColors) {
    await prisma.extColor.createMany({
      data: ExtColor
    })
  }
  await appendFile('./prisma/seed-query-log.sql', `\n\n`)

  for (const intExtColor of IntExtColors) {
    const intColorCode = intExtColor.intColorCode
    const extColorCodes = intExtColor.extColorCodes
    for (const extColorCode of extColorCodes) {
      await prisma.intExtColor.createMany({
        data: {
          intColorId: IntColors.findIndex(intColor => intColor.intColorCode === intColorCode) + 1,
          extColorId: ExtColors.findIndex(extColor => extColor.extColorCode === extColorCode) + 1
        }
      })
    }
  }
  await appendFile('./prisma/seed-query-log.sql', `\n\n`)

  for (const CarTrimIntColor of CarTrimIntColors) {
    await prisma.carTrimIntColor.createMany({
      data: {
        carId: cars.findIndex(car => car.carCode === CarTrimIntColor.carCode) + 1,
        trimId: trims.findIndex(trim => trim.trimCode === CarTrimIntColor.trimCode) + 1,
        intColorId: IntColors.findIndex(intColor => intColor.intColorCode === CarTrimIntColor.intColorCode) + 1
      }
    })
  }
  await appendFile('./prisma/seed-query-log.sql', `\n\n`)

  for (const option of options) {
    await prisma.option.createMany({
      data: option
    })
  }
  await appendFile('./prisma/seed-query-log.sql', `\n\n`)

  for (const carModelOption of carModelOptions) {
    const modelCode = carModelOption.modelCode
    const optionCodes = carModelOption.optionCodes
    for (const optionCode of optionCodes) {
      await prisma.carModelOption.createMany({
        data: {
          modelId: carModels.findIndex(carModel => carModel.modelCode === modelCode) + 1,
          optionId: options.findIndex(option => option.optionCode === optionCode) + 1
        }
      })
    }
  }
  await appendFile('./prisma/seed-query-log.sql', `\n\n`)

  for (const autoChoiceOption of autoChoiceOptions) {
    await prisma.autoChoiceOption.createMany({
      data: {
        intColorId: IntColors.findIndex(intColor => intColor.intColorCode === autoChoiceOption.intColorCode) + 1,
        optionId: options.findIndex(option => option.optionCode === autoChoiceOption.optionCode) + 1
      }
    })
  }
  await appendFile('./prisma/seed-query-log.sql', `\n\n`)

  for (const requiredOption of requiredOptions) {
    await prisma.requiredOption.createMany({
      data: {
        optionId: options.findIndex(option => option.optionCode === requiredOption.optionCode) + 1,
        requiredOptionId: options.findIndex(option => option.optionCode === requiredOption.requiredOptionCode) + 1
      }
    })
  }
  await appendFile('./prisma/seed-query-log.sql', `\n\n`)

  for (const disabledOption of disabledOptions) {
    await prisma.disabledOption.createMany({
      data: {
        optionId: options.findIndex(option => option.optionCode === disabledOption.optionCode) + 1,
        disabledOptionId: options.findIndex(option => option.optionCode === disabledOption.disabledOptionCode) + 1
      }
    })
  }
  await appendFile('./prisma/seed-query-log.sql', `\n\n`)

  for (const tuix of tuixs) {
    await prisma.tuix.createMany({
      data: tuix
    })
  }
  await appendFile('./prisma/seed-query-log.sql', `\n\n`)

  for (const carModelTuix of carModelTuixs) {
    const modelCode = carModelTuix.modelCode
    const tuixCodes = carModelTuix.tuixCodes
    for (const tuixCode of tuixCodes) {
      await prisma.carModelTuix.createMany({
        data: {
          modelId: carModels.findIndex(carModel => carModel.modelCode === modelCode) + 1,
          tuixId: tuixs.findIndex(tuix => tuix.tuixCode === tuixCode) + 1
        }
      })
    }
  }
  await appendFile('./prisma/seed-query-log.sql', `\n\n`)

  for (const disabledTuix of disabledTuixs) {
    await prisma.disabledTuix.createMany({
      data: {
        tuixId: tuixs.findIndex(tuix => tuix.tuixCode === disabledTuix.tuixCode) + 1,
        disabledTuixId: tuixs.findIndex(tuix => tuix.tuixCode === disabledTuix.disabledTuixCode) + 1
      }
    })
  }
  await appendFile('./prisma/seed-query-log.sql', `\n\n`)

  for (const tuixRequiredOption of tuixRequiredOptions) {
    await prisma.tuixRequiredOption.createMany({
      data: {
        tuixId: tuixs.findIndex(tuix => tuix.tuixCode === tuixRequiredOption.tuixCode) + 1,
        optionId: options.findIndex(option => option.optionCode === tuixRequiredOption.optionCode) + 1
      }
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
