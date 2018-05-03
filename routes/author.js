const express = require('express');
const router  = express.Router();
const _       = require('lodash');
const mysql   = require('mysql');
const db      = require ('./../config/db.js');


/*** GET ALL AUTHOR ***/
router.get('/', (req, res) => {
    const sql = "SELECT * FROM author";
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).send(err);
        }
        else if (!result) {
            res.status(404).send('authors not found');
        }
        else {
            res.status(200).json(result);
        }
    });
});

/*** GET ONE AUTHOR ***/
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT name FROM author WHERE author_id = ?';
    db.query(sql, [id] , (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        else if (!result) {
            res.status(404).send('author not found');
        }
        else {
            res.status(200).json(result);
        };
    });
});

/*** CREATE AN AUTHOR ***/
router.post('/', (req, res) => {
    let body = _.pick(req.body, ['name']);
    const sql = "INSERT INTO author (name) VALUES (?)";
    db.query(sql, [body.name], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        else if (result.affectedRows == 0) {
            res.status(500).send('author not created');
        }
        else {
            res.status(200).json(true);
        }
    });
});

/*** DELETE AN AUTHOR ***/
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    const sql = "DELETE FROM author WHERE author_id = ?";
    db.query(sql, [id] , (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        else if (result.affectedRows == 0) {
            res.status(404).send('author not found');
        }
        else {
            res.status(200).json('author deleted');
        }
    });
});

/*** UPDATE AUTHOR ***/
router.patch('/:id', (req, res) => {
    let body = _.pick(req.body, ['name']);
    let id = req.params.id;
    const sql = "UPDATE author set name = COALESCE(?, name) WHERE author_id = ?";
    db.query(sql,[body.name, id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        else if (result.affectedRows == 0) {
            res.status(500).send('author not updated');
        }
        else {
            res.status(200).json('Author updated');
        }
    })
});

/*** GET ALL ARTWORK FROM AN AUTHOR ***/
router.get('/artwork/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM artwork WHERE author_id = ?";
    db.query(sql, [id] , (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        else if (!result) {
            res.status(404).send('artworks not found');
        }
        else {
            res.status(200).json(result);
        }
    });
});

module.exports = router;