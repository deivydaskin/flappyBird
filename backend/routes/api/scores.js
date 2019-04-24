const express = require('express');
const router =  express.Router();

const Score = require('../../models/Score');

router.get('/', (req, res) => {
    Score
        .find()
        .sort({ date: -1 })
        .then(scores => res.json(scores))
});

router.post('/', (req, res) => {
    const newScore = new Score({
        username: req.body.username,
        score: req.body.score,
    });
    
    newScore
    .save()
    .then(score => res.json(score));      
});

module.exports = router;