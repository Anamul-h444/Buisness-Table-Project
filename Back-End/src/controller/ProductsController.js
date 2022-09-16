const ProductModel = require("../model/ProductModel");

exports.ReadProduct = async (req, res) => {
    try {
        let pageNo = Number(req.params.pageNo);
        let perPage = Number(req.params.perPage);
        let searchValue = req.params.searchKeyword;
        let skipRow = (pageNo - 1) * perPage;

        let data;

        if (searchValue !== 0) {
            let searchRgx = { "$regex": searchValue, "$options": "i" }
            let searchQuery = { $or: [{ title: searchRgx }, { price: searchRgx }, { category: searchRgx }, { subcategory: searchRgx }, { remark: searchRgx }, { brand: searchRgx }, { shop: searchRgx }, { shop_name: searchRgx }] }

            data = await ProductModel.aggregate([{
                $facet: {
                    Total: [{ $match: searchQuery }, { $count: "count" }],
                    Rows: [{ $match: searchQuery }, { $skip: skipRow }, { $limit: perPage }]
                }
            }])
            res.status(200).json({ status: "success", data })
        } else {
            data = await ProductModel.aggregate([{
                $facet: {
                    Total: [{ $count: "count" }],
                    Rows: [{ $skip: skipRow }, { $limit: perPage }]
                }
            }])
            res.status(200).json({ status: "success", data })
        }


    } catch (error) {
        res.status(200).json({status: "fail",error:error})
    }
}

