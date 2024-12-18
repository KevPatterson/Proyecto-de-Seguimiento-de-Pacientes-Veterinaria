import { useParams, Link } from "react-router-dom";

const DetallePaciente = ({ pacientes }) => {
  const { id } = useParams();
  const paciente = pacientes.find((p) => p.id === id);

  if (!paciente) return <h2 className="text-center text-red-500 text-2xl mt-10">Paciente no encontrado</h2>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-5">
      <h2 className="text-4xl font-black text-center text-gray-800 mb-8">
        <span className="text-black">Detalles del Paciente</span>
      </h2>

      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <p className="text-lg mb-4">
          <span className="font-bold text-indigo-600">Nombre:</span>{" "}
          <span className="text-gray-700">{paciente.nombre}</span>
        </p>
        <p className="text-lg mb-4">
          <span className="font-bold text-indigo-600">Dueño:</span>{" "}
          <span className="text-gray-700">{paciente.dueño}</span>
        </p>
        <p className="text-lg mb-4">
          <span className="font-bold text-indigo-600">Correo Electrónico:</span>{" "}
          <span className="text-gray-700">{paciente.correo}</span>
        </p>
        <p className="text-lg mb-4">
          <span className="font-bold text-indigo-600">Fecha de Alta:</span>{" "}
          <span className="text-gray-700">{paciente.fecha}</span>
        </p>
        <p className="text-lg mb-4">
          <span className="font-bold text-indigo-600">Síntomas:</span>{" "}
          <span className="text-gray-700">{paciente.sintomas}</span>
        </p>
        <p className="text-lg mb-4">
          <span className="font-bold text-indigo-600">Estado:</span>{" "}
          <span
            className={`${
              paciente.estado === "atendido" ? "text-green-500" : "text-yellow-500"
            } font-semibold`}
          >
            {paciente.estado}
          </span>
        </p>
      </div>

      <Link
        to="/"
        className="mt-6 inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-md shadow-lg transition duration-300"
      >
        Volver a Inicio
      </Link>
    </div>
  );
};

export default DetallePaciente;
