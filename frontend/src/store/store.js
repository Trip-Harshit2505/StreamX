import { configureStore } from "@reduxjs/toolkit"
import NetflixSlice from "./features.js"

  
  export const store = configureStore({
    reducer: {
      netflix: NetflixSlice
    },
  });
  
  