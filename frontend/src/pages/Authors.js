import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Authors.css';
import { FaSearch, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const capitalize = (str) =>
  str.replace(/\b\w/g, char => char.toUpperCase()).trim();

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newAuthor, setNewAuthor] = useState({ firstName: '', lastName: '', description: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState(null);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/authors');
      setAuthors(res.data);
    } catch (err) {
      console.error('Failed to fetch authors:', err);
    }
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    const formattedAuthor = {
      ...newAuthor,
      firstName: capitalize(newAuthor.firstName),
      lastName: capitalize(newAuthor.lastName),
    };

    try {
      if (editingAuthor) {
        const res = await axios.put(`http://localhost:5000/api/authors/${editingAuthor._id}`, formattedAuthor);
        setAuthors((prev) =>
          prev.map((author) => (author._id === res.data._id ? res.data : author))
        );
        toast.success('Author updated!');
      } else {
        const res = await axios.post('http://localhost:5000/api/authors', formattedAuthor);
        setAuthors((prev) => [...prev, res.data]);
        toast.success('Author added!');
      }

      setNewAuthor({ firstName: '', lastName: '', description: '' });
      setEditingAuthor(null);
      setModalOpen(false);
    } catch (err) {
      toast.error('Failed to save author.');
    }
  };

  const handleEdit = (author) => {
    setEditingAuthor(author);
    setNewAuthor(author);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this author?');
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/authors/${id}`);
      setAuthors((prev) => prev.filter((author) => author._id !== id));
      toast.success('Author deleted!');
    } catch (err) {
      toast.error('Delete failed!');
    }
  };

  const filteredAuthors = authors.filter((author) =>
    `${author.firstName} ${author.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="authors-container">
      <ToastContainer />
      <div className="top-bar">
        <h2><FaSearch className="title-icon" /> Authors</h2>
        <div className="search-add-wrapper">
          <input
            type="text"
            placeholder="Search authors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="new-author-btn" onClick={() => {
            setModalOpen(true);
            setEditingAuthor(null);
            setNewAuthor({ firstName: '', lastName: '', description: '' });
          }}>
            <FaPlus /> New Author
          </button>
        </div>
      </div>

      <div className="authors-list">
        {filteredAuthors.length === 0 ? (
          <p className="no-data">No authors found.</p>
        ) : (
          filteredAuthors.map((author) => (
            <div key={author._id} className="author-card">
              <div className="author-info">
                <strong>{capitalize(author.firstName)} {capitalize(author.lastName)}</strong>
                <p>{author.description}</p>
              </div>
              <div className="actions">
                <button onClick={() => handleEdit(author)}><FaEdit /></button>
                <button className="delete" onClick={() => handleDelete(author._id)}><FaTrash /></button>
              </div>
            </div>
          ))
        )}
      </div>

      {modalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>{editingAuthor ? 'Edit Author' : 'Add Author'}</h3>
            <form onSubmit={handleAddOrUpdate}>
              <input
                type="text"
                placeholder="First Name"
                value={newAuthor.firstName}
                onChange={(e) => setNewAuthor({ ...newAuthor, firstName: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={newAuthor.lastName}
                onChange={(e) => setNewAuthor({ ...newAuthor, lastName: e.target.value })}
                required
              />
              <textarea
                placeholder="Description"
                value={newAuthor.description}
                onChange={(e) => setNewAuthor({ ...newAuthor, description: e.target.value })}
              ></textarea>
              <div className="modal-buttons">
                <button type="submit" className="save">Save</button>
                <button type="button" className="cancel" onClick={() => {
                  setModalOpen(false);
                  setEditingAuthor(null);
                }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Authors;
