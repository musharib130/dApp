export function createSetStateFunction<StateType>(set: any) {
  return <T extends keyof StateType>(key: T, value: StateType[T]) => {
    set((prev: {state: StateType}) => ({ state: { ...prev.state, [key]: value } }))
  }
}

export interface StoreBase<StateType> {
  state: StateType;
  setStateItem: <T extends keyof StateType>(key: T, value: StateType[T]) => void;
}