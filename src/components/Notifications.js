import React, { useState } from "react";
import { IoNotifications } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./Notifications.css";

const Notifications = () => {
  const navigate = useNavigate();

  const [notificaciones] = useState([
    {
      id: 1,
      servicio: "Consulta",
      mascota: "Firulais",
      estado: "confirmada",
      fecha: "2024-11-29",
      nueva: true,
    },
    {
      id: 2,
      servicio: "Baño y peluquería",
      mascota: "Michi",
      estado: "completada",
      fecha: "2024-11-28",
      nueva: true,
    },
    {
      id: 3,
      servicio: "Consulta",
      mascota: "Bobby",
      estado: "cancelada",
      fecha: "2024-11-27",
      nueva: false,
    },
    {
      id: 4,
      servicio: "Vacunación",
      mascota: "Luna",
      estado: "pendiente",
      fecha: "2024-11-26",
      nueva: false,
    },
    {
      id: 5,
      servicio: "Consulta",
      mascota: "Rocky",
      estado: "confirmada",
      fecha: "2024-11-25",
      nueva: false,
    },
    {
      id: 6,
      servicio: "Baño",
      mascota: "Tom",
      estado: "completada",
      fecha: "2024-11-24",
      nueva: false,
    },
  ]);

  const [open, setOpen] = useState(false);

  const [notificacionesHabilitadas, setNotificacionesHabilitadas] = useState(
    localStorage.getItem("notificacionesHabilitadas") === "true" || false
  );

  const MAX_NOTIFICACIONES = 5;
  const notificacionesLimitadas = notificaciones.slice(0, MAX_NOTIFICACIONES);

  const notificacionesNuevas = notificaciones.filter((notif) => notif.nueva);

  const togglePanel = () => {
    setOpen(!open);

    // Marcar todas las notificaciones como leídas al abrir el panel
    if (!open) {
      notificaciones.forEach((notif) => (notif.nueva = false));
    }
  };

  const generarMensaje = (notif) => {
    return `Tu cita para ${notif.servicio} de ${notif.mascota} está: ${notif.estado}`;
  };

  const manejarClickNotificacion = (id) => {
    navigate(`/historial/${id}`);
  };

  const manejarCambioNotificaciones = (e) => {
    const habilitar = e.target.checked;
    setNotificacionesHabilitadas(habilitar);
    localStorage.setItem("notificacionesHabilitadas", habilitar);
  };

  return (
    <div className="notifications">
      <div className="icon-notification-container" onClick={togglePanel}>
        <IoNotifications />
        {notificacionesHabilitadas && notificacionesNuevas.length > 0 && (
          <span className="notification-counter">{notificacionesNuevas.length}</span>
        )}
      </div>
      {open && (
        <div className="notifications-panel">
          <h3 className="notifications-title">Notificaciones</h3>
          {notificacionesHabilitadas ? (
            <ul>
              {notificacionesLimitadas.map((notif) => (
                <li
                  key={notif.id}
                  className={`notification-item ${notif.nueva ? "nueva" : ""}`}
                  onClick={() => manejarClickNotificacion(notif.id)}
                >
                  <p className="notification-text">{generarMensaje(notif)}</p>
                  <span className="notification-date">{notif.fecha}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="notification-disabled-message">Las notificaciones están desactivadas.</p>
          )}
          <div className="preferences">
            <label className="label-notification">
              <input
                className="checkbox-notification"
                type="checkbox"
                checked={notificacionesHabilitadas}
                onChange={manejarCambioNotificaciones}
              />
              Activar/desactivar notificaciones
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;