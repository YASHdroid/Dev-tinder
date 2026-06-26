import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./FeedSlice";
import connectionReducer from "./ConnectionSlice"
import  requestReducer from "./RequestSlice"
const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connection: connectionReducer,
    requests: requestReducer
  },
});

export default appStore;