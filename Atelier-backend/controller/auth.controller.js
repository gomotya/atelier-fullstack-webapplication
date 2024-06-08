const db = require('../db');

class authController {
  async login(req, res) {
    const { username, password } = req.body;
    const user = await db.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);

    if (user.rows.length > 0) {
      req.session.user = { id: user.rows[0].id, username: user.rows[0].username };
      res.json({ username: user.rows[0].username });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  }

  async createUser(req, res) {
    const { username, password } = req.body;
    const newUser = await db.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
    res.json(newUser.rows[0]);
  }

  async getUsers(req, res) {
    const users = await db.query('SELECT * FROM users');
    res.json(users.rows);
  }
  
  async logout(req, res) {
    req.session.destroy();
    res.json({ message: 'Logged out' });
  }
}


module.exports = new authController();
