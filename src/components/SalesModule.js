import React, { useState, useEffect, useCallback } from 'react';
import './SalesModule.css';
import AdminSideBar from './AdminSideBar';
import { TextField, Button, Autocomplete, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; 
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const products = [
  { id: 1, name: "Producto 1", price: 10 },
  { id: 2, name: "Producto 2", price: 20 },
  { id: 3, name: "Producto 3", price: 30 },
  { id: 4, name: "Producto 4", price: 40 },
];

function SalesModule() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [series, setSeries] = useState(''); 
    const [Sale, setSale] = useState([]); 
    const [FacturaCount, setFacturaCount] = useState(1);
    const [searchValue, setSearchValue] = useState(''); 
    const [openModal, setOpenModal] = useState(false);

    const generateSeries = useCallback(() => {
        const seriesNumber = `F${String(FacturaCount).padStart(3, '0')}`;
        setSeries(seriesNumber);
    }, [FacturaCount]);

    useEffect(() => {
        generateSeries(); 
    }, [generateSeries]);

    const handleAddToSale = (product) => {
        const updatedSale = [...Sale];
        const existingProduct = updatedSale.find((item) => item.id === product.id);
        if (!existingProduct) {
            updatedSale.push({ ...product, quantity: 1 });
        }
        setSale(updatedSale);
    };

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity <= 0) return; 
        const updatedSale = Sale.map((item) =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
        );
        setSale(updatedSale);
    };

    const handleRemoveFromSale = (productId) => {
        const updatedSale = Sale.filter((item) => item.id !== productId);
        setSale(updatedSale);
    };

    const calculateTotal = () => {
        const total = Sale.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const isv = total * 0.15;
        return total + isv;
    };

    const roundToTwoDecimals = (number) => parseFloat(number.toFixed(2));

    const generateInvoicePDF = () => {
        const doc = new jsPDF('p', 'mm', [80, 150]); 
        const logoUrl = '/vet.png'; 
    
        const imgWidth = 15; 
        const imgHeight = 15; 
    
        
        const pageWidth = 80; 
        const centerX = (pageWidth - imgWidth) / 2;
        const centerY = 10; 
    
       
        doc.addImage(logoUrl, 'PNG', centerX, centerY, imgWidth, imgHeight);

    // Información del encabezado
    doc.setFontSize(10);
    doc.setFont("Helvetica", "bold");
    doc.text("Clínica Veterinaria VetFolk", 40, 30, null, null, 'center'); 

    doc.setFontSize(8);
    doc.setFont("Helvetica", "normal");
    const fechaFormateada = selectedDate ? selectedDate.toLocaleDateString('es-ES', { 
        year: 'numeric', month: 'long', day: 'numeric' 
    }) : "No seleccionada";
    
    doc.text(`Número de factura: ${series}`, 10, 40);
    doc.text(`Fecha: ${fechaFormateada}`, 10, 50);
    doc.text(`Las Lajas, Comayagua`, 10, 60);
    doc.text(`Teléfono: 9978-0338`, 10, 70);

    const headers = [["Descripción", "Cantidad", "Precio", "Subtotal"]];
    const data = Sale.map((item) => [
        item.name,
        item.quantity.toString(),
        item.price.toString(),
        roundToTwoDecimals(item.price * item.quantity).toString()
    ]);

    doc.autoTable({
        head: headers,
        body: data,
        startY: 80,
        styles: { font: "Helvetica", fontSize: 7 },
        headStyles: { fillColor: [44, 107, 107], textColor: [255, 255, 255] },
        bodyStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
        alternateRowStyles: { fillColor: [240, 255, 255] },
    });

    const subtotal = roundToTwoDecimals(calculateTotal() - calculateTotal() * 0.15);
    const isv = roundToTwoDecimals(calculateTotal() * 0.15);
    const total = roundToTwoDecimals(calculateTotal());

    doc.text(`Importe: L. ${subtotal}`, 10, doc.lastAutoTable.finalY + 10);
    doc.text(`ISV (15%): L. ${isv}`, 10, doc.lastAutoTable.finalY + 20);
    doc.setFont("Helvetica", "bold");
    doc.text(`Total: L. ${total}`, 10, doc.lastAutoTable.finalY + 30);

    doc.save("Factura_VetFolk.pdf");
};

    const handleSave = () => {
        if (Sale.length === 0 || !selectedDate) {
            setOpenModal(true); 
            return;
        }
        generateInvoicePDF();
        setSale([]);
        setFacturaCount(FacturaCount + 1);
        setSelectedDate(null);  
        setSearchValue('');     
    };

    return (
        <>
            <AdminSideBar />
            <div className="sales-container">
                <div className="sales-details">
                    <h2 className='title-sales'>Detalle de Venta</h2>
                    <div className="search-bar">
                        <Autocomplete
                            className='search-input'
                            freeSolo
                            options={products}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label=" Buscar producto..."
                                    variant="outlined"
                                    fullWidth
                                    value={searchValue}  
                                    onChange={(e) => {
                                        setSearchValue(e.target.value);  
                                        if (e.target.value) {
                                            const product = products.find(p => p.name.toLowerCase().includes(e.target.value.toLowerCase()));
                                            if (product) {
                                                handleAddToSale(product);
                                            }
                                        }
                                    }}
                                />
                            )}
                            onChange={(event, value) => {
                                if (value) {
                                    handleAddToSale(value);
                                }
                            }}
                        />
                    </div>

                    <table className="sales-table">
                        <thead>
                            <tr>
                                <th className='th-title'>Descripción</th>
                                <th className='th-title'>Cantidad</th>
                                <th className='th-title'>Precio</th>
                                <th className='th-title'>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Sale.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', color: '#aaa' }}>
                                        No hay productos agregados
                                    </td>
                                </tr>
                            ) : (
                                Sale.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                                style={{ width: '60px' }}
                                            />
                                        </td>
                                        <td>{item.price}</td>
                                        <td>{roundToTwoDecimals(item.price * item.quantity)}</td>
                                        <td>
                                            <Button 
                                                className='delete-button'
                                                onClick={() => handleRemoveFromSale(item.id)}
                                                startIcon={<DeleteIcon />}
                                            />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    <div className="totals">
                        <p className='totals-text'>Importe: L. {roundToTwoDecimals(calculateTotal() - calculateTotal() * 0.15)}</p>
                        <p className='totals-text'>ISV (15%): L. {roundToTwoDecimals(calculateTotal() * 0.15)}</p>
                        <p className='totals-text'>Total: L. {roundToTwoDecimals(calculateTotal())}</p>
                    </div>
                </div>

                <div className="general-info">
                    <h2 className='title-sales'>Información General</h2>
                    <div className="form-sales">
                        <TextField
                            className='textfield-input'
                            label="Número de factura"
                            variant="outlined"
                            value={series}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            disabled
                        />
                    </div>
                    <div className="form-sales">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                className='textfield-input'
                                label="Fecha *"
                                value={selectedDate}
                                onChange={(newValue) => setSelectedDate(newValue)}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </div>
                    <Button className='create-button' onClick={handleSave}>
                        Crear Factura
                    </Button>
                </div>
            </div>
            <Dialog open={openModal} onClose={() => setOpenModal(false)}>
                <DialogTitle className='title-sales'>¡Advertencia!</DialogTitle>
                <DialogContent>
                    <DialogContentText >
                        Por favor, selecciona al menos un producto y una fecha antes de crear la factura.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button className='create-button' onClick={() => setOpenModal(false)}>
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default SalesModule;