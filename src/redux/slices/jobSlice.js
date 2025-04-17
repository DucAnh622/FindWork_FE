import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getListJob, searchListJob } from "../../services/jobService";
import { toast } from "react-toastify";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";

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

const initialState = {
  isLoading: false,
  listJob: [],
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
  },
});

export const { changePage, changeRowPerPage, changeSort, changeOrder } =
  jobSlice.actions;

export default jobSlice.reducer;
