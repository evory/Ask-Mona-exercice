const express = require('express');
const router  = express.Router();
const mysql   = require('mysql');
const fs = require('fs');

const db = require ('./../config/db.js')

router.get('/', (req, res) => {
    let sql = fs.readFileSync(__dirname + '/../config/ask_mona_db.sql').toString();

    db.query(sql, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.end('Database created');
        }
    })
})

module.exports = router;