import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  email: '',
  nom: '',
  prenom: '',
  departement: null,
  telephone: '',
};

export const userAccountSlice = createSlice({
  name: 'userAccount',
  initialState,
  reducers: {
    setUserAccount: (state, action) => {
      state.id += action.payload.id;
      state.email += action.payload.email;
      state.nom += action.payload.nom;
      state.prenom += action.payload.prenom;
      state.departement += action.payload.departement;
      state.telephone += action.payload.telephone;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserAccount } = userAccountSlice.actions;

export default userAccountSlice.reducer;
