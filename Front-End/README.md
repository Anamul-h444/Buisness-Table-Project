# React table Client Side

## Api-Services.js:
- যেহেতু বেকএন্ড এসিনক্রোনাইজড এ তৈরা করা হয়েছে সেহেতু Api-Services কে ও এসিনক্রোনাইজড এ তৈরী করা হয়েছে।
-ProductsList.js থেকে pageNo, perPage, searchValue কে প্যারামিটারের মাধ্যমে রিসিভি করা হয়েছে। 
- এখন get method এর মাধ্যমে pageNo, perPage, searchValue কে URL Parameter এর মাধ্যমে বেকএন্ড এ পাঠিয়ে ডাটা কুয়েরি করা হয় যা result নামক ভেরিয়েবল  স্টোর হবে।
- এই কে result কনসোলে প্রিন্ট করে দেখা হলো ডাটা সঠিকভাবে এসেছে কিনা। 
- যদি status কোড ২০০ হয় এবং status success হয় তাহলে- 
-result থেকে Rows এর length  চেক করে দেখতে ডাটা আসছে কিনা। কারণ Rows এর মধ্যেই সমস্ত ডাটা রয়েছে। 
- যদি ডাটা আসে তাহলে Rows এর মাধ্যমে ডাটাকে এবং Total এর মাধ্যমে মোট সংখ্যাকে result থেকে ধরে রিডাক্সে এ্যাকশন পাঠিয়ে দিতে হবে।
- যদি ডাটা না আসে ডাটাকে ফাকা এ্যারে এবং টোটালকে ০ করে দিতে হবে এবং No Data Found এ্যালার্ট দিতে হবে।
## ProductsList.js:
- useEffect এর মাধ্যমে Api-Services কে কল করে -
  - বাই ডিফল্ট PageNO ১ পাঠানো হল।
  - perPage কে useState থেকে বাই ডিফল্ট ৫ পাঠানো হল।
  - searchKeyword কে useState থেকে বাই ডিফল্ট ০ পাঠানো হল।
  - অর্থাৎ পেজ  লোড হওয়ার সাথে সমস্ত ডাটা ১ নং পেজ হতে ৫ টি করে প্রদর্শনের মাধ্যমে প্রদর্শিত হবে।
- useSelector এর মাধ্যমে রিডাক্স থেকে ডাটা ও টোটাল সংখ্যাকে রিসিভ করা হলো। 
- ডাটাকে ম্যাপিং করে টেবিলের মাধ্যমে প্রদর্শিত করা হলো। 
## Pagination (per page show data)
- install react-paginate -> npm install react-paginate --save
- import ReactPaginate from "react-paginate";
- class গুলোর মাধ্যমে কাস্টম স্টাইল প্রদান করা যায়। এখানে বুটস্ট্রাপ এর স্টাইল দেয়া আছে।
### pageCount={Total / perPage}
- Total যতগুলো ডাটার সংখ্যা পাবে তাহাকে perPage এ কয়টি সংখ্যা প্রদর্শিত করতে তা দ্ধারা ভাগ করলে যে সংখ্যাটি আসবে তাই হল পেজিনেশন এর ঘর তৈরীর সংখ্যা। এই Total কে উপরে রিডাক্স থেকে নেয়া হয়েছে। 
### onPageChange={handlePageClick}
- event.selected এর মাধ্যমে এর পেজিনেশন থেকে পেজ নাম্বার ধরা হয়েছে, যেহেতু এখানে ইনডেক্স আকারে আসছে তাই যে নাম্বারে পেজে ক্লিক করবে তার থেকে ১ কম আসবে তাই সঠিক পেজ নাম্বার পেতে ১ যোগ করা হয়েছে। 
- যেহেতু পেজিনেশনে ক্লিক করে পেজ পরিবর্তন করবে এবং পেজ অনুযায়ী ডাটা প্রদর্শিত হবে তাই GetProducts কে কল করা হয়েছে।
```js
 const handlePageClick = (event) => {
    GetProducts(event.selected + 1, perPage, searchKeyword);
  };
```
```js
<ReactPaginate
            previousLabel="<"
            nextLabel=">"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            pageCount={Total / perPage}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName="pagination"
            activeClassName="active"
          />
```
## Per Page
- একটি ড্রপডাউন তৈরী করা হয়েছে যাহার প্রত্যেকটিকে ক্লিকের মাধ্যমে তার value ট্রিগার হবে।
### perPageHandler
- onChange এর মাধ্যমে ডাটা ধরে স্ট্যাটকে আপডেট করবে ফলে এই ভেল্যু অনুযায়ী ডাটা আসবে। এই ভেল্যু অনুযায়ী ডাটা পাওয়ার জন্য আবার GetProducts কে কল করা হয়েছে।

## Searching
### onChange={handleSearch}
- এর মাধ্যমে প্রদানকৃত শব্দকে বেকএ্যান্ডের  $regex এর মাধ্যমে ডাটাবেজের ডাটার সাথে মিলেয়ে সার্চ করবে এবং স্ট্যাটকে আপডেট করবে। যদি ডাটা সার্চ না করা হয় তাহলে সমস্ত লোড হওয়ার জন্য GetProducts কে কল করা হয়েছে যেহেতু বাই ডিফল্ট  ০ সেট করা আছে। 
```js
 const handleSearch = (event) =>{
    setSearchKeyword(event.target.value)
    if(event.target.value===0){
      GetProducts(1, perPage, searchKeyword)
    }
  }
```
### onClick={searchData}
- এখন এই বাটনের অনক্লিকে সার্চ বারে লিখিত ওয়ার্ড বা শব্দ অনুযায়ী  ডাটা সাচিং হয়ে প্রদর্শিত হবে। ডাটা না পেলে এ্যালার্ট দিবে। 
```js
const searchData = ()=>{
    GetProducts(1, perPage, searchKeyword)
  }
```