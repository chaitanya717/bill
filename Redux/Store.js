import { configureStore } from "@reduxjs/toolkit";
import FormSlice from "./Slices/FormSlice";

const Store = configureStore({
    reducer: {
        FormType:FormSlice
    }
})

export default Store;