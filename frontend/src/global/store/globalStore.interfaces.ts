import type { StoreBase } from "./shared";

export interface GlobalState {}

export interface GlobalStore extends StoreBase<GlobalState> {}

export interface WalletDetail {
    address: string;
    balance: bigint | undefined;
}