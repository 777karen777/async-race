import React, { useState } from 'react';
import { createCar } from '../api/carsApi';
import type { Car } from '../types/car';

interface CarFormProps {
  onCarCreated: (car: Car) => void;
}

const CarForm: React.FC<CarFormProps> = ({ onCarCreated }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#000000');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const newCar = await createCar({ name, color });
      onCarCreated(newCar);
      setName('');
      setColor('#000000');
    } catch (error) {
      console.error('Failed to create car.', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}
    >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Car name"
        required
      />
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <button type="submit">Create</button>
    </form>
  );
};

export default CarForm;
