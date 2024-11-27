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
      // Add the new user to the users array
      state.users.push(action.payload);
      // Change status to "Registered"
      state.status = "Registered";
    },
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      const user = state.users.find(
        (user: User) =>
          user.email === action.payload.email &&
          user.password === action.payload.password
      );
      if (user) {
        state.loggedInUser = user;
        state.status = "loggedIn";
      }
    },
    logout: (state) => {
      // Reset status to "loggedOut"
      state.loggedInUser = null;
      state.status = "loggedOut";
    },
  },
});

export const { login, logout, register } = userSlice.actions;

export const selectUser = (state: any) => state.user.loggedInUser;
export const selectUserStatus = (state: any) => state.user.status;

export default userSlice.reducer;
