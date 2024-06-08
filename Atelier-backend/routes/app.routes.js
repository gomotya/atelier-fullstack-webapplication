const Router = require('express')

const router = new Router()
const clientController = require('../controller/client.controller')
const employeesController = require('../controller/employees.controller')
const servicesController = require('../controller/services.controller')
const ordersController = require('../controller/orders.controller')
const authController = require('../controller/auth.controller')
const chartController = require('../controller/chart.controller')
const reportController = require('../controller/report.controller')

router.post('/users', authController.createUser);
router.get('/users', authController.getUsers);

router.get('/report', reportController.getEveryClientSum)
router.get('/report-sum', reportController.getSumOfTheDay)

router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.get('/home', ordersController.getForHomePage)
router.get('/service-counts', chartController.getServiceCounts);

router.get('/client', clientController.getClients)
router.post('/client', clientController.createClient) 
router.get('/client/:id', clientController.getClient)
router.put('/client', clientController.updateClient)
router.delete('/client/:id', clientController.deleteClient)


router.get('/employees', employeesController.getEmployees)
router.get('/employees/:id', employeesController.getEmployee)
router.post('/employees',  employeesController.createEmployee)
router.put('/employees',employeesController.updateEmployee)
router.delete('/employees/:id',  employeesController.deleteEmployee)

router.get('/job-title',  employeesController.getJobTitles)
router.get('/job-title/:id',  employeesController.getJobTitle)

router.post('/services', servicesController.createService)
router.get('/services', servicesController.getServices)
router.get('/services/:id', servicesController.getService)
router.put('/services', servicesController.updateService)
router.delete('/services/:id', servicesController.deleteService)

router.get('/orders', ordersController.getOrders)
router.post('/orders',ordersController.createOrder)
router.put('/orders', ordersController.updateOrder)
router.delete('/orders/:id', ordersController.deleteOrder)


router.get('/order-types', ordersController.getOrderTypes)
router.get('/order-types/:id', ordersController.getOrderType)

router.get('/details/:id', ordersController.getOrderDetails)
router.post('/details', ordersController.createOrderDetail)
router.put('/details/:id', ordersController.updateOrderDetails)
router.delete('/details/:id', ordersController.deleteOrderDetails)
router.delete('/all-details/:id', ordersController.deleteAllOrderDetails)

module.exports = router