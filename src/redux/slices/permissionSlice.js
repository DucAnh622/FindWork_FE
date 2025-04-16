import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getListPermission, getListAllPermission } from "../../services/permissionService";
import { toast } from "react-toastify";

export const getListPermissionRedux = createAsyncThunk(
  "permission/list",
  async ({ page, limit, order, sort }, { rejectWithValue }) => {
    try {
      const res = await getListPermission(page, limit, order, sort);
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

export const getAllPermissionRedux = createAsyncThunk(
    "permission/all",
    async (_, { rejectWithValue }) => {
      try {
        const res = await getListAllPermission();
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
  listPermission: [],
  arrPermission: [],
  key: "",
  page: 0,
  total: 0,
  limit: 10,
  totalPage: 0,
  order: "desc",
  orderBy: "createdAt",
  error: null,
};

const permissionSlice = createSlice({
  name: "permission",
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
      .addCase(getListPermissionRedux.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getListPermissionRedux.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listPermission = action.payload.list;
        state.page = action.payload.page - 1;
        state.limit = action.payload.limit;
        state.total = action.payload.total;
        state.totalPage = action.payload.totalPages;
      })
      .addCase(getListPermissionRedux.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder.addCase(getAllPermissionRedux.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllPermissionRedux.fulfilled, (state, action) => {
        state.isLoading = false;
        state.arrPermission = action.payload.data;
      })
      .addCase(getAllPermissionRedux.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });  
  },
});

export const { changePage, changeRowPerPage, changeSort, changeOrder } =
permissionSlice.actions;

export default permissionSlice.reducer;
