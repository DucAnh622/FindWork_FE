import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getListCompany,
  getListAllCompany,
  searchListCompany,
} from "../../services/companyService";
import { toast } from "react-toastify";
import { kebabCase } from "lodash";

export const getListCompanyRedux = createAsyncThunk(
  "company/list",
  async (params = {}, { rejectWithValue }) => {
    try {
      const {
        page = 1,
        limit = 10,
        order = "createdAt",
        sort = "DESC",
        data = {},
      } = params;
      let res = {};
      const hasFilter =
        data.keyword ||
        (data.address && data.address.length) ||
        typeof data.specialityId === "number";
      if (hasFilter) {
        res = await searchListCompany(
          page || 1,
          limit || 10,
          order || "createdAt",
          sort || "DESC",
          data.keyword || "",
          data.specialityId || "",
          data.address || []
        );
      } else {
        res = await getListCompany(
          page || 1,
          limit || 10,
          order || "createdAt",
          sort || "DESC"
        );
      }
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

export const getAllCompanyRedux = createAsyncThunk(
  "compnay/all",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getListAllCompany();
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
  listCompany: [],
  arrCompany: [],
  key: "",
  page: 0,
  total: 0,
  limit: 10,
  totalPage: 0,
  order: "desc",
  orderBy: "createdAt",
  error: null,
};

const companySlice = createSlice({
  name: "company",
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
      .addCase(getListCompanyRedux.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getListCompanyRedux.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listCompany = action.payload.list;
        state.page = action.payload.page - 1;
        state.limit = action.payload.limit;
        state.total = action.payload.total;
        state.totalPage = action.payload.totalPages;
      })
      .addCase(getListCompanyRedux.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getAllCompanyRedux.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllCompanyRedux.fulfilled, (state, action) => {
        state.isLoading = false;
        state.arrCompany = action.payload;
      })
      .addCase(getAllCompanyRedux.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { changePage, changeRowPerPage, changeSort, changeOrder } =
  companySlice.actions;

export default companySlice.reducer;
