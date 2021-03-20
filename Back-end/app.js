const express = require("express");
const app = express();
const http = require("http");
const mysql = require("mysql");
const endPointRoot = "/COMP4537/ASG1/v1";
const port = process.env.PORT || 8888;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "eunsaeml_comp4735assignment1",
    password: "nodemysql123",
    database: "eunsaeml_comp4735assignment1"
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

/*
GET request:
all quotes in the database in ascending order by quoteId
*/
app.get(endPointRoot + "/quotes", (req, res) => {
    let sql = "SELECT * FROM quotes ORDER BY quoteId ASC;";
   
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }

        res.json(result);
    });
});

/*
GET request:
a specific quote in the database
*/
app.get(endPointRoot + "/quotes/:quoteId", (req, res) => {
    let quoteId = req.params.quoteId;
    let sql = "SELECT * FROM quotes WHERE quoteId = " + quoteId + ";";
    
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        
        res.json(result);
    });
});

/*
POST request:
adds new quote into the database
*/
app.post(endPointRoot + "/quotes", (req, res) => {
    let body = req.body.body;
    let source = req.body.source;
    let sql = "INSERT INTO quotes (body, source) VALUES ('" + body + "', '" + source + "');";
   
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
           
        res.json(result);
    });
});

/*
PUT request:
updates existing quote in the database
*/
app.put(endPointRoot + "/quotes", (req, res) => {
    let quoteId = req.body.quoteId;
    let body = req.body.body;
    let source = req.body.source;
    let sql = "UPDATE quotes SET body = '" + body + "', source = '" + source + "' WHERE quoteId = " + quoteId + ";";

    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
           
        res.json(result);
    });
});

/*
DELETE request:
deletes quote from the database
*/
app.delete("*", (req, res) => {
    let quoteId = req.body.quoteId;
    let sql = "DELETE FROM quotes WHERE quoteId = " + quoteId + ";";
    
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
           
        res.json(result);
    });
});

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});