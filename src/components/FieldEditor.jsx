import React, { useState, useEffect } from 'react';
import './FieldEditor.css';

function FieldEditor({ selectedField, formFields, setFormFields, setSelectedField }) {
  const [localField, setLocalField] = useState(selectedField);

  // Update local state if selectedField changes
  useEffect(() => {
    setLocalField(selectedField);
  }, [selectedField]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalField({ ...localField, [name]: value });
  };

  const saveField = () => {
    const updatedFields = formFields.map(field =>
      field.id === localField.id ? localField : field
    );
    setFormFields(updatedFields);
    setSelectedField(null);
  };

  return (
    <div className="field-editor-container">
      <h5>Edit Field</h5>
      <div className="field-editor-form">
        <div className="form-group">
          <label>Label</label>
          <input 
            type="text" 
            name="label" 
            value={localField.label} 
            onChange={handleChange}
            className="form-control" 
          />
        </div>
        <div className="form-group">
          <label>Placeholder</label>
          <input 
            type="text" 
            name="placeholder" 
            value={localField.placeholder || ''} 
            onChange={handleChange}
            className="form-control" 
          />
        </div>
        {/* Add additional configuration fields if needed */}
      </div>
      <div className="editor-buttons">
        <button className="btn btn-primary" onClick={saveField}>Save</button>
        <button className="btn btn-secondary ml-2" onClick={() => setSelectedField(null)}>Cancel</button>
      </div>
    </div>
  );
}

export default FieldEditor;
