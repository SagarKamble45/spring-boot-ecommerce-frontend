import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getOrdersForDashboard } from "../store/action";

const useOrderFilter = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const queryString = new URLSearchParams({
    pageNumber: currentPage - 1,
  }).toString();

  console.log(queryString);
  useEffect(() => {
    dispatch(getOrdersForDashboard(queryString));
  }, [dispatch, queryString]);

  
  return { queryString, currentPage };
};

export default useOrderFilter;