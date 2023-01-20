const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { appConst } = require('../router/constants')

const saveClientCredentials = async (req, res) => {
  try {
    let Inarray = []
    req.body.createMany.map(obj => {
      Inarray.push(obj.name)
    })
    const users = await prisma.User.findMany({
      where: {
        name: {
          in: Inarray
        }
      }
    })
    if (users.length === 0) {
      const user = await prisma.Client.create({
        data: {
          Name: req.body.Name,
          user: {
            createMany: { data: req.body.createMany, skipDuplicates: true }
          }
        }
      })
      console.log(user)
    } else {
      let userArray = []
      users.map(obj => {
        userArray.push(obj.name)
      })
      CreateMany = req.body.createMany.filter(Obj => {
        return !userArray.includes(Obj.name)
      })
      // console.log(CreateMany, '--------------------------')
      let user = await prisma.Client.create({
        data: {
          Name: req.body.Name,
          user: {
            createMany: { data: CreateMany, skipDuplicates: true }
          }
        }
      })
    }
    res.status(200).json({
      status: appConst.status.success,
      message: 'success'
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      status: appConst.status.fail,
      response: null,
      message: 'failed'
    })
  }
}

const updateClientCredentials = async (req, res) => {
  try {
    const user = await prisma.Client.update({
      where: {
        id: req.body.cid
      },
      data: {
        Name: req.body.Name,
        user: {
          connect: {
            id: req.body.id
          },

          create: {
            Name: req.body.Name1
          }
        }
      }
    })
    res.status(200).json({
      status: appConst.status.update,
      response: user,
      message: 'success'
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      status: appConst.status.fail,
      response: null,
      message: 'failed'
    })
  }
}

module.exports = { saveClientCredentials, updateClientCredentials }
