import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  role: [''],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserSlice: (state, action) => {
      state.email += action.payload.username;
      state.role += action.payload.roles;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserSlice } = userSlice.actions;

export default userSlice.reducer;
