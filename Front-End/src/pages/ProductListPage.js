import React, { Fragment, lazy, Suspense } from "react";
import MasterLayout from "../Components/MasterLayout";
import LazyLoader from "../Components/ShowLoader/LazyLoader";
const ProductList = lazy(() => import("../Components/ProductList"));

const ProductListPage = () => {
  return (
    <Fragment>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <ProductList />
        </Suspense>
      </MasterLayout>
    </Fragment>
  );
};
export default ProductListPage;
