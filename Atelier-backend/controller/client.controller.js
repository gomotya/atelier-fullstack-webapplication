const db = require('../db')
class clientController {
    async createClient(req, res){
        const {fio, phone, email, birthday} = req.body
        const newClient = await db.query(`INSERT INTO client (fio, phone, email, birthday) values ($1, $2, $3, $4) RETURNING *`, [fio, phone, email, birthday])
        res.json(newClient.rows[0])
    }

    async getClients(req, res){
        const clients = await db.query('SELECT * FROM client')
        res.json(clients.rows)
        
    }

    async getClient(req, res){
        const id = req.params.id
        const client = await db.query('SELECT * FROM client WHERE id = $1', [id])
        res.json(client.rows[0])
    }

    async updateClient(req, res) {
        const {id, fio, phone, email, birthday} = req.body
        const client = await db.query(
            'UPDATE client SET fio = $1, phone = $2, email = $3, birthday = $4 WHERE id = $5 RETURNING *',
            [fio, phone, email, birthday, id]
        )
        res.json(client.rows[0])
    }

    async deleteClient(req, res){
        const id = req.params.id
        const client = await db.query('DELETE FROM client WHERE id = $1', [id])
        res.json(client.rows[0])
    }
}

module.exports = new clientController()