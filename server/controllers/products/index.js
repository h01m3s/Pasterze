const ProductDB = require('../../models/products/');

module.exports = {
  productList: async (req, res) => {
    const { page = 1, count = 5 } = req.query;
    const list = await ProductDB.getProductList(page, count);
    res.send(list);
  },
  productInfo: async (req, res) => {
    const { product_id } = req.params;
    const info = await ProductDB.getProductInfo(product_id);
    res.send(info);
  },
  productStyles: async (req, res) => {
    const { product_id } = req.params;
    const styles = await ProductDB.getProductStyles(product_id);
    res.send(styles);
  },
  relatedProducts: async (req, res) => {
    const { product_id } = req.params;
    const related = await ProductDB.getRelatedProducts(product_id);
    res.send(related);
  }
};
