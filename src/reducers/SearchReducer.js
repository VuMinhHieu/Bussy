const initialState = {
  places: [],
  buses: []
};
export const SearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PLACES" :
      return {
        ...state,
        places: action.data,
      };
      break;
    case "GET_BUSES" :
      return {
        ...state,
        buses: action.data,
      };
      break;
    default:
      return state; break;
  }
};