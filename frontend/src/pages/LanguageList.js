import React, { useState } from "react";
import "../styles/LanguageList.css";
import BookLanguageModal from "./BookLanguageModal";

const initialLanguages = [
  { code: 'EN', name: 'English' },
  { code: 'GJ', name: 'Gujarati' },
  { code: 'MR', name: 'Marathi' },
  { code: 'UR', name: 'Urdu' },
  { code: 'ES', name: 'Spanish' },
  { code: 'PT', name: 'Portuguese' },
  { code: 'FR', name: 'French' },
  { code: 'ZH', name: 'Chinese' }
];

const LanguageList = () => {
  const [languages, setLanguages] = useState(initialLanguages);
  const [showModal, setShowModal] = useState(false);

  const handleAddLanguage = (newLang) => {
    setLanguages([...languages, newLang]);
    setShowModal(false);
  };

  return (
    <div className="container">
      <h2>Book Languages</h2>

      <div className="top-bar">
        <button className="new-btn" onClick={() => setShowModal(true)}>
          New Book Language
        </button>

        <div className="search-container">
          <input type="text" placeholder="Search" className="search-input" />
          <button className="search-btn">🔍</button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {languages.map((lang, index) => (
            <tr key={index} className={lang.code === 'PT' ? 'highlight' : ''}>
              <td>{lang.code}</td>
              <td>{lang.name}</td>
              <td>
                <button className="edit-btn">✏️</button>
                <button className="delete-btn">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <BookLanguageModal
          onClose={() => setShowModal(false)}
          onSave={handleAddLanguage}
        />
      )}
    </div>
  );
};

export default LanguageList;
