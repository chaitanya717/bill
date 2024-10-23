import { createSlice } from "@reduxjs/toolkit";

const FormSlice = createSlice({
  name: "form",
  initialState: {
    TypeForm: "",
    TemplateId: "",
    Subtype: "",
  },
  reducers: {
    SelectFormType(state, action) {
      return action.payload;
    },
  },
});
export default FormSlice.reducer;

export const { SelectFormType } = FormSlice.actions;
