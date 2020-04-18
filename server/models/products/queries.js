module.exports = {
  list: 'SELECT * FROM products LIMIT $1 OFFSET $2;',
  info:
    "SELECT json_build_object( \
    'id', p.id,              \
    'name', p.name,          \
    'slogan', p.slogan,      \
    'description', p.description,      \
    'category', p.category,            \
    'default_price', p.default_price,  \
    'features', ARRAY(SELECT json_build_object('feature', f.feature, 'value', f.value) \
    FROM features AS f WHERE f.product_id = p.id)) as result \
    FROM products AS p \
    WHERE p.id = $1;",
  styles:
    "SELECT json_build_object(                \
    'style_id', s.id,                         \
    'name', s.name,                           \
    'original_price', s.original_price,       \
    'sale_price', s.sale_price,               \
    'default?', s.default_style,              \
    'skus', s.skus,                           \
    'photos', ARRAY(SELECT json_build_object('url', photos.url, 'thumbnail_url', photos.thumbnail_url) \
    FROM photos WHERE photos.styleId = s.id)  \
    ) AS result                               \
    FROM styles AS s                          \
    WHERE s.productId = $1                    \
    GROUP BY s.id;",
  related:
    'SELECT related_product_id AS result FROM related   \
    WHERE current_product_id = $1;'
};
