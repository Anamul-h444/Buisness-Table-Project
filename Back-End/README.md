# Buisness Table documentation
# Server Side

## Api.js:
- url Params থেকে pageNo, perPage, searchKeyword ধরতে হবে।
- pageNo এর মাধ্যমে চলমান পেজ নাম্বারকে রিসিভ করা হবে।
- perPage এর অর্থ হল প্রত্যেক পেজে কয়টি করে ডাটা কুয়েরি হয়ে আসবে। 
-searchKeyword এর মাধ্যমে ডাটা সার্চ করা হবে।

```js
router.route("/ProductList/:pageNo/:perPage/:searchKeyword")
    .get(ReadProduct)
```
## Controller.js:
- url Params থেকে pageNo, perPage, searchKeyword ধরতে হবে।
- skipRow এর অর্থ হল perPage এ যতটি ডাটা সার্চ হয়ে ‍আসবে তার উপর ভিত্তি করে পেজিনেশন তৈরী করা।
 ```
skipRow = (pageNo - 1) * perPage;
skipRow = (2-1)*5 = 5 (২ নং পেজে ৫ নং রো থেকে ডাটা সার্চিং হয়ে আসবে যদি পার পেজে ৫ করে ডাটা নির্ধারণ করা থাকে)।  

skipRow = (pageNo - 1) * perPage;
skipRow = (3-1)*10 = 20 (3 নং পেজে 20 নং রো থেকে ডাটা সার্চিং হয়ে আসবে যদি পার পেজে 10 করে ডাটা নির্ধারণ করা থাকে)। 
```
- data এর ভেরিয়েবল ডিক্লেয়ার করা হল, কন্ডিশনের উপর ভিত্তি করে  এই data তে ভেল্যু এ্যাসাইন হবে।

## Value assign in data:
- ফ্রন্ট এন্ড এ যদি সার্চ করা না করা হয় তাহলে searchValue 0 নির্ধারণ করা হবে।
- searchValue 0 না হয় অর্থাৎ ইউজার সার্চ করে তাহলে searchRgx এর মাধ্যমে সার্চ ভেল্যুকে রিসিভ করা হবে।
- এই সার্চ ভেল্যু এর মাধ্যমে কুয়েরি করে ডাটা সার্চ করতে হবে যাহা searchQuery তে সেভ হবে।
- facet অপারেটর এর মাধ্যমে searchQuery অনুযায়ী match করে টোটাল কয়টি ডাটা রয়েছে তা কাউন্ট করা হবে।
- searchQuery অনুযায়ী Rows এ skipRow হতে limit অনুযায়ী শুধু perPage যে কয়টি ডাটা প্রদর্শন নির্বাচন করা হবে সে কয়টি ডাটা প্রদর্শন করা হবে।
- যদি সার্চ না করা হয় তাহলে সার্চ কুয়েরি ব্যতিত সমস্ত ডাটা হতে Rows এ skipRow হতে limit অনুযায়ী শুধু perPage যে কয়টি ডাটা প্রদর্শন নির্বাচন করা হবে সে কয়টি ডাটা প্রদর্শন করা হবে।
```js
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

```