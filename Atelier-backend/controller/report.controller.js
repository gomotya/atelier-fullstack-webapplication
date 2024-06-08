const db = require('../db');

class ReportController {

  async getSumOfTheDay(req, res) {
    try {
      const { date } = req.query;
    if (!date) {
      throw new Error("Date parameter is missing");
    }
      const query = `
        SELECT 
            SUM(so.cost) AS total_cost
        FROM 
            orders o
        JOIN 
            services_orders so ON o.id = so.order_id
        WHERE 
            o.order_date = $1
        GROUP BY 
            o.order_date;
            `;
      const result = await db.query(query, [date])
      res.json(result.rows[0] || { total_cost: 0 });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async getEveryClientSum(req, res) {
    try {
      const { date } = req.query;
    if (!date) {
      throw new Error("Date parameter is missing");
    }
      const query = `
        SELECT 
            c.fio AS client_name,
            SUM(so.cost) AS total_cost
        FROM 
            orders o
        JOIN 
            services_orders so ON o.id = so.order_id
        JOIN
            client c ON o.client_id = c.id
        WHERE 
            o.order_date = $1
        GROUP BY 
            c.fio, o.order_date;`;
      const result = await db.query(query, [date])
      res.json(result.rows);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

module.exports = new ReportController();
