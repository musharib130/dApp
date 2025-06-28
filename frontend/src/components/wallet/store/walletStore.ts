import { create } from 'zustand';
import type { WalletState, WalletStore } from './walletStore.interfaces';
import { createSetStateFunction } from '../../../global/store/shared';

const state: WalletState = {
  connectedWallets: [],
  selectedWallet: null,
  connectionChecked: false,
  showWalletModal: false
}

export const useWalletStore = create<WalletStore>((set) => ({
  state,
  setStateItem: createSetStateFunction<WalletState>(set)
}));