var {
  getQuestions,
  getAnswers,
  postQuestion,
  postAnswer,
  helpfulQuestion,
  helpfulAnswer,
  reportQuestion,
  reportAnswer,
} = require('../../models/QA/index.js');

module.exports = {
  init: (req, res) => {
    res.send('QA API');
  },

  getQuestions: (req, res) => {
    let product_id = req.params.product_id;
    getQuestions(product_id)
      .then(({ rows }) => {
        let result = {
          results: rows,
        };
        res.send(result);
      })
      .catch((err) => {
        res.sendStatus(500);
        console.log(err);
      });
  },

  getAnswers: (req, res) => {
    let question_id = req.params.question_id;
    getAnswers(question_id)
      .then(({ rows }) => {
        let result = {
          results: rows,
        };
        res.send(result);
      })
      .catch((err) => {
        res.sendStatus(500);
        console.log(err);
      });
  },

  postQuestion: (req, res) => {
    let product_id = req.params.product_id;
    let body = req.body.body;
    let name = req.body.name;
    let email = req.body.email;

    postQuestion(product_id, body, name, email)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        res.sendStatus(500);
        console.log(err);
      });
  },

  postAnswer: (req, res) => {
    let question_id = req.params.question_id;
    let body = req.body.body;
    let name = req.body.name;
    let email = req.body.email;
    let photos = req.body.photos;

    postAnswer(question_id, body, name, email, photos)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        res.sendStatus(500);
        console.log(err);
      });
  },

  helpfulQuestion: (req, res) => {
    let question_id = req.params.question_id;
    helpfulQuestion(question_id)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        res.sendStatus(500);
        console.log(err);
      });
  },

  reportQuestion: (req, res) => {
    let question_id = req.params.question_id;
    reportQuestion(question_id)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        res.sendStatus(500);
        console.log(err);
      });
  },

  helpfulAnswer: (req, res) => {
    let answer_id = req.params.answer_id;
    helpfulAnswer(answer_id)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        res.sendStatus(500);
        console.log(err);
      });
  },

  reportAnswer: (req, res) => {
    let answer_id = req.params.answer_id;
    reportAnswer(answer_id)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        res.sendStatus(500);
        console.log(err);
      });
  },
};

// router.get('/qa/:product_id', QAController.getQuestions);
// router.get('/qa/:question_id/answers', QAController.getAnswers);
// router.post('/qa/:product_id', QAController.postQuestion);
// router.post('/qa/:question_id/answers', QAController.postAnswer);
// router.put('/qa/question/:question_id/helpful', QAController.helpfulQuestion);
// router.put('/qa/question/:question_id/report', QAController.reportQuestion);
// router.put('/qa/answer/:answer_id/helpful', QAController.helpfulAnswer);
// router.put('/qa/answer/:answer_id/report', QAController.reportAnswer);
