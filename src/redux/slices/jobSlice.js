import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getListJob,
  searchListJob,
  getListJobByCompany,
} from "../../services/jobService";
import { toast } from "react-toastify";

export const getListJobRedux = createAsyncThunk(
  "job/list",
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
        (data.level && data.level.length) ||
        (data.step && data.step.length);
      if (hasFilter) {
        res = await searchListJob(
          page,
          limit,
          order,
          sort,
          data.keyword || "",
          data.address || [],
          data.level || [],
          data.step || []
        );
      } else {
        res = await getListJob(page, limit, order, sort);
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

export const getListJobByCompanyRedux = createAsyncThunk(
  "jobs/company",
  async (params = {}, { rejectWithValue }) => {
    const {
      page = 1,
      limit = 10,
      order = "createdAt",
      sort = "DESC",
      companyId,
    } = params;
    try {
      let res = await getListJobByCompany(page, limit, order, sort, companyId);
      if (res && res.statusCode === 200) {
        return res.data;
      } else {
        toast.error(res.message);
        return rejectWithValue(res.message);
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  isLoading: false,
  listJob: [],
  listJobByCompany: [],
  key: "",
  page: 0,
  total: 0,
  limit: 10,
  totalPage: 0,
  order: "desc",
  orderBy: "createdAt",
  error: null,
};

const jobSlice = createSlice({
  name: "job",
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
      .addCase(getListJobRedux.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getListJobRedux.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listJob = action.payload.list;
        state.page = action.payload.page - 1;
        state.limit = action.payload.limit;
        state.total = action.payload.total;
        state.totalPage = action.payload.totalPages;
      })
      .addCase(getListJobRedux.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getListJobByCompanyRedux.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getListJobByCompanyRedux.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listJobByCompany = action.payload.list;
        state.page = action.payload.page - 1;
        state.limit = action.payload.limit;
        state.total = action.payload.total;
        state.totalPage = action.payload.totalPages;
      })
      .addCase(getListJobByCompanyRedux.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { changePage, changeRowPerPage, changeSort, changeOrder } =
  jobSlice.actions;

export default jobSlice.reducer;
