const router = require('express').Router();
const { ReadProduct} = require ('../controller/ProductsController');


router.route("/ProductList/:pageNo/:perPage/:searchKeyword")
    .get(ReadProduct)



module.exports = router;