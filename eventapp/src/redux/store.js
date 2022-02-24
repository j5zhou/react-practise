import { configureStore } from '@reduxjs/toolkit'
import eventReducer from "../redux/eventSlice";

export default configureStore({
  reducer: {
      event:eventReducer
  }
})