import React from 'react';
import { useDrop } from 'react-dnd';

function Canvas({ formFields, setFormFields, setSelectedField }) {
  // Drop target for new fields dragged from the Palette
  const [{ isOver }, drop] = useDrop({
    accept: 'FIELD',
    drop: (item) => {
      // If the dropped item doesn't have an id, assume it's new and add it
      if (!item.id) {
        const newField = {
          id: Date.now().toString(),
          type: item.type,
          label: item.label,
          placeholder: '',
          value: ''
        };
        setFormFields([...formFields, newField]);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  });

  // Function to swap two fields in the array for reordering
  const moveField = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= formFields.length) return;
    const updatedFields = [...formFields];
    const [removed] = updatedFields.splice(fromIndex, 1);
    updatedFields.splice(toIndex, 0, removed);
    setFormFields(updatedFields);
  };

  const moveFieldUp = (index) => {
    moveField(index, index - 1);
  };

  const moveFieldDown = (index) => {
    moveField(index, index + 1);
  };

  const deleteField = (id) => {
    setFormFields(formFields.filter(field => field.id !== id));
  };

  return (
    <div
      ref={drop}
      style={{
        minHeight: '400px',
        border: '2px dashed #ccc',
        padding: '10px',
        backgroundColor: isOver ? '#f8f9fa' : '#fff'
      }}
    >
      <h4>Form Canvas (Grid View)</h4>
      {formFields.length === 0 ? (
        <p>Drag and drop fields here to build your form</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th style={{ width: '150px' }}>Field Type</th>
              <th style={{ width: '250px' }}>Label</th>
              <th style={{ width: '250px' }}>Placeholder</th>
              <th style={{ width: '180px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {formFields.map((field, index) => (
              <tr key={field.id}>
                <td>{field.type}</td>
                <td>{field.label}</td>
                <td>{field.placeholder}</td>
                <td>
                  <button 
                    className="btn btn-outline-primary btn-sm me-2" 
                    onClick={() => setSelectedField(field)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-outline-danger btn-sm" 
                    onClick={() => deleteField(field.id)}
                  >
                    Delete
                  </button>
                  {index > 0 && (
                    <button 
                      className="btn btn-outline-secondary btn-sm ms-2" 
                      onClick={() => moveFieldUp(index)}
                    >
                      Up
                    </button>
                  )}
                  {index < formFields.length - 1 && (
                    <button 
                      className="btn btn-outline-secondary btn-sm ms-2" 
                      onClick={() => moveFieldDown(index)}
                    >
                      Down
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Canvas;
