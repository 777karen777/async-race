import axios from 'axios';
import type { Car } from '../types/car';

const BASE_URL = 'http://localhost:3000'; // JSON-server mock API

export const getCars = async (): Promise<Car[]> => {
  const response = await axios.get<Car[]>(`${BASE_URL}/garage`);
  return response.data;
};

export const createCar = async (car: Omit<Car, 'id'>): Promise<Car> => {
  const response = await axios.post<Car>(`${BASE_URL}/garage`, car);
  return response.data;
};
