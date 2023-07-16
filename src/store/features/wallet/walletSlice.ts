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
    },
    disconnectWallet: (state) => {
      state.address = "";
    },
  },
});

export const { connectWallet, disconnectWallet } = walletSlice.actions;

export default walletSlice.reducer;
