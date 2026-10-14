const initialState ={
    analytics: {},
    salesOverview:[],
}


export const adminReducer = (state= initialState, action)=>{
    switch(action.type){
        case "FETCH_ANALYTICS":
        return{
            ...state,
            analytics: action.payload,
        };

        case "FETCH_SALESDATA":
        return{
            ...state,
            salesOverview: action.payload,
        };  

        default:
            return state;
    }
}
