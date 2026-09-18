import {Pagination} from "@mui/material"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function Paginations({numberOfPage, totalProducts}) {

  const [searchParams] = useSearchParams();
  const pathname = useLocation().pathname;
  const params = new URLSearchParams(searchParams);
  const navigate = useNavigate();
  const paramValue = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const onChangeHandler = (event, value) =>{
    params.set("page", value.toString());
    navigate(`${pathname}?${params}`);
  }

  
  // console.log(paramValue)

  return (
    <div>
      <Pagination 
      count={numberOfPage}
      page={paramValue}
      shape="rounded" 
      defaultPage={1} 
      boundaryCount={1} 
      showFirstButton
      showLastButton
      siblingCount={2}
      onChange ={onChangeHandler}/>
    </div>
  );
}

export default Paginations;
