import { useState, useEffect } from "react"

const Paciente = ({paciente, setPaciente, eliminarPaciente}) => {

    const {nombre, dueño, correo, fecha, sintomas, id} = paciente

    const handleEliminar = () => {
        const respuesta = confirm('¿Estás seguro de eliminar este paciente?')
    
        if(respuesta){
            eliminarPaciente(id)
        }
    }

    return (
        <div className="bg-white shadow-md mx-5 my-10 rounded-lg py-10 px-5 mb-10">
            <p className="text-gray-700 font-bold mb-3 uppercase">Nombre: {''}
                <span className="text-gray-700 font-normal mb-3 normal-case">{nombre}</span>
            </p>
            <p className="text-gray-700 font-bold mb-3 uppercase">Dueño: {''}
                <span className="text-gray-700 font-normal mb-3 normal-case">{dueño}</span>
            </p>
            <p className="text-gray-700 font-bold mb-3 uppercase">Correo Electrónico: {''}
                <span className="text-gray-700 font-normal mb-3 normal-case">{correo}</span>
            </p>
            <p className="text-gray-700 font-bold mb-3 uppercase">Fecha de Alta: {''}
                <span className="text-gray-700 font-normal mb-3 normal-case">{fecha}</span>
            </p>
            <p className="text-gray-700 font-bold mb-3 uppercase">Síntomas: {''}
                <span className="text-gray-700 font-normal mb-3 normal-case">{sintomas}</span>
            </p>

            <div className="flex justify-between mt-10">
                <button type="button" className="py-2 px-10 bg-indigo-600 text-white rounded-md uppercase font-bold text-center hover:bg-indigo-700 cursor-pointer transition-colors"
                onClick={() => setPaciente(paciente)}>
                Editar
                </button>
                <button type="button" className="py-2 px-10 bg-red-600 text-white rounded-md uppercase font-bold text-center hover:bg-red-700 cursor-pointer transition-colors"
                onClick={handleEliminar}>
                Eliminar
                </button>
            </div>
        </div>
    )
}

export default Paciente
