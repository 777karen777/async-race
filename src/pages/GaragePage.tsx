import { useEffect, useState } from 'react';
import { getCars } from '../api/carsApi';
import type { Car } from '../types/car';
import { Pagination } from '../components/Pagination';

import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from '../store/garageSlice';
// import { RootState, AppDispatch } from "../store";
import type { RootState /* , AppDispatch */ } from '../store';

const GaragePage: React.FC = () => {
  // const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.garage);

  const [cars, setCars] = useState<Car[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 2;

  useEffect(() => {
    getCars().then((data) => setCars(data));
  }, []);

  const startIndex = (currentPage - 1) * carsPerPage;
  const currentCars = cars.slice(startIndex, startIndex + carsPerPage);

  return (
    <div>
      <h1>🚗 Garage</h1>
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
        // totalPages={Math.ceil(cars.length / carsPerPage)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default GaragePage;
