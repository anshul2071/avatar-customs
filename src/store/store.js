import {create} from 'zustand';

const useAvatarStore = create(set => ({
  selections: {},
  setSelection: (category, asset) => set(state => ({
    selections: { ...state.selections, [category]: asset }
  })),
  setColor: (category, color) => set(state => ({
    selections: {
      ...state.selections,
      [category]: { ...state.selections[category], color }
    }
  })),
}));

export default useAvatarStore;
