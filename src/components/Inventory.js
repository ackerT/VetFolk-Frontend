import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; 
import styled from 'styled-components'; 
import './Inventory.css';
import AdminSideBar from './AdminSideBar';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', category: '', brand: '', stock: '', price: '', image: null });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleAddProduct = () => {
    // Validación para campos obligatorios
    if (!formData.name || !formData.category || !formData.stock || !formData.price) {
      setErrorMessage('Por favor, complete todos los campos obligatorios.');
      return;
    }
    setErrorMessage('');

    if (editIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[editIndex] = formData;
      setProducts(updatedProducts);
      setEditIndex(null);
    } else {
      setProducts([...products, { ...formData }]);
    }
    setFormData({ name: '', category: '', brand: '', stock: '', price: '', image: null });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(products[index]);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!filterCategory || product.category === filterCategory)
  );

  return (
    <><AdminSideBar />
    <div className="inventory-container">
      {/* Logo */}
      <div className="logo-container">
        <img src="/vet.png" alt="Logo" className="inventory-logo" />
      </div>

      <h1 className="inventory-title">Gestión de Inventario</h1>

      <div className="form-container">
        <input
          type="text"
          name="name"
          placeholder="Nombre del producto *"
          value={formData.name}
          onChange={handleInputChange}
          className="input-field" />
        <select name="category" value={formData.category} onChange={handleInputChange} className="input-field">
          <option value="">Seleccionar categoría *</option>
          <option value="medicamento">Medicamentos</option>
          <option value="accesorio">Accesorios</option>
          <option value="alimento">Alimentos</option>
          <option value="higiene">Productos de Higiene</option>
        </select>
        <input
          type="text"
          name="brand"
          placeholder="Marca (opcional)"
          value={formData.brand}
          onChange={handleInputChange}
          className="input-field" />
        <input
          type="number"
          name="stock"
          placeholder="Cantidad en stock *"
          value={formData.stock}
          onChange={handleInputChange}
          className="input-field" />
        <input
          type="number"
          name="price"
          placeholder="Precio *"
          value={formData.price}
          onChange={handleInputChange}
          className="input-field" />

        {/* Componente de carga de imagen */}
        <div className="file-upload-container">
          <div className="file-upload">
            <input
              className="file-input"
              id="fileInput"
              type="file"
              onChange={handleFileChange}
              accept="image/*" />
            <label className="file-label" htmlFor="fileInput">
              <i className="upload-icon">📁</i>
              <p>Arrastra y suelta tu imagen aquí o haz clic para subir</p>
            </label>
          </div>
        </div>

        <button onClick={handleAddProduct}>{editIndex !== null ? 'Guardar cambios' : 'Agregar producto'}</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>

      <div className="search-container">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={searchTerm}
            onChange={handleSearchChange} />
        </div>
        <select value={filterCategory} onChange={handleCategoryChange}>
          <option value="">Filtrar por categoría</option>
          <option value="medicamento">Medicamento</option>
          <option value="accesorio">Accesorio</option>
          <option value="alimento">Alimento</option>
          <option value="higiene">Productos de Higiene</option>
        </select>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Marca</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.brand || 'N/A'}</td>
              <td>{product.stock}</td>
              <td>{product.price}</td>
              <td>
                {product.image ? (
                  <img src={URL.createObjectURL(product.image)} alt="Producto" style={{ width: '50px' }} />
                ) : (
                  'N/D'
                )}
              </td>
              <td>
                <button onClick={() => handleEdit(index)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div></>
  );
};

const StyledWrapper = styled.div`
  .file-upload-container {
    width: 100%;
    max-width: 500px;
    margin: 10px 0;
  }

  .file-upload {
    position: relative;
    border: 2px dashed #b8bcbf;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    background-color: #ffffff;
    transition: background-color 0.3s ease-in-out;
  }

  .file-upload:hover {
    background-color: #e2e6ea;
  }

  .file-input {
    display: none;
  }

  .file-label {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }

  .upload-icon {
    font-size: 30px;
    color: #007bff;
    margin-bottom: 5px;
  }

  .file-upload p {
    margin: 0;
    font-size: 14px;
    color: #6c757d;
  }

  .file-upload.dragover {
    background-color: #007bff;
    color: white;
  }
`;

export default Inventory;