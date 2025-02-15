import React, { useState, useEffect } from 'react';
import './Inventory.css';
import AdminSideBar from './AdminSideBar';

const baseUrl = 'http://localhost:3008'; // Cambia esto según tu configuración del backend

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    idCategoria: '',
    precio: '',
    stock: '',
    imagen: null,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${baseUrl}/categorias/obtener`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${baseUrl}/productos`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, imagen: file });
  };

  const handleCategoryFilter = (e) => {
    setFilterCategory(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddOrEditProduct = async () => {
    if (!formData.nombre || !formData.idCategoria || !formData.precio || !formData.stock) {
      setErrorMessage('Por favor, complete todos los campos obligatorios.');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('nombre', formData.nombre);
    formDataToSend.append('descripcion', formData.descripcion);
    formDataToSend.append('idCategoria', formData.idCategoria);
    formDataToSend.append('precio', formData.precio);
    formDataToSend.append('stock', formData.stock);
    if (formData.imagen) {
      formDataToSend.append('file', formData.imagen);
    }

    try {
      const response = await fetch(
        editIndex !== null
          ? `${baseUrl}/productos/${editIndex}`
          : `${baseUrl}/productos/crear`,
        {
          method: editIndex !== null ? 'PUT' : 'POST',
          body: formDataToSend,
        }
      );

      if (response.ok) {
        fetchProducts();
        setFormData({ nombre: '', descripcion: '', idCategoria: '', precio: '', stock: '', imagen: null });
        setEditIndex(null);
      } else {
        console.error('Error al guardar el producto');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const handleEdit = (productId) => {
    const productToEdit = products.find((product) => product.idProducto === productId);
    if (productToEdit) {
      setEditIndex(productId); // Usamos el ID en lugar del índice
      setFormData({
        nombre: productToEdit.nombre,
        descripcion: productToEdit.descripcion,
        idCategoria: productToEdit.idCategoria,
        precio: productToEdit.precio,
        stock: productToEdit.stock,
        imagen: null,
      });
    }
  };
  // Filtrar productos por búsqueda y categoría
  const filteredProducts = products.filter(
    (product) =>
      product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!filterCategory || product.idCategoria === parseInt(filterCategory))
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <AdminSideBar />
      <div className="inventory-container">
        <div className="logo-container">
          <img src="/vet.png" alt="Logo" className="inventory-logo" />
        </div>

        <h1 className="inventory-title">Gestión de Inventario</h1>

        <div className="form-container">
          <input type="text" name="nombre" placeholder="Nombre del producto" value={formData.nombre} onChange={handleInputChange} />
          <select name="idCategoria" value={formData.idCategoria} onChange={handleInputChange}>
            <option value="">Seleccionar categoría</option>
            {categories.map((cat) => (
              <option key={cat.idCategoria} value={cat.idCategoria}>{cat.nombreCategoria}</option>
            ))}
          </select>
          <input type="number" name="precio" placeholder="Precio" value={formData.precio} onChange={handleInputChange} />
          <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleInputChange} />
          <input type="file" onChange={handleFileChange} accept="image/*" />
          <button className='guardar-invoice-button' onClick={handleAddOrEditProduct}>{editIndex !== null ? 'Guardar cambios' : 'Agregar producto'}</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>

        <div className="search-filter-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="filter-category" style={{ flex: 1 }}>
            <select onChange={handleCategoryFilter} value={filterCategory} style={{ width: '100%' }}>
              <option value="">Todas las categorías</option>
              {categories.map((cat) => (
                <option key={cat.idCategoria} value={cat.idCategoria}>{cat.nombreCategoria}</option>
              ))}
            </select>
          </div>
          <div className="search-box" style={{ flex: 1, textAlign: 'right' }}>
            <input
              type="text"
              placeholder="Buscar por nombre"
              value={searchTerm}
              onChange={handleSearch}
              style={{ width: '80%' }}
            />
          </div>
        </div>


        <table className="product-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.idProducto}>
                <td>{product.nombre}</td>
                <td>{categories.find((cat) => cat.idCategoria === product.idCategoria)?.nombreCategoria}</td>
                <td>L. {product.precio}</td>
                <td>{product.stock}</td>
                <td>{product.imagenUrl && <img src={product.imagenUrl} alt="Producto" width="50" />}</td>
                <td><button className='edit-invoice-button' onClick={() => handleEdit(product.idProducto)}>Editar</button></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination-controls">
          <button className='pagination-invoice-buttons' onClick={handlePrevPage}>Anterior</button>
          <span>Página {currentPage} de {totalPages}</span>
          <button className='pagination-invoice-buttons' onClick={handleNextPage}>Siguiente</button>
        </div>
      </div>
    </>
  );
};

export default Inventory;
