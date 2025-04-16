import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getListPermissionByRole } from "../../services/roleService";
import { getListUser } from "../../services/userService";
import { toast } from "react-toastify";

export const getListPermissionByRoleRedux = createAsyncThunk(
  "permission/list",
  async ({ page, limit, roleId, order, sort }, { rejectWithValue }) => {
    try {
      const res = await getListPermissionByRole(
        page,
        limit,
        roleId,
        order,
        sort
      );
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

export const getListUserRedux = createAsyncThunk(
  "user/list",
  async ({ page, limit, order, sort }, { rejectWithValue }) => {
    try {
      const res = await getListUser(
        page,
        limit,
        order,
        sort
      );
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
  listPermissionByRole: [],
  listUser: [],
  key: "",
  page: 0,
  total: 0,
  totalPage: 0,
  limit: 10,
  order: "desc",
  orderBy: "createdAt",
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
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
    changeListUser: (state,action) => {
      state.listUser = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListPermissionByRoleRedux.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getListPermissionByRoleRedux.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listPermissionByRole = action.payload.list;
        state.page = action.payload.page - 1;
        state.limit = action.payload.limit;
        state.total = action.payload.total;
        state.totalPage = action.payload.totalPages;
      })
      .addCase(getListPermissionByRoleRedux.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
      builder
      .addCase(getListUserRedux.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getListUserRedux.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listUser = action.payload.list;
        state.page = action.payload.page - 1;
        state.limit = action.payload.limit;
        state.total = action.payload.total;
        state.totalPage = action.payload.totalPages;
      })
      .addCase(getListUserRedux.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { changePage, changeRowPerPage, changeSort, changeOrder, changeListUser } =
  adminSlice.actions;

export default adminSlice.reducer;
