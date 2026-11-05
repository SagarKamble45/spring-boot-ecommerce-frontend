const initialState = {
  adminSellers: [],
  sellerPagination: {
    pageNumber: 0,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,
    lastPage: true,
  },

  sellerLoading: false,
  sellerMutationLoading: false,
  sellerError: null,

  //Seller Stats
  sellerStats: {
    totalSellers: 0,
    activeSellers: 0,
    inactiveSellers: 0,
    totalProducts: 0,
  },
  sellerStatsLoading: false,
  sellerStatsError: null,
};

export const sellerReducer = (state = initialState, action) => {
  switch (action.type) {
    //fetch seller
    case "SELLERS_LOADING":
      return {
        ...state,
        sellerLoading: true,
        sellerError: null,
      };

    case "FETCH_ADMIN_SELLERS":
      return {
        ...state,
        adminSellers: action.payload.content || [],
        sellerPagination: {
          pageNumber: action.payload.pageNumber ?? 0,
          pageSize: action.payload.pageSize ?? 10,
          totalElements: action.payload.totalElements ?? 0,
          totalPages: action.payload.totalPages ?? 0,
          lastPage: action.payload.lastPage ?? true,
        },
        sellerLoading: false,
        sellerError: null,
      };

    case "SELLERS_ERROR":
      return {
        ...state,
        sellerLoading: false,
        sellerError: action.payload,
      };

    //Seller mutations
    case "SELLER_MUTATION_LOADING":
      return {
        ...state,
        sellerMutationLoading: true,
        sellerError: null,
      };

    case "SELLER_MUTATION_SUCCESS":
      return {
        ...state,
        sellerMutationLoading: false,
        sellerError: null,
      };

    case "SELLER_MUTATION_ERROR":
      return {
        ...state,
        sellerMutationLoading: false,
        sellerError: action.payload,
      };

    //Seller Stats
    case "SELLER_STATS_LOADING":
      return {
        ...state,
        sellerStatsLoading: true,
        sellerStatsError: null,
      };

    case "FETCH_SELLER_STATS":
      return {
        ...state,
        sellerStats: action.payload,
        sellerStatsLoading: false,
        sellerStatsError: null,
      };

    case "SELLER_STATS_ERROR":
      return {
        ...state,
        sellerStatsLoading: false,
        sellerStatsError: action.payload,
      };

    default:
      return state;
  }
};

export default sellerReducer;
