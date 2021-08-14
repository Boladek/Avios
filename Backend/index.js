const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');


//create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodemysql'
});

db.connect((err) => {
    if(err) throw err;
    console.log('Connection established');
})

app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/product', (req, res) => {
    const {name, description} = req.body;
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const newdate = year + "-" + month + "-" + day;

    let sql = `INSERT INTO products (product_name, product_description, date_uploaded) VALUES ('${name}', '${description}', '${newdate}')`;

    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Successfully added products to table');
    });
})

app.get('/productsVarieties', (req, res) => {
    const sql = `SELECT * FROM products_varieties`;

    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    })
})

app.get('/productsVarieties/:id', (req, res) => {
    const sql = `SELECT * FROM products_varieties WHERE id = '${req.params.id}'`;

    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    })
})

app.put('/productsVarieties/:id', (req, res) => {
    const sql = `SELECT * FROM products_varieties WHERE id = '${req.params.id}'`;
    const size = req.body.name || sql[0].name;
    const color = req.body.color || sql[0].color;
    const quantity = req.body.quantity || sql[0].quantity;
    const images = req.body.images || sql[0].images;
    const price = req.body.price || sql[0].price;
    const productId = req.body.productId || sql[0].productId;

    let mainSql = `UPDATE products_varieties SET size = '${size}', color = '${color}', quantity = '${quantity}', image = '${images}', price = '${price}', productId = '${productId}' WHERE id = '${id}'`;

    db.query(mainSql, (err, result) => {
        if(err) throw err;
        res.send(result);
    })
})

app.post('/addProductVarieties', (req, res) => {
    const {size, color, quantity, images, price, productId} = req.body;

    let sql = `INSERT INTO products_varieties (size, color, quantity, images, price, productId) VALUES ('${size}', '${color}', '${quantity}', '${images.join()}', '${price}', '${productId}')`;

    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Successfully added products_varieties to table');
    });
})

app.get('/products', (req, res) => {
    let sql = `select products.*, products_varieties.* FROM products LEFT JOIN products_varieties ON products_varieties.productId = products.id`;

    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
})

app.get('/products/:id', (req, res) => {
    const {id} = req.params;
    let sql =   `select products.*, products_varieties.* 
                FROM products 
                LEFT JOIN products_varieties 
                ON products_varieties.productId = products.id 
                WHERE products.id = ${id};`

    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    })

})

app.put('/addProduct/:id', (req, res) => {
    const {id} = req.params;
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const newdate = year + "-" + month + "-" + day;

    let sql = `SELECT * FROM products WHERE id = '${id}'`;

    const name = req.body.name ||sql[0].name;
    const description = req.body.description || sql[0].description;

    let mainSql = `UPDATE products SET product_name = '${name}', product_description = '${description}', date_edited = '${newdate}' WHERE id = '${id}'`;

    db.query(mainSql, (err, result) => {
        if(err) throw err;
        res.send(result);
    })
})

app.delete('/product/:id', (req, res) => {
    
    const sql = `DELETE FROM table_name WHERE id = '${req.params.id}'`;

    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send('Product has been successfully deleted');
    })
})

const port = 3001;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})