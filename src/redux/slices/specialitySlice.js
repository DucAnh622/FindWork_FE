import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getListAllSpeciality,
  getListSpeciality,
} from "../../services/specialityService";
import { toast } from "react-toastify";

export const getListSpecialityRedux = createAsyncThunk(
  "speciality/list",
  async ({ page, limit, order, sort }, { rejectWithValue }) => {
    try {
      const res = await getListSpeciality(page, limit, order, sort);
      if (res && res.statusCode === 200) {
        return res.data;
      } else {
        toast.error(res.message);
        throw new Error(res.message);
      }
    } catch (error) {
      toast.error(error);
      return rejectWithValue(error);
    }
  }
);

export const getAllSpecialityRedux = createAsyncThunk(
  "speciality/all",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getListAllSpeciality();
      if (res && res.statusCode === 200) {
        return res.data;
      } else {
        toast.error(res.message);
        throw new Error(res.message);
      }
    } catch (error) {
      toast.error(error);
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  isLoading: false,
  listSpeciality: [],
  arrSpeciality: [],
  key: "",
  page: 0,
  total: 0,
  limit: 10,
  totalPage: 0,
  order: "desc",
  orderBy: "createdAt",
  error: null,
};

const specialitySlice = createSlice({
  name: "speciality",
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.page = action.payload;
    },
    changeRowPerPage: (state, action) => {
      state.limit = action.payload;
    },
    changeSort: (state, action) => {
      state.order = action.payload;
    },
    changeOrder: (state, action) => {
      state.orderBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListSpecialityRedux.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getListSpecialityRedux.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listSpeciality = action.payload.list;
        state.page = action.payload.page - 1;
        state.limit = action.payload.limit;
        state.total = action.payload.total;
        state.totalPage = action.payload.totalPages;
      })
      .addCase(getListSpecialityRedux.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getAllSpecialityRedux.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllSpecialityRedux.fulfilled, (state, action) => {
        state.isLoading = false;
        state.arrSpeciality = action.payload;
      })
      .addCase(getAllSpecialityRedux.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { changePage, changeRowPerPage, changeSort, changeOrder } =
  specialitySlice.actions;

export default specialitySlice.reducer;
