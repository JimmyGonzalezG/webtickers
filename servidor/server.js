const express = require('express');
const mysql = require('mysql');
const cors = require('cors');




const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();
app.use(cors());
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

app.post('/productos', (req, res) => {
  const sql = 'INSERT INTO productos SET ?';

  const customerObj = {
    idproductos: req.body.idproductos,
    productos: req.body.productos,
    cantidad: req.body.cantidad,
    precio: req.body.precio,
    almacen: req.body.almacen
  };

  connection.query(sql, customerObj, error => {
    if (error) throw error;
    res.send('Customer created!');
  });
});

app.put('/users/:id', (request, response) => {
  const id = request.params.id;

  connection.query('UPDATE users SET ? WHERE id = ?', [request.body, id], (error, result) => {
      if (error) throw error;

      response.send('User updated successfully.');
  });
});

app.delete('/productos/:id', (req, res) => {
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

app.post('/cliente', (req, res) => {
  const sql = 'INSERT INTO cliente SET ?';

  const customerObj = {
    id_cliente: req.body.id_cliente,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    correo: req.body.correo,
    tipo_de_cedula: req.body.tipo_de_cedula,
    cedula: req.body.cedula
  };

  connection.query(sql, customerObj, error => {
    if (error) throw error;
    res.send('Customer created!');
  });
});

app.put('/users/:id', (request, response) => {
  const id = request.params.id;

  connection.query('UPDATE users SET ? WHERE id = ?', [request.body, id], (error, result) => {
      if (error) throw error;

      response.send('User updated successfully.');
  });
});

app.delete('/cliente/:id', (req, res) => {
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

app.post('/ventas', (req, res) => {
  const sql = 'INSERT INTO productos SET ?';

  const customerObj = {
    idproductos: req.body.idproductos,
    productos: req.body.productos,
    cantidad: req.body.cantidad,
    precio: req.body.precio,
    almacen: req.body.almacen
  };

  connection.query(sql, customerObj, error => {
    if (error) throw error;
    res.send('ventas created!');
  });
});

app.put('/ventas/:id', (request, response) => {
  const id = request.params.id;

  connection.query('UPDATE users SET ? WHERE id = ?', [request.body, id], (error, result) => {
      if (error) throw error;

      response.send('User updated successfully.');
  });
});

app.delete('/ventas/:id', (req, res) => {
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
