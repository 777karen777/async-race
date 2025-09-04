import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Car } from '../types/car';
import { getCars } from '../api/carsApi';

interface GarageState {
  cars: Car[];
  loading: boolean;
  error: string | null;
}

const initialState: GarageState = {
  cars: [],
  loading: false,
  error: null,
};

// Thunk for fetching cars
export const fetchCars = createAsyncThunk('garage/fetchCars', async () => {
  const cars = await getCars();
  return cars;
});

const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action: PayloadAction<Car[]>) => {
        state.loading = false;
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load cars';
      });
  },
});

export default garageSlice.reducer;
