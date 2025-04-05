import React from 'react';
import { useDrag } from 'react-dnd';

const fieldTypes = [
  { type: 'textbox', label: 'Text Box' },
  { type: 'email', label: 'Email Field' },
  { type: 'number', label: 'Number Field' },
  { type: 'date', label: 'Date Picker' },
  { type: 'checkbox', label: 'Checkbox Field' },
  { type: 'radio', label: 'Radio Button Field' }
];

function DraggableField({ field }) {
  const [{ isDragging }, drag] = useDrag({
    type: 'FIELD',
    item: field,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  });
  
  return (
    <div 
      ref={drag} 
      className="p-2 mb-2 border rounded" 
      style={{ backgroundColor: isDragging ? '#f0f0f0' : '#fff', cursor: 'grab' }}
    >
      {field.label}
    </div>
  );
}

function Palette() {
  return (
    <div>
      <h4>Field Palette</h4>
      {fieldTypes.map((field, index) => (
        <DraggableField key={index} field={field} />
      ))}
    </div>
  );
}

export default Palette;
