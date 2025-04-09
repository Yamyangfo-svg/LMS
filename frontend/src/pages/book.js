import React, { useState } from "react";
import "./BookLanguageModal.css";

const BookLanguageModal = ({ onClose, onSave }) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState({});

  const handleSave = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Language name must be required.";
    if (!code.trim()) newErrors.code = "Language code must be required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const newLanguage = {
        name: name.trim(),
        code: code.trim().toUpperCase()
      };
      onSave(newLanguage); 
      setName("");
      setCode("");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>New Book Language</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSave}>
          <div className={`input-group ${errors.name ? "error" : ""}`}>
            <label>Name*</label>
            <div className="input-with-icon">
              <span className="icon">🌐</span>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className={`input-group ${errors.code ? "error" : ""}`}>
            <label>Code*</label>
            <div className="input-with-icon">
              <span className="icon">💻</span>
              <input
                type="text"
                placeholder="CODE"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            {errors.code && <span className="error-text">{errors.code}</span>}
          </div>

          <div className="modal-actions">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookLanguageModal;
