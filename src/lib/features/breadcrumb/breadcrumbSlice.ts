import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BreadcrumbState {
  value: string;
}

const initialState: BreadcrumbState = {
  value: "",
};

export const breadcrumbSlice = createSlice({
  name: "breadcrumb",
  initialState,
  reducers: {
    setBreadcrumb: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setBreadcrumb } = breadcrumbSlice.actions;
export default breadcrumbSlice.reducer;
