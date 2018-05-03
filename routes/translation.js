const express = require('express');
const router  = express.Router();
const _       = require('lodash');
const mysql   = require('mysql');
const db      = require ('./../config/db.js');

/*** GET ONE TRANSLATIONS ***/
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM translations WHERE translations.translations_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        else if (!result) {
            res.status(404).send('translation not found');
        }
        else {
            res.status(200).json(result);
        };
    });
});

/*** CREATE AN TRANSLATION ***/
router.post('/', (req, res) => {
    let body = _.pick(req.body, ['artwork_id', 'french', 'english']);
    const sql = "INSERT INTO translations (`artwork_id`, `french`, `english`) VALUES (?, ?, ?)";
    db.query(sql, [body.artwork_id, body.french, body.english], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        else if (result.affectedRows == 0) {
            res.status(500).send('translation not created');
        }
        else {
            res.status(200).json(true);
        }
    });
});

/*** DELETE AN TRANSLATION ***/
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    const sql = "DELETE FROM translations WHERE translations_id = ?";
    db.query(sql, [id] , (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        else if (result.affectedRows == 0) {
            res.status(404).send('translation not found');
        }
        else {
            res.status(200).send('translation deleted');
        }
    });
});

/*** UPDATE TRANSLATION ***/
router.patch('/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['author_id', 'french', 'english']);
    const sql = "UPDATE translations set artwork_id = COALESCE(?, artwork_id), french = COALESCE(?, french), english = COALESCE(?, english) WHERE translations_id = ?";
    db.query(sql, [body.author_id, body.french, body.english ,id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        else if (result.affectedRows == 0) {
            res.status(500).send('translation not updated');
        }
        else {
            res.status(200).send('translation updated');
        }
    });
});

module.exports = router;