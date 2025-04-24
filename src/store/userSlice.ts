import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
  token: string | null;
  roleId: number | null;
  verifiedUser: boolean;
  userType: string;
  onboarded: boolean;
}

const initialState: UserState = {
  token: null,
  roleId: null,
  verifiedUser: false,
  onboarded: false,
  userType: 'CUSTOMER',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setRoleId: (state, action: PayloadAction<number | null>) => {
      state.roleId = action.payload;
    },
    setVerifiedUser: (state, action: PayloadAction<boolean>) => {
      state.verifiedUser = action.payload;
    },
    setUserType: (state, action: PayloadAction<string>) => {
      state.userType = action.payload;
    },
    setOnboarded: (state, action: PayloadAction<boolean>) => {
      state.onboarded = action.payload;
    },
  },
});

export const {setToken, setOnboarded, setUserType, setVerifiedUser, setRoleId} =
  userSlice.actions;

export default userSlice.reducer;
