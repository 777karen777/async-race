import axios from 'axios';
import type { Car } from '../types/car';

const BASE_URL = 'http://localhost:3000'; // JSON-server mock API
const DEFAULT_COUNT = 100;
const HEX_MASK = 0xffffff;
const SHIFT_AMOUNT = 16;
const COLOR_LENGTH = 6;

export const getCars = async (): Promise<Car[]> => {
  const response = await axios.get<Car[]>(`${BASE_URL}/garage`);
  return response.data;
};

export const createCar = async (car: Omit<Car, 'id'>): Promise<Car> => {
  const response = await axios.post<Car>(`${BASE_URL}/garage`, car);
  return response.data;
};

export const updateCar = async (
  id: number,
  patch: Partial<Omit<Car, 'id'>>,
): Promise<Car> => {
  const response = await axios.put<Car>(`${BASE_URL}/garage/${id}`, {
    ...patch,
    id,
  });
  return response.data;
};

export const deleteCar = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/garage/${id}`);
};

export const fetchWinners = async () => {
  const response = await axios.get(`${BASE_URL}/winners`);
  return response.data;
};

export const deleteWinner = async (winnerId: number) => {
  await axios.delete(`${BASE_URL}/winners/${winnerId}`);
};

export const createRandomCars = async (
  count = DEFAULT_COUNT,
  createFn: (c: Omit<Car, 'id'>) => Promise<Car>,
) => {
  const results: Car[] = [];
  for (let i = 0; i < count; i += 1) {
    const nameA =
      RANDOM_BRANDS[Math.floor(Math.random() * RANDOM_BRANDS.length)];
    const nameB =
      RANDOM_MODELS[Math.floor(Math.random() * RANDOM_MODELS.length)];
    const color = `#${Math.floor(Math.random() * HEX_MASK)
      .toString(SHIFT_AMOUNT)
      .padStart(COLOR_LENGTH, '0')}`;
    const car = await createFn({ name: `${nameA} ${nameB}`, color });
    results.push(car);
  }
  return results;
};

const RANDOM_BRANDS = [
  'Tesla',
  'Ford',
  'Audi',
  'BMW',
  'Nissan',
  'Kia',
  'Hyundai',
  'Chevy',
  'Porsche',
  'Lexus',
];
const RANDOM_MODELS = [
  'Model S',
  'Mustang',
  'A4',
  'M3',
  'GT-R',
  'Rio',
  'Accent',
  'Camaro',
  '911',
  'RX',
];
