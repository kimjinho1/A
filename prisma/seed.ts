import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const carBody = [
    {
      carBodyCode: 'S',
      carBodyName: '승용'
    },
    {
      carBodyCode: 'J',
      carBodyName: 'SUV'
    }
  ]

  const carType = [
    {
      carTypeCode: 'CN12',
      carTypeName: '더 뉴 아반뗴',
      carBodyCode: 'S'
    },
    {
      carTypeCode: 'NX05',
      carTypeName: '투싼',
      carBodyCode: 'J'
    }
  ]

  for (const t of carBody) {
    await prisma.carBody.create({
      data: t
    })
  }

  for (const t of carType) {
    await prisma.carType.create({
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
