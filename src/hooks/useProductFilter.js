import { useSearchParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useCallback, useEffect } from "react"
import { fetchProducts, fetchProductsforAdmin } from "../store/action";
import { STOCK_STATUS_PARAM } from "../components/admin/products/ProductConstatnts";


const useProductFilter = ()  => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
 
  useEffect(() => {
    
 
    const params = new URLSearchParams();
    // URL ?page= is 1-based (MUI Pagination). Spring's pageNumber is 0-based.
    const urlPage = Number(searchParams.get("page"));
    const currentPage = Number.isInteger(urlPage) && urlPage >= 1 ? urlPage : 1;
 
    params.set("pageNumber", String(currentPage - 1));
 
    const sortOrder = searchParams.get("sortby") || "asc";
    const categoryParams = searchParams.get("category") || null;
    const keyword = searchParams.get("keyword") || null;
 
    params.set("sortBy","price");
    params.set("sortOrder",sortOrder);
 
    if (categoryParams) {
        params.set("category", categoryParams);
    }
    
    if (keyword) {
        params.set("keyword", keyword);
    }
 
    const queryString = params.toString();
 
    dispatch(fetchProducts(queryString));
  }, [dispatch, searchParams]);
}

/*
 * Admin products: the URL is the single source of truth.
 *   ?page=0&keyword=chair&category=Furniture&status=Out of Stock
 * Change the URL -> this hook re-fetches. Nothing else needs to dispatch.
 */
export const buildAdminProductQuery = (searchParams) => {
  const requestedPage = Number(searchParams.get("page") ?? "0");
  const pageNumber =
    Number.isSafeInteger(requestedPage) && requestedPage >= 0
      ? requestedPage
      : 0;

  const params = new URLSearchParams();
  params.set("pageNumber", String(pageNumber));

  const keyword = searchParams.get("keyword");
  const category = searchParams.get("category"); // category NAME
  const status = STOCK_STATUS_PARAM[searchParams.get("status")];

  if (keyword) params.set("keyword", keyword);
  if (category) params.set("category", category);
  if (status) params.set("stockStatus", status);

  return params.toString();
};

export const useAdminProductFilter = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const queryString = buildAdminProductQuery(searchParams);

  useEffect(() => {
    dispatch(fetchProductsforAdmin(queryString));
  }, [dispatch, queryString]);

  // Re-run the current query (e.g. after adding a product).
  const refresh = useCallback(
    () => dispatch(fetchProductsforAdmin(queryString)),
    [dispatch, queryString],
  );

  return { refresh };
};

export default useProductFilter