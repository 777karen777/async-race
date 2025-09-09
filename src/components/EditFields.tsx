import React from 'react';

interface EditFieldsProps {
  name: string;
  color: string;
  onNameChange: (value: string) => void;
  onColorChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
}

const EditFields: React.FC<EditFieldsProps> = ({
  name,
  color,
  onNameChange,
  onColorChange,
  onSave,
  onCancel,
  saving,
}) => (
  <>
    <input
      value={name}
      onChange={(e) => onNameChange(e.target.value)}
      maxLength={50}
    />
    <input
      type="color"
      value={color}
      onChange={(e) => onColorChange(e.target.value)}
    />
    <button type="button" disabled={saving} onClick={onSave}>
      Save
    </button>
    <button type="button" onClick={onCancel}>
      Cancel
    </button>
  </>
);

export default EditFields;
