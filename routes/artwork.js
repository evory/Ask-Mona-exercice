const express = require('express');
const router  = express.Router();
const _       = require('lodash');
const mysql   = require('mysql');
const db      = require ('./../config/db.js');


/*** GET ALL ARTWORK ***/

router.get('/', (req, res) => {
    const sql = "SELECT * FROM artwork";
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).send(err);
        }
        else if (!result) {
            res.status(404).send('artworks not found');
        }
        else {
            res.status(200).json(result);
        }
    });
});

/*** GET ONE ARTWORK ***/
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT artwork.name AS artwork_name, author.name AS author_name, french , english FROM artwork LEFT JOIN author ON author.author_id = artwork.author_id LEFT JOIN translations ON translations.artwork_id = artwork.artwork_id WHERE artwork.artwork_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        else if (!result) {
            res.status(404).send('artwork not found');
        }
        else {
            res.status(200).json(result);
        };
    });
});

/*** CREATE AN ARTWORK ***/
router.post('/', (req, res) => {
    let body = _.pick(req.body, ['name', 'author_id']);
    const sql = "INSERT INTO artwork (`author_id`, `name`) VALUES (?, ?)";
    db.query(sql, [body.author_id, body.name], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        else if (result.affectedRows == 0) {
            res.status(500).send('artwork not created');
        }
        else {
            res.status(200).json(true);
        }
    });
});

/*** DELETE AN ARTWORK ***/
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    const sql = "DELETE FROM artwork WHERE artwork_id = ?";
    db.query(sql, [id] , (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        else if (result.affectedRows == 0) {
            res.status(404).send('artwork not found');
        }
        else {
            res.status(200).json('artwork deleted');
        }
    });
});

/*** UPDATE artwork ***/
router.patch('/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['author_id', "name"]);
    const sql = "UPDATE artwork set author_id = COALESCE(?, author_id), name = COALESCE(?, name) WHERE artwork_id = ?";
    db.query(sql, [body.author_id, body.name ,id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        else if (result.affectedRows == 0) {
            res.status(500).send('artwork not updated');
        }
        else {
            res.status(200).send('artwork updated');
        }
    });
});

/*** GET ALL TRANSLATIONS FROM AN ARTWORK ***/
router.get('/translation/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT french, english FROM translations WHERE artwork_id = ?";
    db.query(sql, [id] , (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        else if (result.affectedRows == 0) {
            res.status(404).send('translations not found');
        }
        else {
            res.status(200).json(result);
        }
    });
});

module.exports = router;