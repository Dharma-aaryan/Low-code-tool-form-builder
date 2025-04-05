import React, { useState } from 'react';
import Palette from './Components/Palette';
import Canvas from './Components/Canvas';
import Preview from './Components/Preview';
import FieldEditor from './Components/FieldEditor';
import { exportFormTemplate } from './formTemplate';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [formFields, setFormFields] = useState([]); // holds the form template fields
  const [selectedField, setSelectedField] = useState(null); // field selected for editing

  // Export the entire form as an HTML template
  const handleExport = () => {
    const template = exportFormTemplate(formFields);
    alert("Exported Form Template:\n" + template);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Dynamic Form Builder</h1>
      <div className="row">
        <div className="col-md-3">
          <Palette />
        </div>
        <div className="col-md-6">
          <Canvas 
            formFields={formFields} 
            setFormFields={setFormFields} 
            setSelectedField={setSelectedField} 
          />
          <button className="btn btn-primary mt-3" onClick={handleExport}>
            Export Template
          </button>
        </div>
        <div className="col-md-3">
          <Preview formFields={formFields} />
        </div>
      </div>
      {selectedField && (
        <div className="mt-4">
          <h4>Edit Field</h4>
          <FieldEditor 
            selectedField={selectedField} 
            formFields={formFields} 
            setFormFields={setFormFields} 
            setSelectedField={setSelectedField} 
          />
        </div>
      )}
    </div>
  );
}

export default App;
