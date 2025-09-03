import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import type { AppDispatch } from '../store';
import { setCars } from '../store/garageSlice';
import { getCars } from '../api/carsApi';

function Garage() {
  const dispatch = useDispatch<AppDispatch>();
  const cars = useSelector((state: RootState) => state.garage.cars);

  useEffect(() => {
    const fetchCars = async () => {
      const data = await getCars();
      dispatch(setCars(data));
    };
    fetchCars();
  }, [dispatch]);

  return (
    <div>
      <h1>Garage ({cars.length})</h1>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            <span style={{ color: car.color }}>{car.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Garage;
