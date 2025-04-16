import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getListResume,
  getListResumePersonal,
} from "../../services/resumeService";
import { toast } from "react-toastify";

export const getListResumeRedux = createAsyncThunk(
  "resume/list",
  async ({ page, limit, order, sort }, { rejectWithValue }) => {
    try {
      const res = await getListResume(page, limit, order, sort);
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

export const getListResumePersonalRedux = createAsyncThunk(
  "resume/personal/list",
  async ({ page, limit, order, sort}, { rejectWithValue }) => {
    try {
      const res = await getListResumePersonal(page, limit, order, sort);
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
  listResume: [],
  key: "",
  page: 0,
  total: 0,
  totalPage: 0,
  limit: 10,
  order: "desc",
  orderBy: "createdAt",
  error: null,
};

const resumeSlice = createSlice({
  name: "resume",
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
      .addCase(getListResumeRedux.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getListResumeRedux.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listResume = action.payload.list;
        state.page = action.payload.page - 1;
        state.limit = action.payload.limit;
        state.total = action.payload.total;
        state.totalPage = action.payload.totalPages;
      })
      .addCase(getListResumeRedux.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getListResumePersonalRedux.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getListResumePersonalRedux.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listResume = action.payload.list;
        state.page = action.payload.page - 1;
        state.limit = action.payload.limit;
        state.total = action.payload.total;
        state.totalPage = action.payload.totalPages;
      })
      .addCase(getListResumePersonalRedux.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { changePage, changeRowPerPage, changeSort, changeOrder } =
  resumeSlice.actions;

export default resumeSlice.reducer;
