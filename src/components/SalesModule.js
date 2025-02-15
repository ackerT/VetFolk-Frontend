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
import logoUrl from '../img/vet_compressed.png';



function SalesModule() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [series, setSeries] = useState(''); 
    const [Sale, setSale] = useState([]); 
    const [FacturaCount, setFacturaCount] = useState(1);
    const [searchValue, setSearchValue] = useState(''); 
    const [openModal, setOpenModal] = useState(false);
    const [products, setProducts] = useState([]);

    const generateSeries = useCallback(() => {
        const seriesNumber = `F${String(FacturaCount).padStart(3, '0')}`;
        setSeries(seriesNumber);
    }, [FacturaCount]);

    useEffect(() => {
        generateSeries(); 
    }, [generateSeries]);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:3008/productos');
            if (!response.ok) {
                throw new Error('Error al obtener productos');
            }
            const data = await response.json();
            // Mapeo para que coincida con los campos utilizados en tu frontend
            const formattedProducts = data.map(product => ({
                id: product.idProducto,
                name: product.nombre,
                price: parseFloat(product.precio),
                stock: product.stock,
            }));
            setProducts(formattedProducts);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);



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
        const doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: [80, 120],
            compress: true,
        });
        const imgWidth = 10; 
        const imgHeight = 10; 
        const centerX = (80 - imgWidth) / 2; 
        
        doc.addImage(logoUrl, 'PNG', centerX, 5, imgWidth, imgHeight);

        doc.setFontSize(10);
        doc.setFont("Helvetica", "bold");
        doc.text("Clínica Veterinaria VetFolk", 40, 20, null, null, 'center'); 
        
        doc.setFontSize(8);
        doc.setFont("Helvetica", "normal");
        const fechaFormateada = selectedDate ? selectedDate.toLocaleDateString('es-ES', { 
            year: 'numeric', month: 'long', day: 'numeric' 
        }) : "No seleccionada";

        doc.text(`Número de factura: ${series}`, 10, 25);
        doc.text(`Fecha: ${fechaFormateada}`, 10, 30);
        doc.text(`Las Lajas, Comayagua`, 10, 35);
        
        doc.autoTable({
            head: [["Descripción", "Cantidad", "Precio", "Subtotal"]],
            body: Sale.map(item => [
                item.name,
                item.quantity.toString(),
                item.price.toString(),
                roundToTwoDecimals(item.price * item.quantity).toString()
            ]),
            startY: 40,
            styles: { 
                font: "Helvetica", 
                fontSize: 7, 
                fillColor: [255, 255, 255], 
                textColor: [0, 0, 0],       
                lineColor: [255, 255, 255],       
            },
            headStyles: {
                fillColor: [255, 255, 255], 
                textColor: [0, 0, 0],       
                lineColor: [0, 0, 0]        
            },
            alternateRowStyles: {
                fillColor: [255, 255, 255] 
            }
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

    const handleSave = async () => {
        if (Sale.length === 0 || !selectedDate) {
            setOpenModal(true); 
            return;
        } 
        const productos = Sale.map(item => ({
            idProducto: item.id,
            cantidad: item.quantity,
            precioUnitario: item.price,
        }));
    
        const total = roundToTwoDecimals(calculateTotal());
    
        try {
            const response = await fetch('http://localhost:3008/ventas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idCliente: 1, // Aquí puedes poner el ID del cliente real
                    serieFactura: series,
                    fecha: selectedDate,
                    total,
                    productos
                }),
            });
    
            const result = await response.json();
    
            if (response.ok) {
                console.log('Venta y factura creadas:', result);
                generateInvoicePDF();
                setSale([]);
                setFacturaCount(FacturaCount + 1);
                setSelectedDate(null);
                setSearchValue('');
            } else {
                console.error('Error al crear la venta:', result.message);
            }
        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
        }
    };
    return (
        <>
            <AdminSideBar />

            <div className='sales-header'>
                <h1 className='sales-header-title'>Ventas y facturación</h1>
            </div>
            <div className="sales-container">
                <div className="sales-details">
                    <h2 className='title-sales'>Detalle de Venta</h2>
                    <div className="sales-search-bar">
                        <Autocomplete
                            className='sales-search-input'
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
                                    <td className='td-sales-table' colSpan="5" style={{ textAlign: 'center', color: '#aaa' }}>
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