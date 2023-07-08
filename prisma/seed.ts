import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as util from 'util'
import { carTypes } from './seeding/model/carTypes'
import { cars } from './seeding/model/cars'
import { engines } from './seeding/model/engines'
import { missions } from './seeding/model/missions'
import { drives } from './seeding/model/drives'
import { trims } from './seeding/model/trims'
import { carEngines } from './seeding/relation/carEngines'
import { carMissions } from './seeding/relation/carMissions'
import { carDrives } from './seeding/relation/carDrives'
import { carTrims } from './seeding/relation/carTrims'
import { carModels } from './seeding/model/carModels'
import { IntExtColors } from './seeding/relation/IntExtColors'
import { intColors } from './seeding/color/intColors'
import { extColors } from './seeding/color/extColors'
import { TrimIntColors } from './seeding/relation/trimIntColors'
import { options } from './seeding/option/options'
import { carModelOptions } from './seeding/relation/carModelOptions'
import { optionTypes } from './seeding/option/optionTypes'
import { intColorOptions } from './seeding/relation/intColorOptions'
import { activateOptions } from './seeding/relation/activateOptions'
import { deactivateOptions } from './seeding/relation/deactivateOptions'
import { deleteOptions } from './seeding/relation/deleteOptions'

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

  for (const IntColor of intColors) {
    await prisma.intColor.createMany({
      data: IntColor
    })
  }
  await appendFile('./prisma/seed-query-log.sql', `\n\n`)

  for (const ExtColor of extColors) {
    await prisma.extColor.createMany({
      data: ExtColor
    })
  }
  await appendFile('./prisma/seed-query-log.sql', `\n\n`)

  for (const intExtColor of IntExtColors) {
    const carId = intExtColor.carId
    const intColorCode = intExtColor.intColorCode
    const extColorCodes = intExtColor.extColorCodes
    for (const extColorCode of extColorCodes) {
      await prisma.intExtColor.createMany({
        data: {
          intColorId:
            intColors.findIndex(intColor => intColor.intColorCode === intColorCode && intColor.carId === carId) + 1,
          extColorId:
            extColors.findIndex(extColor => extColor.extColorCode === extColorCode && extColor.carId === carId) + 1
        }
      })
    }
  }
  await appendFile('./prisma/seed-query-log.sql', `\n\n`)

  for (const trimIntColor of TrimIntColors) {
    await prisma.trimIntColor.createMany({
      data: {
        trimId: trims.findIndex(trim => trim.trimCode === trimIntColor.trimCode) + 1,
        intColorId: intColors.findIndex(intColor => intColor.intColorCode === trimIntColor.intColorCode) + 1
      }
    })
  }
  await appendFile('./prisma/seed-query-log.sql', `\n\n`)

  for (const optionType of optionTypes) {
    await prisma.optionType.createMany({
      data: optionType
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

  for (const intColorOption of intColorOptions) {
    await prisma.intColorOption.createMany({
      data: {
        intColorId: intColors.findIndex(intColor => intColor.intColorCode === intColorOption.intColorCode) + 1,
        optionId: options.findIndex(option => option.optionCode === intColorOption.optionCode) + 1
      }
    })
  }
  await appendFile('./prisma/seed-query-log.sql', `\n\n`)

  await appendFile('./prisma/seed-query-log.sql', `\n\n`)
  for (const activateOption of activateOptions) {
    await prisma.activateOption.createMany({
      data: {
        optionId: options.findIndex(option => option.optionCode === activateOption.optionCode) + 1,
        activateOptionId: options.findIndex(option => option.optionCode === activateOption.activateOptionCode) + 1
      }
    })
  }

  await appendFile('./prisma/seed-query-log.sql', `\n\n`)
  for (const deactivateOption of deactivateOptions) {
    await prisma.deactivateOption.createMany({
      data: {
        optionId: options.findIndex(option => option.optionCode === deactivateOption.optionCode) + 1,
        deactivateOptionId: options.findIndex(option => option.optionCode === deactivateOption.deactivateOptionCode) + 1
      }
    })
  }

  await appendFile('./prisma/seed-query-log.sql', `\n\n`)
  for (const deleteOption of deleteOptions) {
    await prisma.deleteOption.createMany({
      data: {
        optionId: options.findIndex(option => option.optionCode === deleteOption.optionCode) + 1,
        deleteOptionId: options.findIndex(option => option.optionCode === deleteOption.deleteOptionCode) + 1
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
