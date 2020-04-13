import * as constants from "../constants";
const initialState = {
  data: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case constants.GET_MEETINGS_SUCCESS:
      return {
        data: action.payload,
      };
      break;
    default:
      return state;
      break;
  }
}
