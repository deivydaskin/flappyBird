const Joi = require('@hapi/joi');
const Score = require('../models/Score');

const schema = Joi.object().keys({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  score: Joi.number()
    .integer()
    .max(1000)
    .required(),
});

module.exports = {
  addScore: async (req, res) => {
    const result = Joi.validate({ username: req.body.username, score: req.body.score }, schema);
    if (result.error === null) {
      const newScore = new Score({
        username: req.body.username,
        score: req.body.score,
      });

      newScore.save().then(score => res.json(score));

      Score.findOneAndDelete({}, { sort: { score: 1 } })
        .collation({ locale: 'en_US', numericOrdering: true })
        .then(a => console.log(a))
        .catch(err => console.log(err));
    } else {
      res.status(400).send(result.error);
    }
  },

  getScores: async (req, res) => {
    Score.find()
      .sort({ score: -1 })
      .collation({ locale: 'en_US', numericOrdering: true })
      .limit(3)
      .then(scores => res.json(scores))
      .catch(err => res.send(err));
  },
};
