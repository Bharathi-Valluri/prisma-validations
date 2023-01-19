const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { appConst } = require('../router/constants')

const saveClientCredentials = async (req, res) => {
  try {
    const user = await prisma.Client.create({
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
      status: appConst.status.success,
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
