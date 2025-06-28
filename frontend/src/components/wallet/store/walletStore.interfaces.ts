import type { StoreBase } from "../../../global/store/shared";

export interface WalletState {
    connectedWallets: WalletDetail[]
    connectionChecked: boolean,
    showWalletModal: boolean,
    selectedWallet: WalletDetail | null
}

export interface WalletStore extends StoreBase<WalletState> {}

export interface WalletDetail {
    address: string;
    balance: bigint | undefined;
}