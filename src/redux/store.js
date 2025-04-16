import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./slices/userSlice";
import RootReducer from "./slices/rootSlice";
import adminReducer from "./slices/adminSlice";
import permissionReducer from "./slices/permissionSlice";
import roleReducer from "./slices/roleSlice";
import skillReducer from "./slices/skillSlice";
import specialityReducer from "./slices/specialitySlice";
import companyReducer from "./slices/companySlice";
import resumeReducer from "./slices/resumeSlice";
import jobReducer from "./slices/jobSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  root: RootReducer,
  user: userReducer,
  admin: adminReducer,
  skill: skillReducer,
  role: roleReducer,
  speciality: specialityReducer,
  permission: permissionReducer,
  company: companyReducer,
  resume: resumeReducer,
  job: jobReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;