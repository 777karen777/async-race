import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from './store/garageSlice';
import type { RootState } from './store/store';
import type { AppDispatch } from './store/store';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const cars = useSelector((state: RootState) => state.garage.cars);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  return (
    <div>
      <h1>Garage</h1>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            <span style={{ color: car.color }}>⬤</span> {car.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
