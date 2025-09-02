import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { getCars } from '../api/carsApi';

export interface Car {
  id: number;
  name: string;
  color: string;
}

interface GarageState {
  cars: Car[];
  loading: boolean;
}

const initialState: GarageState = {
  cars: [],
  loading: false,
};

export const fetchCars = createAsyncThunk('garage/fetchCars', async () => {
  return await getCars();
});

const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCars.fulfilled, (state, action: PayloadAction<Car[]>) => {
        state.cars = action.payload;
        state.loading = false;
      })
      .addCase(fetchCars.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default garageSlice.reducer;
