import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { GetProducts } from "../apiServices/Api-services";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

function ProductList() {
  let [searchKeyword, setSearchKeyword] = useState("0");
  let [perPage, setPerPage] = useState(5);

  useEffect(() => {
    GetProducts(1, perPage, searchKeyword);
  }, []);

  let AllProducts = useSelector((state) => state.products.Rows);
  let Total = useSelector((state) => state.products.Total);
  //console.log("ProductsList", AllProducts);
  console.log("Total", Total);

  const handlePageClick = (event) => {
    GetProducts(event.selected + 1, perPage, searchKeyword);
  };
  const perPageHandler = (event) =>{
    setPerPage(parseInt(event.target.value))
    GetProducts(1, event.target.value, searchKeyword)
  }
  const handleSearch = (event) =>{
    setSearchKeyword(event.target.value)
    if(event.target.value===0){
      GetProducts(1, perPage, searchKeyword)
    }
  }
  const searchData = ()=>{
    GetProducts(1, perPage, searchKeyword)
  }

  return (
    <div>
      <div className="flex justify-between">
        <h4>Product List</h4>
       <div>
       <label for="perPage" className="border-1 px-2 py-1 rounded-l-md">Per Page:</label>
       <select onChange={perPageHandler} className="border-1 px-2 py-1 rounded-r-md">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>
       </div>
       <div>
        <input onChange={handleSearch} type='search' className="border-y-2 border-l-2 px-2 py-2 rounded-l-md" placeholder="Search" />
        <button onClick={searchData} className="px-2 py-2.5 rounded-r-md bg-purple-700 text-white">Search</button>
       </div>
      </div>
      <table className=" w-full">
        <thead className=" border-b-2 border-gray-200">
          <tr>
            <th className="p-2 text-lg font-semibold text-center tracking-wide ">
              Product
            </th>
            <th className="p-2 text-lg font-semibold text-center tracking-wide">
              Price
            </th>
            <th className="p-2 text-lg font-semibold text-center tracking-wide">
              Stock
            </th>
            <th className="p-2 text-lg font-semibold text-center tracking-wide">
              Code
            </th>
          </tr>
        </thead>
        <tbody>
          {AllProducts.map((products, index) => (
            <tr>
              <td className=" p-2 text-sem border-b-2 border-gray-200">
                <div className="flex">
                  <div>
                    <img
                      src={products.image}
                      alt="Products Image"
                      className="object-fit h-14 w-20"
                    />
                  </div>
                  <div>
                    <p className="mb-0">{products.title}</p>
                    <p className="text-xs">{products.category}</p>
                  </div>
                </div>
              </td>
              <td className="p-2 text-sem border-b-2 border-gray-200 text-center">
                <p className="mb-0">{products.price} TK.</p>
                <p className="text-xs">{products.brand}</p>
              </td>
              <td className="p-2 text-sem border-b-2 border-gray-200 text-center">
                <span className="bg-purple-500 p-1 rounded-md text-white ">
                  {products.stock}
                </span>
              </td>
              <td className="p-2 text-sem border-b-2 border-gray-200 text-left">
                {products.product_code}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="col-12 mt-5">
        <nav aria-label="Page navigation example">
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
        </nav>
      </div>

      <Toaster />
    </div>
  );
}

export default ProductList;
