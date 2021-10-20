const express = require('express');
const mysql = require('mysql');




const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());

// MySql
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'tienda'
});

// Route
app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

//PRODUCTOS
app.get('/productos', (req, res) => {
  const sql = 'SELECT * FROM productos';

  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send('Not result');
    }
  });
});

app.get('/productos/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM productos WHERE id = ${id}`;
  connection.query(sql, (error, result) => {
    if (error) throw error;

    if (result.length > 0) {
      res.json(result);
    } else {
      res.send('Not result');
    }
  });
});

app.post('/productosadd', (req, res) => {
  const sql = 'INSERT INTO productos SET ?';

  const customerObj = {
    name: req.body.name,
    city: req.body.city
  };

  connection.query(sql, customerObj, error => {
    if (error) throw error;
    res.send('Customer created!');
  });
});

app.put('/productosupdate/:id', (req, res) => {
  const { id } = req.params;
  const { name, city } = req.body;
  const sql = `UPDATE customers SET name = '${name}', city='${city}' WHERE id =${id}`;

  connection.query(sql, error => {
    if (error) throw error;
    res.send('Customer updated!');
  });
});

app.delete('/productosdelete/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM productos WHERE id= ${id}`;

  connection.query(sql, error => {
    if (error) throw error;
    res.send('Delete customer');
  });
});




//CLIENTE
app.get('/cliente', (req, res) => {
  const sql = 'SELECT * FROM cliente';

  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send('Not result');
    }
  });
});

app.get('/cliente/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM cliente WHERE id = ${id}`;
  connection.query(sql, (error, result) => {
    if (error) throw error;

    if (result.length > 0) {
      res.json(result);
    } else {
      res.send('Not result');
    }
  });
});

app.post('/clienteadd', (req, res) => {
  const sql = 'INSERT INTO cliente SET ?';

  const customerObj = {
    name: req.body.name,
    city: req.body.city
  };

  connection.query(sql, customerObj, error => {
    if (error) throw error;
    res.send('Customer created!');
  });
});

app.put('/clienteupdate/:id', (req, res) => {
  const { id } = req.params;
  const { name, city } = req.body;
  const sql = `UPDATE cliente SET name = '${name}', city='${city}' WHERE id =${id}`;

  connection.query(sql, error => {
    if (error) throw error;
    res.send('Customer updated!');
  });
});

app.delete('/clientedelete/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM productos WHERE id= ${id}`;

  connection.query(sql, error => {
    if (error) throw error;
    res.send('Delete customer');
  });
});



//VENTAS
app.get('/ventas', (req, res) => {
  const sql = 'SELECT * FROM ventas';

  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send('Not result');
    }
  });
});

app.get('/ventas/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM ventas WHERE id = ${id}`;
  connection.query(sql, (error, result) => {
    if (error) throw error;

    if (result.length > 0) {
      res.json(result);
    } else {
      res.send('Not result');
    }
  });
});

app.post('/ventasadd', (req, res) => {
  const sql = 'INSERT INTO productos SET ?';

  const customerObj = {
    name: req.body.name,
    city: req.body.city
  };

  connection.query(sql, customerObj, error => {
    if (error) throw error;
    res.send('ventas created!');
  });
});

app.put('/ventasupdate/:id', (req, res) => {
  const { id } = req.params;
  const { name, city } = req.body;
  const sql = `UPDATE ventas SET name = '${name}', city='${city}' WHERE id =${id}`;

  connection.query(sql, error => {
    if (error) throw error;
    res.send('cliente updated!');
  });
});

app.delete('/ventasdelete/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM ventas WHERE id= ${id}`;

  connection.query(sql, error => {
    if (error) throw error;
    res.send('Delete ventas');
  });
});


// Check connect
connection.connect(error => {
  if (error) throw error;
  console.log('Database server running!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));