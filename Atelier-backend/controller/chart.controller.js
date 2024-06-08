const db = require('../db');

class ChartController {
  async getServiceCounts(req, res) {
    try {
      const result = await db.query(`
        SELECT s.service_name, COUNT(so.service_id) as count
        FROM services_orders so
        JOIN services s ON so.service_id = s.id
        GROUP BY s.service_name
      `);
      res.json(result.rows);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

module.exports = new ChartController();
