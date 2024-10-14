
import React from 'react';
import { useForm } from 'react-hook-form';

export const FormularioPage = () => {
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);
    
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Nombre Completo" {...register("Nombre Completo", {})} />
        <input type="text" placeholder="Telefono" {...register("Telefono", {})} />
        <input type="text" placeholder="Nombre de la Mascota" {...register("Nombre de la Mascota", {})} />
        <select {...register("Raza")}>
          <option value="Perro">Perro</option>
          <option value=" Gato"> Gato</option>
          <option value=" Caballo"> Caballo</option>
          <option value="  ">  </option>
        </select>
        <input type="time" placeholder="Hora" {...register("Hora", {})} />
        <input type="datetime" placeholder="Fecha" {...register("Fecha", {})} />
        <select {...register("Tipo de Servicio")}>
          <option value="Consulta">Consulta</option>
          <option value=" VacunacionDesparacitacion"> VacunacionDesparacitacion</option>
          <option value=" Cirugia"> Cirugia</option>
          <option value=" Peluqueria"> Peluqueria</option>
        </select>
        <input type="text" placeholder=" Motivo de la cita" {...register(" Motivo de la cita", {})} />
  
        <input type="submit" />
      </form>
    );
};

export default FormularioPage; 