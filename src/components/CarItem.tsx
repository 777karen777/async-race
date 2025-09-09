import React, { useState } from 'react';
import type { Car } from '../types/car';
import {
  updateCar,
  deleteCar,
  fetchWinners,
  deleteWinner,
} from '../api/carsApi';

const MAX_NAME_LENGTH = 50;
interface Props {
  car: Car;
  onUpdated: (c: Car) => void;
  onDeleted: (id: number) => void;
}

async function saveCar(
  carId: number,
  name: string,
  color: string,
  setSaving: (v: boolean) => void,
  onUpdated: (c: Car) => void,
  setEditing: (v: boolean) => void,
) {
  if (!name.trim() || name.length > MAX_NAME_LENGTH) return;
  setSaving(true);
  try {
    const updated = await updateCar(carId, { name, color });
    onUpdated(updated);
    setEditing(false);
  } catch (err) {
    console.error(err);
  } finally {
    setSaving(false);
  }
}

async function deleteCarWithWinners(
  carId: number,
  carName: string,
  onDeleted: (id: number) => void,
) {
  if (!window.confirm(`Delete car "${carName}"?`)) return;

  try {
    await deleteCar(carId);
    const winners = await fetchWinners();
    for (const w of winners) {
      if (w.carId === carId || (w.car && w.car.id === carId)) {
        await deleteWinner(w.id);
      }
    }
    onDeleted(carId);
  } catch (err) {
    console.error('Failed to delete', err);
  }
}

const CarItem: React.FC<Props> = ({ car, onUpdated, onDeleted }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(car.name);
  const [color, setColor] = useState(car.color);
  const [saving, setSaving] = useState(false);

  return (
    <li style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <div
        style={{ width: 24, height: 12, background: car.color }}
        aria-hidden
      />
      {!editing ? (
        <>
          <span style={{ flex: 1 }}>{car.name}</span>
          <button
            type="button"
            onClick={() => {
              setEditing(true);
              setName(car.name);
              setColor(car.color);
            }}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => deleteCarWithWinners(car.id, car.name, onDeleted)}
          >
            Delete
          </button>
        </>
      ) : (
        <>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
          />
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <button
            type="button"
            disabled={saving}
            onClick={() =>
              saveCar(car.id, name, color, setSaving, onUpdated, setEditing)
            }
          >
            Save
          </button>
          <button type="button" onClick={() => setEditing(false)}>
            Cancel
          </button>
        </>
      )}
    </li>
  );
};

export default CarItem;
