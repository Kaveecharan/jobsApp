import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  isAdmin: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { username, isAdmin } = action.payload;
      state.username = username;
      state.isAdmin = isAdmin;
    },
      logoutUser: (state) => {
        state.username = '';
        state.isAdmin = false;
      },
  },
})

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
