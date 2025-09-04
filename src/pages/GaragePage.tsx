import React, { useEffect, useState } from 'react';
import { getCars } from '../api/carsApi';
import CarForm from '../components/CarForm';
import type { Car } from '../types/car';
import { Pagination } from '../components/Pagination';

import { /* useDispatch, */ useSelector } from 'react-redux';
// import { fetchCars } from '../store/garageSlice';
// import { RootState, AppDispatch } from "../store";
import type { RootState /* , AppDispatch */ } from '../store';

const GaragePage: React.FC = () => {
  const { loading, error } = useSelector((state: RootState) => state.garage);

  const [cars, setCars] = useState<Car[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 2;

  useEffect(() => {
    getCars().then((data) => setCars(data));
  }, []);

  const handleCarCreated = (car: Car) => {
    setCars((prev) => [...prev, car]);
  };

  const startIndex = (currentPage - 1) * carsPerPage;
  const currentCars = [...cars]
    .reverse()
    .slice(startIndex, startIndex + carsPerPage);

  return (
    <div>
      <h1>🚗 Garage</h1>
      <CarForm onCarCreated={handleCarCreated} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {currentCars.map((car) => (
          <li key={car.id}>
            {car.name} - <span style={{ color: car.color }}>{car.color}</span>
          </li>
        ))}
      </ul>
      <Pagination
        totalCars={cars.length}
        carsPerPage={carsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default GaragePage;
