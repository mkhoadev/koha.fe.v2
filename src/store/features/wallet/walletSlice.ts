import { createSlice } from "@reduxjs/toolkit";

export interface WalletState {
  address: string;
  user: object;
}

const initialState: WalletState = {
  address: "",
  user: {},
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    connectWallet: (state, action) => {
      state.address = action.payload.address;
      state.user = action.payload.user;
    },
    disconnectWallet: (state) => {
      state.address = "";
      state.user = {};
    },
  },
});

export const { connectWallet, disconnectWallet } = walletSlice.actions;

export default walletSlice.reducer;
