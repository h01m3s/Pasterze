const router = require('express').Router();
const productController = require('./controllers/products');
const QAController = require('./controllers/QA');
const reviewController = require('./controllers/reviews');

router.get('/products/list', productController.productList);
router.get('/products/:product_id', productController.productInfo);
router.get('/products/:product_id/styles', productController.productStyles);
router.get('/products/:product_id/related', productController.relatedProducts);
router.get('/qa/:product_id', QAController.init);
router.get('/qa/:question_id/answers', QAController.init);
router.post('/qa/:product_id', QAController.init);
router.post('/qa/:question_id/answers', QAController.init);
router.put('/qa/question/:question_id/helpful', QAController.init);
router.put('/qa/question/:question_id/report', QAController.init);
router.put('/qa/answer/:answer_id/helpful', QAController.init);
router.put('/qa/answer/:answer_id/report', QAController.init);
router.get('/reviews/:product_id/list', reviewController.init);
router.get('/reviews/:product_id/meta', reviewController.init);
router.post('/reviews/:product_id', reviewController.init);
router.put('/reviews/helpful/:review_id', reviewController.init);
router.put('/reviews/report/:review_id', reviewController.init);

module.exports = router;
