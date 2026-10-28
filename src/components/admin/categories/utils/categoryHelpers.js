export const INITIAL_CATEGORIES = [
    {
        id: 1,
        name: "Electronics",
        description:"Electronics device and accessories",
        productCount: 24,
        status:"Active",
    },
    {
        id: 2,
        name: "Clothing",
        description:"Fashion and everyday wear",
        productCount: 18,
        status:"Active",
    },
    {
        id: 3,
        name: "Furniture",
        description:"Home and office furniture",
        productCount: 12,
        status:"Active",
    },
    {
        id: 4,
        name: "Toys",
        description:"Toys, games and building blocks",
        productCount: 15,
        status:"Active",
    },{
        id: 5,
        name: "Beauty",
        description:"Beauty and personal care products",
        productCount: 8,
        status:"Inactive",
    },{
        id: 4,
        name: "Other",
        description:"Miscellaneous products",
        productCount: 5,
        status:"Active",
    },
];

export const CATEGORY_COLORS = [
      "#3B82F6",
  "#8B5CF6",
  "#10B981",
  "#F59E0B",
  "#F43F5E",
  "#94A3B8",
]


export const getCategoryName = (category)=> category.categoryName ?? category.name ?? "Unamed";

export const getTotalProducts = (categories)=> categories.reduce((total, category)=> total+(Number(category.productCount) || 0), 0);