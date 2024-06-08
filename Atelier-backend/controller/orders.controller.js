const db = require('../db')
class ordersController {
    

    async getOrders(req, res){
        const query = `SELECT orders.id, client.fio AS client_name, employees.fio AS employee_name, order_type.type AS type, orders.order_date 
        FROM orders
        JOIN client ON orders.client_id = client.id
        JOIN employees ON orders.employee_id = employees.id
        JOIN order_type ON orders.type_id = order_type.id;`
        const employees = await db.query(query)
        res.json(employees.rows)

    }

    async getForHomePage(req, res){

        const query = 
        `SELECT employees.fio AS employee_name,
        COUNT(orders.id) AS orders_count
        FROM employees
        LEFT JOIN orders ON employees.id = orders.employee_id AND TO_DATE(orders.order_date, 'DD.MM.YYYY') = CURRENT_DATE
        GROUP BY employees.id, employees.fio, orders.order_date;`
        const info = await db.query(query)
        res.json(info.rows)
    }

    async getOrderType(req, res){
        const id = req.params.id
        const type = await db.query('SELECT * FROM order_type WHERE id = $1', [id])
        res.json(type.rows[0])
    }
    async getOrderTypes(req, res){
        const type = await db.query('SELECT * FROM order_type')
        res.json(type.rows)
    }

    async getOrderDetails(req, res){
        const id = req.params.id
        const type = await db.query('SELECT so.id, so.order_id, so.service_id, s.service_name as service_name, so.amount, so.cost FROM services_orders so JOIN services s ON so.service_id = s.id WHERE so.order_id = $1;', [id])
        res.json(type.rows)
    }

    async updateOrderDetails(req, res){
        const id = req.params.id
        const { service_id, amount, cost } = req.body;
        const result = await db.query('UPDATE services_orders SET service_id = $1, amount = $2, cost = $3 WHERE id = $4 RETURNING *', [service_id, amount, cost, id])
        res.json(result.rows[0])
    }

    async createOrderDetail(req, res){
        const {order_id, service_id, amount, cost} = req.body
        const newDetail = await db.query(`INSERT INTO services_orders (order_id, service_id, amount, cost) values ($1, $2, $3, $4) RETURNING *`, [order_id, service_id, amount, cost])
        res.json(newDetail.rows[0])
    }


    async createOrder(req, res){
        const {client_id, employee_id, type_id, order_date} = req.body
        const newOrder = await db.query(`INSERT INTO orders 
            (client_id, employee_id, type_id, order_date) 
            values ($1, $2, $3, $4) 
            RETURNING *`, [client_id, employee_id, type_id, order_date])
        res.json(newOrder.rows[0])
    }

    

    async updateOrder(req, res) {
        const {id, client_id, employee_id, type_id, order_date} = req.body
        const order = await db.query(
            'UPDATE orders SET client_id = $1, employee_id = $2, type_id = $3, order_date = $4 WHERE id = $5 RETURNING *',
            [client_id, employee_id, type_id, order_date, id]
        )
        res.json(order.rows[0])
    }

    async deleteOrder(req, res){
        const id = req.params.id
        const order = await db.query('DELETE FROM orders WHERE id = $1', [id])
        res.json(order.rows[0])
    }

    async deleteOrderDetails(req, res){
        const id = req.params.id
        const details = await db.query('DELETE FROM services_orders WHERE id = $1', [id])
        res.json(details.rows[0])
    }

    async deleteAllOrderDetails(req, res){
        const id = req.params.id
        const details = await db.query('DELETE FROM services_orders WHERE order_id = $1', [id])
        res.json(details.rows[0])
    }
}

module.exports = new ordersController()