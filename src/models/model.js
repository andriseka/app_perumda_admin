import { configureStore } from "@reduxjs/toolkit";
import model_r from "./model_r";

const model = configureStore({
    reducer : model_r
})

export default model;