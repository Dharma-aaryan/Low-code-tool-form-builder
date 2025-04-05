import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './Preview.css';

function Preview({ formFields }) {
  // We'll keep a simple formData state (if needed for further processing)
  const [formData, setFormData] = useState({});

  // Change handler for text inputs
  const handleChange = (e, fieldId) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  // Change handler for DatePicker
  const handleDateChange = (date, fieldId) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: date
    }));
  };

  return (
    <div className="preview-container">
      <h4>Form Preview</h4>
      <form className="preview-form">
        {formFields.map((field) => {
          switch (field.type) {
            case 'textbox':
            case 'email':
            case 'number':
              return (
                <div key={field.id} className="form-group">
                  <label>{field.label}</label>
                  <input 
                    type={field.type === 'textbox' ? 'text' : field.type} 
                    placeholder={field.placeholder || ''} 
                    className="form-control"
                    onChange={(e) => handleChange(e, field.id)}
                  />
                </div>
              );
            case 'date':
              return (
                <div key={field.id} className="form-group">
                  <label>{field.label}</label>
                  <DatePicker 
                    selected={formData[field.id] || new Date()} 
                    className="form-control"
                    dateFormat="yyyy-MM-dd"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    onChange={(date) => handleDateChange(date, field.id)}
                  />
                </div>
              );
            case 'checkbox':
              return (
                <div key={field.id} className="form-group">
                  <label>{field.label}</label>
                  <div>
                    {(field.options && field.options.length > 0 
                      ? field.options 
                      : ["Check 1", "Check 2"]
                    ).map((option, index) => (
                      <div key={index} className="form-check form-check-inline">
                        <input 
                          type="checkbox" 
                          className="form-check-input custom-check"
                          id={`checkbox-${field.id}-${index}`}
                          onChange={(e) => handleChange(e, `${field.id}-${index}`)}
                        />
                        <label className="form-check-label" htmlFor={`checkbox-${field.id}-${index}`}>
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              );
            case 'radio':
              return (
                <div key={field.id} className="form-group">
                  <label>{field.label}</label>
                  <div>
                    {(field.options && field.options.length > 0 
                      ? field.options 
                      : ["Option 1", "Option 2"]
                    ).map((option, index) => (
                      <div key={index} className="form-check form-check-inline">
                        <input 
                          type="radio" 
                          name={`radio-${field.id}`}
                          className="form-check-input custom-radio"
                          id={`radio-${field.id}-${index}`}
                          onChange={(e) => handleChange(e, field.id)}
                        />
                        <label className="form-check-label" htmlFor={`radio-${field.id}-${index}`}>
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              );
            case 'button':
              return (
                <div key={field.id} className="form-group text-center">
                  <button type={field.buttonType || 'button'} className="btn btn-secondary">
                    {field.label}
                  </button>
                </div>
              );
            default:
              return null;
          }
        })}
        {/* Submit Button Centered at the Bottom */}
        <div className="text-center mt-3">
          <button type="submit" className="btn btn-primary">Submit Form</button>
        </div>
      </form>
    </div>
  );
}

export default Preview;
