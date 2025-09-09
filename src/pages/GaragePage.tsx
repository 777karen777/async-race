import React, { useEffect, useState } from 'react';
import { fetchCars } from '../store/garageSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { Car } from '../types/car';
import type { RootState, AppDispatch } from '../store';
// import { getCars } from '../api/carsApi';
import CarForm from '../components/CarForm';
import CarItem from '../components/CarItem';
import { Pagination } from '../components/Pagination';
import {
  addCarLocal,
  updateCarLocal,
  removeCarLocal,
} from '../store/garageSlice';

// import { fetchCars } from '../store/garageSlice';
// import { RootState, AppDispatch } from "../store";

const carsPerPage = 2;

const GaragePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cars, loading, error } = useSelector(
    (state: RootState) => state.garage,
  );
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const handleCarCreated = (car: Car) => {
    dispatch(addCarLocal(car));
    setCurrentPage(1);
  };

  const handleUpdated = (car: Car) => {
    dispatch(updateCarLocal(car));
  };

  const handleDeleted = (id: number) => {
    dispatch(removeCarLocal(id));
    const totalPages = Math.ceil((cars.length - 1) / carsPerPage);
    if (currentPage > totalPages && totalPages >= 1) setCurrentPage(totalPages);
  };

  const startIndex = (currentPage - 1) * carsPerPage;
  const currentCars = cars.slice(startIndex, startIndex + carsPerPage);

  return (
    <div>
      <h1>🚗 Garage ({cars.length})</h1>
      <CarForm onCarCreated={handleCarCreated} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {currentCars.map((car) => (
          <CarItem
            key={car.id}
            car={car}
            onUpdated={handleUpdated}
            onDeleted={handleDeleted}
          />
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
