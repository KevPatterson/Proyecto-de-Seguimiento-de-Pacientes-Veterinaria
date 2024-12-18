import Paciente from "./Paciente";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ListadoPacientes = ({ pacientes, setPaciente, eliminarPaciente, toggleEstado }) => {
  return (
    <div className="h-screen overflow-y-scroll bg-gray-50 shadow-lg rounded-lg p-5">
      {pacientes && pacientes.length ? (
        <>
          <h2 className="font-black text-3xl text-center">Listado de Pacientes</h2>
          <p className="text-xl mt-5 text-center mb-10">
            Administra tus{" "}
            <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
          </p>

          {pacientes.map((paciente, index) => (
            <motion.div
              key={paciente.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white shadow-md rounded-lg p-5 mb-5"
            >
              <p className="font-bold mb-2">
                Nombre: <span className="font-normal">{paciente.nombre}</span>
              </p>
              <p className="font-bold mb-2">
                Dueño: <span className="font-normal">{paciente.dueño}</span>
              </p>
              <p className="font-bold mb-2">
                Estado:{" "}
                <span
                  className={`font-semibold ${
                    paciente.estado === "pendiente" ? "text-yellow-500" : "text-green-500"
                  }`}
                >
                  {paciente.estado || "pendiente"}
                </span>
              </p>
              <div className="flex justify-between mt-3">
                <button
                  onClick={() => toggleEstado(paciente.id)}
                  className={`py-2 px-4 rounded ${
                    paciente.estado === "pendiente" ? "bg-yellow-500" : "bg-green-500"
                  } text-white`}
                >
                  {paciente.estado === "pendiente" ? "Marcar Atendido" : "Marcar Pendiente"}
                </button>

                <button
                  onClick={() => eliminarPaciente(paciente.id)}
                  className="bg-red-500 text-white px-3 py-2 rounded"
                >
                  Eliminar
                </button>

                <Link
                  to={`/paciente/${paciente.id}`}
                  className="bg-blue-500 text-white px-3 py-2 rounded"
                >
                  Ver Detalles
                </Link>
              </div>
            </motion.div>
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No hay Pacientes</h2>
          <p className="text-xl mt-5 text-center mb-10">
            Comienza a agregar tus pacientes{" "}
            <span className="text-indigo-600 font-bold">y aparecerán aquí</span>
          </p>
        </>
      )}
    </div>
  );
};

export default ListadoPacientes;
