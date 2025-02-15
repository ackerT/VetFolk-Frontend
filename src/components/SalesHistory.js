import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers';
import { TextField, FormControl, Autocomplete, Button } from '@mui/material';
import { LiaFilterSolid } from "react-icons/lia";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import './SalesHistory.css';
import AdminSideBar from './AdminSideBar';

function SalesHistory() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState('Todos los productos');
    const [filteredInvoices, setFilteredInvoices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Obtener todas las ventas al cargar el componente
    useEffect(() => {
        fetchInvoices();
    }, []);

    const fetchInvoices = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch('http://localhost:3008/ventas/obtener');  // Cambia la URL si es necesario
            if (!response.ok) {
                throw new Error('Error al cargar las ventas');
            }
            const data = await response.json();
            setFilteredInvoices(data);
        } catch (err) {
            setError('Hubo un error al cargar las ventas');
        } finally {
            setLoading(false);
        }
    };

    const handleStartDateChange = (newStart) => {
        setStartDate(newStart);
        if (newStart && endDate) {
            filterInvoices(newStart, endDate, selectedProduct);
        }
    };

    const handleEndDateChange = (newEnd) => {
        setEndDate(newEnd);
        if (startDate && newEnd) {
            filterInvoices(startDate, newEnd, selectedProduct);
        }
    };

    const productOptions = ['Todos los productos', ...new Set(filteredInvoices.flatMap((invoice) => invoice.productos.map((producto) => producto.nombre)))];

    const handleProductFilterChange = (event, value) => {
        setSelectedProduct(value);
        filterInvoices(startDate, endDate, value);
    };

    const filterInvoices = (start, end, product) => {
        const filtered = filteredInvoices.filter((invoice) => {
            const dateMatch = (!start || invoice.fecha >= start) && (!end || invoice.fecha <= end);
            const productMatch = product === 'Todos los productos' || invoice.productos.some((producto) => producto.nombre === product);
            return dateMatch && productMatch;
        });
        setFilteredInvoices(filtered);
        setCurrentPage(1); // Reset the page to the first one after applying the filter
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredInvoices.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <>
            <AdminSideBar />
            <div className="invoice-history-container">
                <h2 className='title-invoice-history'>Historial de Ventas</h2>
                <p className='text-history'> <LiaFilterSolid /> Filtros: </p>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <div className="filters-container">
                        <DatePicker
                            className='history-input'
                            label="Fecha Inicio"
                            value={startDate}
                            onChange={handleStartDateChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <DatePicker
                             className='history-input'
                            label="Fecha Fin"
                            value={endDate}
                           onChange={handleEndDateChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                       
                       <FormControl>
                        <Autocomplete
                            value={selectedProduct}
                            onChange={handleProductFilterChange}
                            options={productOptions}  // Usamos las opciones dinámicas
                            renderInput={(params) => (
                                <TextField
                                {...params}
                                label="Producto"
                                className='history-input'
                                style={{ width: 250 }}
                                />
                            )}
                            disableClearable
                        />
                       </FormControl>
                    </div>
                </LocalizationProvider>

                {loading && <p>Cargando ventas...</p>}
                {error && <p>{error}</p>}

                <table className="invoice-table">
                    <thead>
                        <tr>
                            <th className='th-history-title'>ID</th>
                            <th className='th-history-title'>Fecha</th>
                            <th className='th-history-title'>Total</th>
                            <th className='th-history-title'>Productos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map((invoice) => (
                                <tr key={invoice.idVenta}>
                                    <td>{invoice.idVenta}</td>
                                    <td>{new Date(invoice.fecha).toLocaleDateString()}</td>
                                    <td>L. {Number(invoice.total).toFixed(2)}</td>
                                    <td>{invoice.productos.map((producto) => producto.nombreProducto).join(', ')}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center', color: '#aaa' }}>
                                    No hay facturas en este rango de fechas
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="pagination-controls">
                    <Button className='pagination-buttons' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        <GrFormPreviousLink style={{ fontSize: '25px' }} />
                    </Button>

                    <span className='text-pagination'>Página {currentPage} de {totalPages}</span>

                    <Button className='pagination-buttons' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        <GrFormNextLink style={{ fontSize: '25px' }} />
                    </Button>
                </div>
            </div>
        </>
    );
}

export default SalesHistory;
