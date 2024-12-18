import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Formulario from "./components/Formulario";
import Header from "./components/Header";
import ListadoPacientes from "./components/ListadoPacientes";
import DetallePaciente from "./components/DetallePaciente";

function App() {
  // Inicializar el estado de pacientes con datos del localStorage
  const [pacientes, setPacientes] = useState(() => {
    const pacientesLocalStorage = localStorage.getItem("pacientes");
    return pacientesLocalStorage ? JSON.parse(pacientesLocalStorage) : [];
  });

  const [paciente, setPaciente] = useState({});
  const [busqueda, setBusqueda] = useState("");

  // Actualizar localStorage cuando cambien los pacientes
  useEffect(() => {
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
  }, [pacientes]);

  // Función para eliminar un paciente con confirmación
  const eliminarPaciente = (id) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar este paciente?");
    if (confirmar) {
      const pacientesActual = pacientes.filter((paciente) => paciente.id !== id);
      setPacientes(pacientesActual);
    }
  };

  // Función para cambiar el estado de un paciente (atendido/pendiente)
  const toggleEstado = (id) => {
    const pacientesActualizados = pacientes.map((p) =>
      p.id === id
        ? { ...p, estado: p.estado === "pendiente" ? "atendido" : "pendiente" }
        : p
    );
    setPacientes(pacientesActualizados);
  };

  // Filtrar pacientes por búsqueda
  const pacientesFiltrados = pacientes.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.dueño.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <BrowserRouter>
      <div className="container mx-auto mt-20">
        <Header />

        <Routes>
          {/* Página principal */}
          <Route
            path="/"
            element={
              <>
                <div className="mt-12 flex flex-col md:flex-row">
                  <Formulario
                    pacientes={pacientes}
                    setPacientes={setPacientes}
                    paciente={paciente}
                    setPaciente={setPaciente}
                  />
                  <div className="w-full md:w-3/5 mx-5">
                    <input
                      type="text"
                      placeholder="Buscar paciente..."
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                      className="border p-2 bg-white pl-10 rounded-md mb-5"
                    />
                    <ListadoPacientes
                      pacientes={pacientesFiltrados}
                      setPaciente={setPaciente}
                      eliminarPaciente={eliminarPaciente}
                      toggleEstado={toggleEstado}
                    />
                  </div>
                </div>
              </>
            }
          />

          {/* Página de detalles del paciente */}
          <Route
            path="/paciente/:id"
            element={<DetallePaciente pacientes={pacientes} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
