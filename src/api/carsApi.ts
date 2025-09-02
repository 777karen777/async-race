import axios from 'axios';
import type { Car } from '../types/car';

const BASE_URL = 'http://localhost:3000'; // JSON-server mock API

export const getCars = async (): Promise<Car[]> => {
  const response = await axios.get<Car[]>(`${BASE_URL}/garage`);
  return response.data;
};
