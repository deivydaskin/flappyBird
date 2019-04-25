const Score = require("../models/Score");

module.exports = {
  addScore: async (req, res) => {
    const newScore = new Score({
      username: req.body.username,
      score: req.body.score
    });

    newScore.save().then(score => res.json(score));

    lastIndex = req.body.score;

    Score.findOneAndDelete({}, { sort: { score: 1 } })
      .collation({ locale: "en_US", numericOrdering: true })
      .then(a => console.log(a));
  },

  getScores: async (req, res) => {
    Score.find()
      .sort({ score: -1 })
      .collation({ locale: "en_US", numericOrdering: true })
      .limit(3)
      .then(scores => res.json(scores));
  }
};
