import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { Car } from '../types/car';
import { getCars } from '../api/carsApi';

interface GarageState {
  cars: Car[];
  loading: boolean;
  error: string | null;
}

const initialState: GarageState = { cars: [], loading: false, error: null };

export const fetchCars = createAsyncThunk('garage/fetchCars', async () => {
  return await getCars();
});

const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {
    addCarLocal(state, action: PayloadAction<Car>) {
      state.cars = [action.payload, ...state.cars];
    },
    updateCarLocal(state, action: PayloadAction<Car>) {
      state.cars = state.cars.map((c) =>
        c.id === action.payload.id ? action.payload : c,
      );
    },
    removeCarLocal(state, action: PayloadAction<number>) {
      state.cars = state.cars.filter((c) => c.id !== action.payload);
    },
    setPagePreserve(state, action: PayloadAction<number>) {
      // placeholder if we store page number
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchCars.fulfilled, (s, action: PayloadAction<Car[]>) => {
        s.loading = false;
        s.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (s, action) => {
        s.loading = false;
        s.error = action.error.message || 'Failed to load cars';
      });
  },
});

export const { addCarLocal, updateCarLocal, removeCarLocal } =
  garageSlice.actions;
export default garageSlice.reducer;
