import React, { useState, useEffect } from "react";
import { IoNotifications } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import "./Notifications.css";

const Notifications = () => {
  const navigate = useNavigate();
  const idUsuario = sessionStorage.getItem("userId");

  const [notificaciones, setNotificaciones] = useState([]);
  const [open, setOpen] = useState(false);
  const [notificacionesHabilitadas, setNotificacionesHabilitadas] = useState(
    sessionStorage.getItem("notificacionesHabilitadas") === "true" || false
  );

  const MAX_NOTIFICACIONES = 5;
  const notificacionesLimitadas = notificaciones.slice(0, MAX_NOTIFICACIONES);
  const notificacionesNuevas = notificaciones.filter((notif) => !notif.leida);

  const socket = io("http://localhost:3008"); // Dirección de tu servidor WebSocket

  useEffect(() => {
    // Al establecer la conexión, escuchar eventos de nuevas notificaciones
    socket.on('nueva_notificacion', (nuevaNotificacion) => {
      setNotificaciones((prevNotificaciones) => [nuevaNotificacion, ...prevNotificaciones]);
    });

    // Obtener las notificaciones iniciales del servidor
    if (idUsuario) {
      fetch(`http://localhost:3008/notificaciones/${idUsuario}`)
        .then((response) => response.json())
        .then((data) => setNotificaciones(data))
        .catch((error) => console.error("Error fetching notifications:", error));
    }

    return () => {
      socket.off('nueva_notificacion'); // Limpiar el evento cuando se desmonte el componente
    };
  }, [idUsuario, socket]);

  const togglePanel = () => {
    if (open) {
      notificaciones.forEach((notif) => {
        if (!notif.leida) {
          marcarComoLeida(notif.idNotificacion);
          notif.leida = true;
        }
      });
      setNotificaciones([...notificaciones]);
    }
    setOpen(!open);
  };

  const marcarComoLeida = (idNotificacion) => {
    fetch(`http://localhost:3008/notificaciones/marcar-leida/${idNotificacion}`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((data) => console.log("Notificación marcada como leída", data))
      .catch((error) => console.error("Error marking notification as read:", error));
  };

  const manejarClickNotificacion = (id) => {
    navigate(`/historial/${id}`);
  };

  const manejarCambioNotificaciones = (e) => {
    const habilitar = e.target.checked;
    setNotificacionesHabilitadas(habilitar);
    sessionStorage.setItem("notificacionesHabilitadas", habilitar);
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
                  key={notif.idNotificacion}
                  className={`notification-item ${notif.leida ? "leida" : "nueva"}`}
                  onClick={() =>
                    !notif.leida && manejarClickNotificacion(notif.idNotificacion)
                  }
                >
                  <p className="notification-text">{notif.mensaje}</p>
                  <span className="notification-date">
                    {new Date(notif.fecha).toLocaleString()}
                  </span>
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
