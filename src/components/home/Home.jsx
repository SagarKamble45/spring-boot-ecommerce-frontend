import { useDispatch, useSelector } from "react-redux";
import HeroBanner from "./HeroBanner";
import { useEffect } from "react";
import { fetchProducts } from "../../store/action";
import ProductCard from "../shared/ProductCard";
import Loader from "../shared/Loader";
import { FaExclamationTriangle } from "react-icons/fa";

function Home() {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="max-w-8xl mx-auto lg:px-14 md:px-8 px-4">
      {/* Hero Section */}
      <section className="py-8">
        <HeroBanner />
      </section>

      {/* Featured Products Header */}
      <section className="py-10">
        <div className="flex flex-col items-center text-center space-y-4">
          <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Featured Collection
          </span>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 max-w-3xl">
            Discover our handpicked selection of top-rated items just for you
          </h1>

          <p className="text-gray-500 max-w-2xl">
            Shop our most loved products carefully chosen for quality,
            performance, and customer satisfaction.
          </p>

          <div className="w-20 h-1 rounded-full bg-blue-600"></div>
        </div>
      </section>

      {isLoading ? (
        <Loader />
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
        // Products Grid
        <section className="pb-12">
          <div className="grid 2xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
            {products &&
              products.slice(0, 8).map((item, i) => (
                <div
                  key={i}
                  className="transform transition duration-300 hover:-translate-y-2"
                >
                  <ProductCard {...item} />
                </div>
              ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;
