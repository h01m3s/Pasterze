const router = require('express').Router();
const productController = require('./controllers/products');
const QAController = require('./controllers/QA');
const reviewController = require('./controllers/reviews');

router.get('/products/list', productController.init);
router.get('/products/:product_id', productController.init);
router.get('/products/:product_id/styles', productController.init);
router.get('/products/:product_id/related', productController.init);
router.get('/qa/:product_id', QAController.getQuestions);
router.get('/qa/:question_id/answers', QAController.getAnswers);
router.post('/qa/:product_id', QAController.postQuestion);
router.post('/qa/:question_id/answers', QAController.postAnswer);
router.put('/qa/question/:question_id/helpful', QAController.helpfulQuestion);
router.put('/qa/question/:question_id/report', QAController.reportQuestion);
router.put('/qa/answer/:answer_id/helpful', QAController.helpfulAnswer);
router.put('/qa/answer/:answer_id/report', QAController.reportAnswer);
router.get('/reviews/:product_id/list', reviewController.init);
router.get('/reviews/:product_id/meta', reviewController.init);
router.post('/reviews/:product_id', reviewController.init);
router.put('/reviews/helpful/:review_id', reviewController.init);
router.put('/reviews/report/:review_id', reviewController.init);

module.exports = router;
