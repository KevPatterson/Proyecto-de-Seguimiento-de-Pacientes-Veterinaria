import { useState, useEffect } from "react";
import Error from "./Error";

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
  const estadoInicial = { nombre: "", dueño: "", correo: "", fecha: "", sintomas: "" };
  const [formulario, setFormulario] = useState(estadoInicial);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      setFormulario(paciente);
    }
  }, [paciente]);

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const generarId = () => {
    return Math.random().toString(36).substr(2) + Date.now().toString(36);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar campos vacíos
    if (Object.values(formulario).some((campo) => campo.trim() === "")) {
      setError(true);
      return;
    }
    setError(false);

    // Crear objeto de paciente
    const objetoPaciente = { ...formulario, id: paciente.id || generarId() };

    if (paciente.id) {
      // Editar paciente existente
      const pacientesActualizados = pacientes.map((p) =>
        p.id === paciente.id ? objetoPaciente : p
      );
      setPacientes(pacientesActualizados);
      setPaciente({});
    } else {
      // Agregar nuevo paciente
      setPacientes([...pacientes, objetoPaciente]);
    }

    // Reiniciar formulario
    setFormulario(estadoInicial);
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento de Pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">
        Ingrese los pacientes y{" "}
        <span className="text-indigo-600 font-bold">Adminístrelos</span>
      </p>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
        {error && <Error>Todos los campos son obligatorios</Error>}

        {[
          { id: "mascota", name: "nombre", label: "Nombre de la Mascota", type: "text" },
          { id: "dueño", name: "dueño", label: "Nombre del Dueño", type: "text" },
          { id: "correo", name: "correo", label: "Correo Electrónico", type: "email" },
          { id: "alta", name: "fecha", label: "Fecha de Alta", type: "date" },
        ].map((input) => (
          <div className="mb-5" key={input.id}>
            <label
              htmlFor={input.id}
              className="block text-gray-700 uppercase font-bold"
            >
              {input.label}
            </label>
            <input
              type={input.type}
              id={input.id}
              name={input.name}
              placeholder={`Ingrese ${input.label.toLowerCase()}`}
              className="bg-white border-2 w-full rounded-md p-2 mt-2 placeholder-gray-400"
              value={formulario[input.name]}
              onChange={handleChange}
            />
          </div>
        ))}

        <div className="mb-5">
          <label
            htmlFor="sintomas"
            className="block text-gray-700 uppercase font-bold"
          >
            Síntomas
          </label>
          <textarea
            id="sintomas"
            name="sintomas"
            placeholder="Describa los síntomas"
            className="bg-white border-2 w-full rounded-md p-2 mt-2 placeholder-gray-400"
            value={formulario.sintomas}
            onChange={handleChange}
          />
        </div>

        <input
          type="submit"
          value={paciente.id ? "Editar Paciente" : "Agregar Paciente"}
          className="bg-indigo-600 text-white w-full rounded-md p-3 uppercase font-bold text-center hover:bg-indigo-700 cursor-pointer transition-colors"
        />
      </form>
    </div>
  );
};

export default Formulario;
