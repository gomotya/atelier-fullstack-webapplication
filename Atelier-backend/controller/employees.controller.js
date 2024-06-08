const db = require('../db')
class employeesController {
    

    async getEmployees(req, res){
        const employees = await db.query('SELECT employees.id, employees.fio, job_title.position as job_title , employees.phone, employees.bank_acc, employees.birthday FROM employees JOIN job_title ON employees.job_title_id = job_title.id')
        res.json(employees.rows)

    }

    async getEmployee(req, res){
        const id = req.params.id
        const employee = await db.query('SELECT employees.id, employees.fio, job_title.position as job_title, employees.phone, employees.bank_acc, employees.birthday FROM employees JOIN job_title ON employees.id = job_title.id WHERE employees.id = $1', [id])
        res.json(employee.rows[0])
    }

    async getJobTitle(req, res){
        const id = req.params.id
        const job_title = await db.query('SELECT * FROM job_title WHERE id = $1', [id])
        res.json(job_title.rows[0])
    }

    async getJobTitles(req, res){
        const job_title = await db.query('SELECT * FROM job_title')
        res.json(job_title.rows)
    }


    async createEmployee(req, res){
        const {fio, job_title_id, phone, bank_acc, birthday} = req.body
        const newEmployee = await db.query(`INSERT INTO employees (fio, job_title_id, phone, bank_acc, birthday) values ($1, $2, $3, $4, $5) RETURNING *`, [fio, job_title_id, phone, bank_acc, birthday])
        res.json(newEmployee.rows[0])
    }

    async updateEmployee(req, res) {
        const {id, fio, job_title_id, phone, bank_acc, birthday} = req.body
        const employee = await db.query(
            'UPDATE employees SET fio = $1, job_title_id = $2, phone = $3, bank_acc = $4, birthday = $5 WHERE id = $6 RETURNING *',
            [fio, job_title_id, phone, bank_acc, birthday, id]
        )
        res.json(employee.rows[0])
    }

    async deleteEmployee(req, res){
        const id = req.params.id
        const employee = await db.query('DELETE FROM employees WHERE id = $1', [id])
        res.json(employee.rows[0])
    }
}

module.exports = new employeesController()