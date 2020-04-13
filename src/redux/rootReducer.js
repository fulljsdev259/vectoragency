import { combineReducers } from "redux";
import meetings from './meetins/reducer';


export default combineReducers({
    meetings:meetings,
});