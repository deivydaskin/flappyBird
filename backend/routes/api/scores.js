const express = require("express");
const router = express.Router();

const ScoreController = require("../../controller/scores");

router.route("/").get(ScoreController.getScores);

router.route("/").post(ScoreController.addScore);

module.exports = router;
