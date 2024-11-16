import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers';
import { TextField, FormControl, Autocomplete, Button } from '@mui/material';
import { LiaFilterSolid } from "react-icons/lia";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import './SalesHistory.css';
import AdminSideBar from './AdminSideBar';

const invoices = [
    { id: 1, date: new Date(2024, 10, 10), total: 120.5, products: ['Producto A', 'Producto B'] },
    { id: 2, date: new Date(2024, 10, 12), total: 45.0, products: ['Producto C'] },
    { id: 3, date: new Date(2024, 10, 15), total: 75.2, products: ['Producto B', 'Producto C'] },
    { id: 4, date: new Date(2024, 10, 20), total: 150.0, products: ['Producto A', 'Producto C'] },
    { id: 5, date: new Date(2024, 10, 22), total: 98.0, products: ['Producto A'] },
    { id: 6, date: new Date(2024, 10, 23), total: 60.0, products: ['Producto B'] },
];

function SalesHistory() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState('Todos los productos');
    const [filteredInvoices, setFilteredInvoices] = useState(invoices);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; 

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

    const productOptions = ['Todos los productos', ...new Set(invoices.flatMap((invoice) => invoice.products))];

    const handleProductFilterChange = (event, value) => {
        setSelectedProduct(value);
        filterInvoices(startDate, endDate, value);
    };

    const filterInvoices = (start, end, product) => {
        const filtered = invoices.filter((invoice) => {
            const dateMatch = (!start || invoice.date >= start) && (!end || invoice.date <= end);
            const productMatch = product === 'Todos los productos' || invoice.products.includes(product);
            return dateMatch && productMatch;
        });
        setFilteredInvoices(filtered);
        setCurrentPage(1); 
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
                                <tr key={invoice.id}>
                                    <td>{invoice.id}</td>
                                    <td>{invoice.date.toLocaleDateString()}</td>
                                    <td>L. {invoice.total.toFixed(2)}</td>
                                    <td>{invoice.products.join(', ')}</td>
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
                        <GrFormPreviousLink style={{ fontSize: '25px' }}/>
                    </Button>

                    <span className='text-pagination'>Página {currentPage} de {totalPages}</span>

                    <Button className='pagination-buttons' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        <GrFormNextLink style={{ fontSize: '25px' }}/>
                    </Button>
                </div>
            </div>
        </>
    );
}

export default SalesHistory;