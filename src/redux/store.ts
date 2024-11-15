import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 

// Konfigurasi redux-persist, menentukan kunci penyimpanan dan jenis storage yang digunakan (localStorage).
const persistConfig = {
  key: "root",  // Key "root" digunakan untuk menyimpan state root dari store.
  storage,      // Menggunakan localStorage untuk menyimpan state Redux.
};

// Menggabungkan semua reducer menjadi satu root reducer (di sini hanya userReducer).
const rootReducer = combineReducers({
  user: userReducer,  // Mengelola state 'user' dengan userReducer.
});

// Membuat persistedReducer yang merupakan hasil pembungkus dari rootReducer oleh redux-persist.
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Membuat store Redux dengan persistedReducer, yang berarti state disimpan dan dapat dipulihkan dari localStorage.
export const store = configureStore({
  reducer: persistedReducer,  // Menggunakan persistedReducer di store.
});

// Membuat persistor untuk mengelola proses penyimpanan dan pemulihan state ke/dari storage.
export const persistor = persistStore(store);

export default store;
