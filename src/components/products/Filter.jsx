import { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp, FiRefreshCw, FiSearch } from "react-icons/fi";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";

const Filter = ({categories}) => {

  const [searchParams] = useSearchParams();
  const params= new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const currentCategory = searchParams.get("category") || "all";
    const currentSortOrder = searchParams.get("sortby") || "asc";
    const currentSearchTerm = searchParams.get("keyword") || "";

    setCategory(currentCategory);
    setSortOrder(currentSortOrder);
    setSearchTerm(currentSearchTerm);
  },[searchParams])

  useEffect(() => {
        const handler = setTimeout(()=>{
            if (searchTerm) {
                searchParams.set("keyword", searchTerm);
            } else {
                searchParams.delete("keyword")
            }
            navigate(`${pathname}?${searchParams.toString()}`)
        }, 700);

        return () =>{
            clearTimeout(handler)
        }
  }, [searchParams, searchTerm, navigate, pathname])

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;

    if (selectedCategory ==="all") {
        params.delete("category")
    }
    else{
        params.set("category",selectedCategory )
    }
    navigate(`${pathname}?${params}`)
    setCategory(event.target.value);
  };


  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => {
        const newOrder = (prevOrder === 'asc') ? "desc" : "asc";
        params.set("sortby", newOrder)
        navigate(`${pathname}?${params}`)
        return newOrder;
    })
  };
  
  const handleClearFilter = () => {
    navigate({ pathname : window.location.pathname});
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row items-center gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 w-full">
          <FiSearch
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

            <input
            type="text"
            placeholder="Search Product..."
            value={searchTerm}
            onChange={(e)=> { console.log(e.target.value)
                setSearchTerm(e.target.value)}}
            className="w-md pl-12 pr-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all "
          />
        </div>

        {/* Category */}
        <FormControl size="small" className="w-full lg:w-[220px]">
          <InputLabel id="category-select-label">Category</InputLabel>

          <Select
            labelId="category-select-label"
            value={category}
            onChange={handleCategoryChange}
            label="Category"
            className="bg-white rounded-lg"
          >
            <MenuItem value="all">All Categories</MenuItem>

            {categories.map((item) => (
              <MenuItem key={item.categoryId} value={item.categoryName}>
                {item.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Sort Button */}
        <Tooltip title="Sort by Price: Ascending">
          <Button
            variant="contained"
            onClick={toggleSortOrder}
            sx={{
              height: "46px",
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 600,
              minWidth: "130px",
              boxShadow: "0 4px 12px rgba(25,118,210,0.25)",
            }}
          >
            Sort By
            {sortOrder==="asc" ? (<FiArrowUp size={20}/>) :(<FiArrowDown size={20}/>)}
            
          </Button>
        </Tooltip>

        {/* Clear Filter */}
        <button
          className="h-[46px] px-4 rounded-xl bg-rose-600 text-white font-semibold flex items-center gap-2 shadow-md hover:bg-rose-700 hover:scale-105 transition-all"
          onClick={handleClearFilter}
        >
          <FiRefreshCw size={18} />
          Clear Filter
        </button>
      </div>
    </div>
  );
};

export default Filter;
