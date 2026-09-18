import { useEffect } from "react";
import ProductCard from "../shared/ProductCard";
import { FaExclamationTriangle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { fetchCategories } from "../../store/action";
import Filter from "./Filter";
import useProductFilter from "../../hooks/useProductFilter";
import Loader from "../shared/Loader";

import Paginations from "../shared/Paginations";

const Products = () => {
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  // const isLoading = false;
  // const errorMessage = '';

  const { products, categories, pagination } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useProductFilter();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // console.log(pagination);
  // console.log(pagination?.totalElements);
  // console.log(pagination?.totalPages);
  

  return (
    <div className="lg:px-14 sm:xp-8 py-14 2xl:w-[90%] 2xl:mx-auto">
      <Filter categories={categories ? categories : []} />
      {isLoading ? (
        <Loader text={"Loading...."} />
      ) : errorMessage ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <div className="bg-red-50 border border-red-100 rounded-2xl p-8 shadow-sm">
            <FaExclamationTriangle className="text-red-500 text-4xl mx-auto mb-4" />
            <span className="text-red-600 text-lg font-medium">
              {errorMessage}
            </span>
          </div>
        </div>
      ) : (
        <div className="min-h-700px]">
          <div className="pb-6 pt-14 grid 2xl:grid-cols4 lg:grid-cols-4 sm:grid-cols-2 gap-y-6 gap-x-6">
            {products &&
              products.map((item, i) => <ProductCard key={i} {...item} />)}
          </div>
          <div className="flex justify-center p-10">
            <Paginations 
              numberOfPage={pagination?.totalPages}
              
              totalProducts={pagination?.totalElements}
              />

              
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Products;
