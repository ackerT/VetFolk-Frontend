import { useState, useEffect } from 'react';
import './ServicesAdmin.css';
import AdminSideBar from './AdminSideBar';
import logo from '../img/vet.png';

function ServicesAdmin() {
    const [services, setServices] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [newService, setNewService] = useState({
        tipoServicio: '',
        descripcion: '',
        precio: '',
        detalles: '',
        imagen: null
    });
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('http://localhost:3008/servicios');
                if (!response.ok) {
                    throw new Error('Error al obtener los servicios');
                }
                const data = await response.json();
                setServices(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchServices();
    }, []);

    const deleteService = async (idServicio) => {
        const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este servicio?');
        if (confirmed) {
            try {
                const response = await fetch(`http://localhost:3008/servicios/eliminar/${idServicio}`, { method: 'DELETE' });
                if (!response.ok) {
                    throw new Error('Error al eliminar el servicio');
                }
                // Eliminar solo el servicio correspondiente del estado
                setServices(services.filter(service => service.idServicio !== idServicio));
            } catch (error) {
                console.error('Error al eliminar el servicio:', error);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewService({ ...newService, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewService({ ...newService, imagen: file });
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleAddService = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('tipoServicio', newService.tipoServicio);
        formData.append('descripcion', newService.descripcion);
        formData.append('precio', newService.precio);
        formData.append('detalles', newService.detalles);
        if (newService.imagen) {
            formData.append('file', newService.imagen);
        }

        try {
            const response = await fetch('http://localhost:3008/servicios/crear', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Error al agregar el servicio');
            }

            const addedService = await response.json();
            setServices([...services, addedService]);
            setShowAddForm(false);
            setNewService({ tipoServicio: '', descripcion: '', precio: '', detalles: '', imagen: null });
            setPreviewImage(null);
        } catch (error) {
            console.error('Error al agregar el servicio:', error);
        }
    };

    const openEditForm = (service) => {
        setSelectedService(service);
        setShowEditForm(true);
        setNewService({
            tipoServicio: service.tipoServicio,
            descripcion: service.descripcion,
            precio: service.precio,
            detalles: service.detalles,
            imagen: null
        });
        setPreviewImage(service.imagenUrl);
    };

    const handleEditService = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('tipoServicio', newService.tipoServicio);
        formData.append('descripcion', newService.descripcion);
        formData.append('precio', newService.precio);
        formData.append('detalles', newService.detalles);
        if (newService.imagen) {
            formData.append('file', newService.imagen);
        }

        try {
            const response = await fetch(`http://localhost:3008/servicios/editar/${selectedService.idServicio}`, {
                method: 'PUT',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Error al editar el servicio');
            }

            const updatedService = await response.json();
            // Actualizar solo el servicio modificado en el estado
            setServices(services.map(service => 
                service.idServicio === updatedService.idServicio ? updatedService : service
            ));

            setShowEditForm(false);
            setSelectedService(null);
            setNewService({ tipoServicio: '', descripcion: '', precio: '', detalles: '', imagen: null });
            setPreviewImage(null);
        } catch (error) {
            console.error('Error al editar el servicio:', error);
        }
    };

    return (
        <>
            <AdminSideBar />
            <div className='service-manager'>
                <h1 className='s-head-sa'>Gestión de Servicios</h1>
                <div className='s-container-sa'>
                    {services.map((service) => (
                        <div className='s-card-sa' key={service.idServicio}>
                            <img className='service-image' src={service.imagenUrl} alt='servicio' />
                            <span className='primaryText-sa'>{service.tipoServicio}</span>
                            <span className='secondaryText-sa'>{service.descripcion}</span>
                            <div className="card-actions-sa">
                                <button
                                    className='edit-btn service-edit-btn'
                                    onClick={() => openEditForm(service)}
                                >
                                    Editar
                                </button>
                                <button
                                    className='delete-btn service-delete-btn'
                                    onClick={() => deleteService(service.idServicio)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className='s-card-sa add-service-card' onClick={() => setShowAddForm(true)}>
                        <span className='add-icon'>+</span>
                    </div>
                </div>

                {/* Formulario para agregar */}
                {showAddForm && (
                    <div className='modal-backdrop'>
                        <div className='modal-content'>
                            <img src={logo} alt='Logo' className='modal-logo' />
                            <h2 className='modal-title'>Agregar Nuevo Servicio</h2>
                            <form onSubmit={handleAddService} encType="multipart/form-data">
                                <input
                                    className='modal-input'
                                    type='text'
                                    name='tipoServicio'
                                    placeholder='Nombre del servicio'
                                    value={newService.tipoServicio}
                                    onChange={handleInputChange}
                                    required />
                                <textarea
                                    className='modal-textarea'
                                    name='descripcion'
                                    placeholder='Descripción'
                                    value={newService.descripcion}
                                    onChange={handleInputChange}
                                    required />
                                <input
                                    className='modal-input'
                                    type='text'
                                    name='precio'
                                    placeholder='Precio'
                                    value={newService.precio}
                                    onChange={handleInputChange}
                                    required />
                                <textarea
                                    className='modal-textarea'
                                    name='detalles'
                                    placeholder='Detalles del servicio'
                                    value={newService.detalles}
                                    onChange={handleInputChange}
                                    required />
                                <input
                                    className='modal-file-input'
                                    type='file'
                                    name='imagen'
                                    accept='image/*'
                                    onChange={handleFileChange}
                                    required />
                                {previewImage && <img src={previewImage} alt='Previsualización' className='preview-image' />}
                                <button type='submit' className='add-btn modal-add-btn'>Agregar Servicio</button>
                                <button type='button' className='close-service-btn modal-service-close-btn' onClick={() => setShowAddForm(false)}>Cancelar</button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Formulario para editar */}
                {showEditForm && (
                    <div className='modal-backdrop'>
                        <div className='modal-content'>
                            <img src={logo} alt='Logo' className='modal-logo' />
                            <h2 className='modal-title'>Editar Servicio</h2>
                            <form onSubmit={handleEditService} encType="multipart/form-data">
                                <input
                                    className='modal-input'
                                    type='text'
                                    name='tipoServicio'
                                    placeholder='Nombre del servicio'
                                    value={newService.tipoServicio}
                                    onChange={handleInputChange}
                                    required />
                                <textarea
                                    className='modal-textarea'
                                    name='descripcion'
                                    placeholder='Descripción'
                                    value={newService.descripcion}
                                    onChange={handleInputChange}
                                    required />
                                <input
                                    className='modal-input'
                                    type='text'
                                    name='precio'
                                    placeholder='Precio'
                                    value={newService.precio}
                                    onChange={handleInputChange}
                                    required />
                                <textarea
                                    className='modal-textarea'
                                    name='detalles'
                                    placeholder='Detalles del servicio'
                                    value={newService.detalles}
                                    onChange={handleInputChange}
                                    required />
                                <input
                                    className='modal-file-input'
                                    type='file'
                                    name='imagen'
                                    accept='image/*'
                                    onChange={handleFileChange} />
                                {previewImage && <img src={previewImage} alt='Previsualización' className='preview-image' />}
                                <button type='submit' className='add-btn modal-add-btn'>Actualizar Servicio</button>
                                <button type='button' className='close-btn modal-close-btn' onClick={() => setShowEditForm(false)}>Cancelar</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default ServicesAdmin;
