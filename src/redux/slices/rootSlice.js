import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: {
    personalInfo: {},
    education: [],
    experience: [],
    projects: [],
  },
  error: null,
};

const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    setDataRedux: (state,action) => {
      state.data = action.payload;
    },
    setPersonalInfo: (state, action) => {
      state.data.personalInfo = action.payload;
    },
    setEducation: (state, action) => {
      state.data.education = action.payload;
    },
    setExperience: (state, action) => {
      state.data.experience = action.payload;
    },
    setProjects: (state, action) => {
      state.data.projects = action.payload;
    },
    clearData: (state) => {
      state.data = initialState.data;
    },
  },
});

export const { setPersonalInfo, setEducation, setExperience, setProjects, clearData, setDataRedux } = rootSlice.actions;

export default rootSlice.reducer;
