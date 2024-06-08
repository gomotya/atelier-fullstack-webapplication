const express = require('express');
const session = require('express-session');
const AppRouter = require('./routes/app.routes')
const port = 3000;
const app = express();



app.use(express.json())

app.use(session({
    secret: '1234', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
  }));


app.use('/api', AppRouter)

app.listen(port, '127.0.0.1', () => {
    console.log(`Server running on http://localhost:${port}`);
});







