const db = require('../db')
class servicesController {
    async createService(req, res){
        const {service_name, service_cost, service_add_cost} = req.body
        const newService = await db.query(`INSERT INTO services (service_name, service_cost, service_add_cost) values ($1, $2, $3) RETURNING *`, [service_name, service_cost, service_add_cost])
        res.json(newService.rows[0])
        
    }

    async getServices(req, res){
        const services = await db.query('SELECT * FROM services')
        res.json(services.rows)
        
    }

    async getService(req, res){
        const id = req.params.id
        const service = await db.query('SELECT * FROM services WHERE id = $1', [id])
        res.json(service.rows[0])
    }

    async updateService(req, res) {
        const {id, service_name, service_cost, service_add_cost} = req.body
        const service = await db.query(
            'UPDATE services SET service_name = $1, service_cost = $2, service_add_cost = $3 WHERE id = $4 RETURNING *',
            [service_name, service_cost, service_add_cost, id]
        )
        res.json(service.rows[0])
    }

    async deleteService(req, res){
        const id = req.params.id
        const service = await db.query('DELETE FROM services WHERE id = $1', [id])
        res.json(service.rows[0])
    }
}

module.exports = new servicesController()