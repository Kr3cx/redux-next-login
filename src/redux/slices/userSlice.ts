import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  password: string;
}

interface UserState {
  users: User[];
  loggedInUser: User | null;
  status: string;
}

const initialState: UserState = {
  users: [],
  loggedInUser: null,
  status: "loggedOut",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register: (state, action: PayloadAction<User>) => {
      const existingUser = state.users.find(
        (user) => user.email === action.payload.email
      );
      if (!existingUser) {
        state.users.push(action.payload);
        state.status = "Registered";
      } else {
        state.status = "Email already exists";
      }
    },
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      const user = state.users.find(
        (user) =>
          user.email === action.payload.email &&
          user.password === action.payload.password
      );
      if (user) {
        state.loggedInUser = user;
        state.status = "loggedIn";
      } else {
        state.status = "loginFailed";
      }
    },
    logout: (state) => {
      state.loggedInUser = null;
      state.status = "Telah Log-Out";
    },
  },
});

export const { login, logout, register } = userSlice.actions;

export const selectUser = (state: any) => state.user.loggedInUser;
export const selectUserStatus = (state: any) => state.user.status;

export default userSlice.reducer;
