import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getListAllSkill, getListSkill } from "../../services/skillService";
import { toast } from "react-toastify";

export const getListSkillRedux = createAsyncThunk(
  "skill/list",
  async ({ page, limit, order, sort }, { rejectWithValue }) => {
    try {
      const res = await getListSkill(page, limit, order, sort);
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

export const getAllSkillRedux = createAsyncThunk(
  "skill/all",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getListAllSkill();
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
  listSkill: [],
  arrSkill: [],
  key: "",
  page: 0,
  total: 0,
  limit: 10,
  totalPage: 0,
  order: "desc",
  orderBy: "createdAt",
  error: null,
};

const skillSlice = createSlice({
  name: "skill",
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
      .addCase(getListSkillRedux.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getListSkillRedux.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listSkill = action.payload.list;
        state.page = action.payload.page - 1;
        state.limit = action.payload.limit;
        state.total = action.payload.total;
        state.totalPage = action.payload.totalPages;
      })
      .addCase(getListSkillRedux.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getAllSkillRedux.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllSkillRedux.fulfilled, (state, action) => {
        state.isLoading = false;
        state.arrSkill = action.payload;
      })
      .addCase(getAllSkillRedux.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { changePage, changeRowPerPage, changeSort, changeOrder } =
  skillSlice.actions;

export default skillSlice.reducer;
