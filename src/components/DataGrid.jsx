import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './DataGrid.css';

const initialData = [
  { id: '1', name: 'Alice', email: 'alice@example.com', dob: new Date('1990-01-01'), gender: 'Female', selected: false },
  { id: '2', name: 'Bob', email: 'bob@example.com', dob: new Date('1985-05-15'), gender: 'Male', selected: false },
  { id: '3', name: 'Charlie', email: 'charlie@example.com', dob: new Date('1992-07-20'), gender: 'Male', selected: false }
];

function DataGrid() {
  const [data, setData] = useState(initialData);
  const [newRow, setNewRow] = useState({
    id: '',
    name: '',
    email: '',
    dob: new Date(),
    gender: 'Other',
    selected: false
  });
  const [columns, setColumns] = useState({
    select: true,
    id: true,
    name: true,
    email: true,
    dob: true,
    gender: true
  });
  const [editRowId, setEditRowId] = useState(null);
  const [editedRow, setEditedRow] = useState({});
  const [showModal, setShowModal] = useState(false);

  // Handle input changes for adding a new row
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRow({ ...newRow, [name]: value });
  };

  // Add new row; ensure unique id
  const addRow = () => {
    let rowId = newRow.id.trim();
    if (!rowId || data.some(row => row.id === rowId)) {
      rowId = Date.now().toString();
    }
    const rowToAdd = { ...newRow, id: rowId, selected: false };
    setData([...data, rowToAdd]);
    setNewRow({ id: '', name: '', email: '', dob: new Date(), gender: 'Other', selected: false });
    setShowModal(false);
  };

  // Delete a row
  const deleteRow = (id) => {
    setData(data.filter(row => row.id !== id));
  };

  // Start editing a row
  const startEditRow = (row) => {
    setEditRowId(row.id);
    setEditedRow(row);
  };

  // Handle changes while editing
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedRow({ ...editedRow, [name]: value });
  };

  // Handle date change for editing or adding
  const handleDOBChange = (date, field, isEditing = false) => {
    if (isEditing) {
      setEditedRow({ ...editedRow, [field]: date });
    } else {
      setNewRow({ ...newRow, [field]: date });
    }
  };

  // Save edited row
  const saveEditRow = () => {
    setData(data.map(row => (row.id === editRowId ? editedRow : row)));
    setEditRowId(null);
    setEditedRow({});
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditRowId(null);
    setEditedRow({});
  };

  // Toggle column visibility
  const toggleColumn = (col) => {
    setColumns({ ...columns, [col]: !columns[col] });
  };

  // Toggle selection for a row
  const toggleRowSelection = (rowId) => {
    setData(
      data.map(row =>
        row.id === rowId ? { ...row, selected: !row.selected } : row
      )
    );
  };

  return (
    <div className="container mt-4">
      <h2>Data Grid</h2>
      
      {/* Column toggle options */}
      <div className="mb-3">
        <h5>Toggle Columns:</h5>
        {Object.keys(columns).map(col => (
          <div key={col} className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id={`col-${col}`}
              checked={columns[col]}
              onChange={() => toggleColumn(col)}
            />
            <label className="form-check-label" htmlFor={`col-${col}`}>
              {col.charAt(0).toUpperCase() + col.slice(1)}
            </label>
          </div>
        ))}
      </div>

      {/* Data Grid Table */}
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            {columns.select && <th style={{ width: '60px' }}>Select</th>}
            {columns.id && <th style={{ width: '80px' }}>ID</th>}
            {columns.name && <th style={{ width: '250px' }}>Name</th>}
            {columns.email && <th style={{ width: '250px' }}>Email</th>}
            {columns.dob && <th>DOB</th>}
            {columns.gender && <th>Gender</th>}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id}>
              {columns.select && (
                <td>
                  <input
                    type="checkbox"
                    checked={row.selected || false}
                    onChange={() => toggleRowSelection(row.id)}
                  />
                </td>
              )}
              {columns.id && (
                <td>
                  {editRowId === row.id ? (
                    <input
                      type="text"
                      name="id"
                      value={editedRow.id}
                      onChange={handleEditChange}
                      className="form-control"
                    />
                  ) : (
                    row.id
                  )}
                </td>
              )}
              {columns.name && (
                <td>
                  {editRowId === row.id ? (
                    <input
                      type="text"
                      name="name"
                      value={editedRow.name}
                      onChange={handleEditChange}
                      className="form-control"
                    />
                  ) : (
                    row.name
                  )}
                </td>
              )}
              {columns.email && (
                <td>
                  {editRowId === row.id ? (
                    <input
                      type="text"
                      name="email"
                      value={editedRow.email}
                      onChange={handleEditChange}
                      className="form-control"
                    />
                  ) : (
                    row.email
                  )}
                </td>
              )}
              {columns.dob && (
                <td>
                  {editRowId === row.id ? (
                    <DatePicker
                      selected={editedRow.dob}
                      onChange={(date) => handleDOBChange(date, 'dob', true)}
                      className="form-control"
                      dateFormat="yyyy-MM-dd"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                    />
                  ) : (
                    new Date(row.dob).toLocaleDateString()
                  )}
                </td>
              )}
              {columns.gender && (
                <td>
                  {editRowId === row.id ? (
                    <select
                      name="gender"
                      value={editedRow.gender}
                      onChange={handleEditChange}
                      className="form-control"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    row.gender
                  )}
                </td>
              )}
              <td>
                {editRowId === row.id ? (
                  <>
                    <button className="btn btn-outline-success btn-sm" onClick={saveEditRow}>Save</button>
                    <button className="btn btn-outline-secondary btn-sm ml-2" onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-outline-primary btn-sm" onClick={() => startEditRow(row)}>Edit</button>
                    <button className="btn btn-outline-danger btn-sm ml-2" onClick={() => deleteRow(row.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* '+' Button to open modal for adding new row */}
      <div className="text-right mb-3">
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+</button>
      </div>

      {/* Modal for adding new row */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Row</h3>
            <div className="form-row add-new-row">
              <div className="form-group col-md-1">
                <input
                  type="text"
                  name="id"
                  value={newRow.id}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="ID"
                />
              </div>
              <div className="form-group col-md-3">
                <input
                  type="text"
                  name="name"
                  value={newRow.name}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Name"
                />
              </div>
              <div className="form-group col-md-3">
                <input
                  type="email"
                  name="email"
                  value={newRow.email}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Email"
                />
              </div>
              <div className="form-group col-md-2">
                <DatePicker
                  selected={newRow.dob}
                  onChange={(date) => handleDOBChange(date, 'dob')}
                  className="form-control"
                  dateFormat="yyyy-MM-dd"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
              </div>
              <div className="form-group col-md-1">
                <select name="gender" value={newRow.gender} onChange={handleInputChange} className="form-control">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group col-md-1">
                <button className="btn btn-success" onClick={addRow}>Add</button>
              </div>
              <div className="form-group col-md-12 text-right">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Output of the current data */}
      <h4 className="mt-4">Output Data</h4>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default DataGrid;
