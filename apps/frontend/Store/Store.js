'use client';
import { configureStore, createSlice } from '@reduxjs/toolkit';
// import userReducer from "./features/user/userSlice";

const userReducer = createSlice({
  name: 'profile',
  initialState: {
    user: {},
  },
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

const favItemReducer = createSlice({
  name: 'favItem',
  initialState: {
    items:
      // (localStorage &&
      //   localStorage.getItem('favItems')?.length !== 0 &&
      //   JSON.parse(localStorage.getItem('favItems'))) ||
      [],
  },
  reducers: {
    addItem: (state, action) => {
      if (state.items.some((value) => action.payload === value.id)) return;

      state.items = [...state.items, { id: action.payload }];

      // localStorage.setItem('favItems', JSON.stringify(state.items));
    },

    removeItem: (state, action) => {
      const index = [...state.items]
        .map((item) => item.id)
        .indexOf(action.payload);
      // alert(index);
      const updatedItems = [...state.items];
      updatedItems.splice(index, 1);
      // delete updatedItems[index];
      // localStorage.setItem('favItems', JSON.stringify([...updatedItems]));
      state.items = updatedItems;
    },
  },
});

const bagItemsReducer = createSlice({
  name: 'bagItem',
  initialState: {
    items:
      // (JSON.parse(localStorage.getItem('bagItem'))?.length !== 0 &&
      //   JSON.parse(localStorage.getItem('bagItem'))) ||
      [],
  },
  reducers: {
    addItem: (state, action) => {
      if (state.items.some((value) => action.payload.id === value.id)) {
        const index = [...state.items]
          .map((item) => item.id)
          .indexOf(action.payload.id);
        const updateQualityState = [...state.items];

        updateQualityState[index].quatity += 1;
        updateQualityState[index].size = action.payload.size;

        state.items = updateQualityState;
        // localStorage.setItem('bagItem', JSON.stringify(state.items));
        return;
      }

      state.items = [
        ...state.items,
        {
          id: action.payload.id,
          quatity: 1,
          priceOfProduct: action.payload.price,
          size: action.payload.size,
        },
      ];

      // localStorage.setItem('bagItem', JSON.stringify(state.items));
    },

    removeItem: (state, action) => {
      const index = [...state.items]
        .map((item) => item.id)
        .indexOf(action.payload);
      const updatedItems = [...state.items];
      updatedItems.splice(index, 1);
      // delete updatedItems[index];
      // localStorage.setItem('bagItem', JSON.stringify([...updatedItems]));
      state.items = updatedItems;
    },

    increaseQuatity: (state, action) => {
      const index = [...state.items]
        .map((item) => item.id)
        .indexOf(action.payload);
      const updatedItems = [...state.items];
      if (updatedItems[index].quatity >= 10) return;
      updatedItems[index].quatity += 1;
      state.items = updatedItems;
    },

    decreaseQuatity: (state, action) => {
      const index = [...state.items]
        .map((item) => item.id)
        .indexOf(action.payload);
      const updatedItems = [...state.items];
      if (updatedItems[index].quatity <= 1) return;
      updatedItems[index].quatity -= 1;
      state.items = updatedItems;
    },
  },
});

export const userAction = userReducer.actions;

export const favItemAction = favItemReducer.actions;

export const bagItemAction = bagItemsReducer.actions;

export default configureStore({
  reducer: {
    user: userReducer.reducer,
    favItem: favItemReducer.reducer,
    bagItem: bagItemsReducer.reducer,
  },
});
