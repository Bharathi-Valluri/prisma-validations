const client_controller = require('../controller/clientController')
const router = require('express').Router()
router.post('/saveUserDetails', client_controller.saveClientCredentials)
router.put('/updateUserDetails', client_controller.updateClientCredentials)

module.exports = router
