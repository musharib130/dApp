import { create } from 'zustand';
import { type GlobalState, type GlobalStore } from './globalStore.interfaces';
import { createSetStateFunction } from './shared';

const state: GlobalState = {
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  state,
  setStateItem: createSetStateFunction<GlobalState>(set)
}));