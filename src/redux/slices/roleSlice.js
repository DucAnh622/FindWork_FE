import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getListRole, getListAllRole } from "../../services/roleService";
import { toast } from "react-toastify";

export const getListRoleRedux = createAsyncThunk(
  "role/list",
  async ({ page, limit, order, sort }, { rejectWithValue }) => {
    try {
      const res = await getListRole(page, limit, order, sort);
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

export const getAllRoleRedux = createAsyncThunk(
    "role/all",
    async (_, { rejectWithValue }) => {
      try {
        const res = await getListAllRole();
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
  listRole: [],
  arrRole: [],
  key: "",
  page: 0,
  total: 0,
  limit: 10,
  totalPage: 0,
  order: "desc",
  orderBy: "createdAt",
  error: null,
};

const roleSlice = createSlice({
  name: "role",
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListRoleRedux.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getListRoleRedux.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listRole = action.payload.list;
        state.page = action.payload.page - 1;
        state.limit = action.payload.limit;
        state.total = action.payload.total;
        state.totalPage = action.payload.totalPages;
      })
      .addCase(getListRoleRedux.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder.addCase(getAllRoleRedux.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllRoleRedux.fulfilled, (state, action) => {
        state.isLoading = false;
        state.arrRole = action.payload;
      })
      .addCase(getAllRoleRedux.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });  
  },
});

export const { changePage, changeRowPerPage, changeSort, changeOrder} =
roleSlice.actions;

export default roleSlice.reducer;
