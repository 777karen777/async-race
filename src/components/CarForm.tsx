import React, { useState } from 'react';
import { createCar } from '../api/carsApi';
import type { Car } from '../types/car';

interface CarFormProps {
  onCarCreated: (car: Car) => void;
}

const MAX_NAME_LENGTH = 50; // ✅ replaces magic number

// ✅ Extracted sub-component (reduces main component size)
const CarFormFields: React.FC<{
  name: string;
  color: string;
  error: string | null;
  setName: (val: string) => void;
  setColor: (val: string) => void;
}> = ({ name, color, error, setName, setColor }) => (
  <>
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
    {error && <div style={{ color: 'red' }}>{error}</div>}
  </>
);

const CarForm: React.FC<CarFormProps> = ({ onCarCreated }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#000000');
  const [error, setError] = useState<string | null>(null);

  const validateName = (value: string): string | null => {
    const trimmed = value.trim();
    if (!trimmed) return 'Name is required';
    if (trimmed.length > MAX_NAME_LENGTH) {
      return `Name is too long (max ${MAX_NAME_LENGTH} chars)`;
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateName(name);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);

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
      <CarFormFields
        name={name}
        color={color}
        error={error}
        setName={setName}
        setColor={setColor}
      />
    </form>
  );
};

export default CarForm;
