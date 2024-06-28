import React, { useState, useEffect } from "react";
import Table from "./Table.jsx";
import DragAndDropFolder from "./DragAndDrop.jsx";

const Dashboard = () => {

    const [fileList, setFileList] = useState([]);

    // Función para obtener y almacenar los datos del JSON
    useEffect(() => {
      fetch("http://localhost:3001/list")
        .then((response) => response.json())
        .then((data) => setFileList(data))
        .catch((error) => console.error("Error al obtener el JSON:", error));
    }, []);





    return (
        <>
        <div className="w-full h-screen flex flex-wrap">
            <div className="w-1/5 bg-blue-500 p-4 text-white">
                <h2 className="text-2xl mb-4">Menú</h2>
                <ul>
                <li className="mb-2"><a href="#home">Configuraciones</a></li>
                </ul>
            </div>
            <div className="w-4/5 bg-gray-100 p-4">
                <h1 className="text-3xl mb-4">Organizador</h1>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white p-4 shadow rounded-lg">
                        <h2 className="text-xl mb-2">Escolar</h2>
                        <button className="btn btn-primary">Abrir</button>
                    </div>
                    <div className="bg-white p-4 shadow rounded-lg">
                        <h2 className="text-xl mb-2">Posgrados</h2>
                        <button className="btn btn-secondary">Abrir</button>
                    </div>
                    <div className="bg-white p-4 shadow rounded-lg">
                        <h2 className="text-xl mb-2">Planes de Estudios</h2>
                        <button className="btn btn-accent">Abrir</button>
                    </div>
                    <div className="bg-white p-4 shadow rounded-lg">
                        <h2 className="text-xl mb-2">Agregar</h2>
                        <DragAndDropFolder />
                    </div>
                </div>
                <div className="grid grid-cols-1 mt-6">
                    <div className="bg-white">
                        <h3 className="text-3xl font-bold">Carpetas</h3>
                    </div>
                </div>
                <div className="grid grid-cols-5 gap-4 mt-6">
                    <div className="bg-white p-4 shadow">
                        <div className="avatar">
                            <div className="w-24 rounded">
                                <img src="https://cdn-icons-png.flaticon.com/256/12075/12075830.png" alt="" srcset="" />
                            </div>
                        </div>
                        <span>Carpeta 1</span>
                    </div>
                    <div className="bg-white p-4 shadow">
                        <div className="avatar">
                            <div className="w-24 rounded">
                                <img src="https://cdn-icons-png.flaticon.com/256/12075/12075830.png" alt="" srcset="" />
                            </div>
                        </div>
                        <span>Carpeta 1</span>
                    </div>
                    <div className="bg-white p-4 shadow">
                        <div className="avatar">
                            <div className="w-24 rounded">
                                <img src="https://cdn-icons-png.flaticon.com/256/12075/12075830.png" alt="" srcset="" />
                            </div>
                        </div>
                        <span>Carpeta 1gygyhgygy</span>
                    </div>
                    <div className="bg-white p-4 shadow">
                        <div className="avatar">
                            <div className="w-24 rounded">
                                <img src="https://cdn-icons-png.flaticon.com/256/12075/12075830.png" alt="" srcset="" />
                            </div>
                        </div>
                        <span>Carpeta 1</span>
                    </div>
                    <div className="bg-white p-4 shadow">
                        <div className="avatar">
                            <div className="w-24 rounded">
                                <img src="https://cdn-icons-png.flaticon.com/256/12075/12075830.png" alt="" srcset="" />
                            </div>
                        </div>
                        <span>Carpeta 1</span>
                    </div>
                    <div className="bg-white p-4 shadow">
                        <div className="avatar">
                            <div className="w-24 rounded">
                                <img src="https://cdn-icons-png.flaticon.com/256/12075/12075830.png" alt="" srcset="" />
                            </div>
                        </div>
                        <span>Carpeta 1</span>
                    </div>
                    <div className="bg-white p-4 shadow">
                        <div className="avatar">
                            <div className="w-24 rounded">
                                <img src="https://cdn-icons-png.flaticon.com/256/12075/12075830.png" alt="" srcset="" />
                            </div>
                        </div>
                        <span>Carpeta 1</span>
                    </div>
                    <div className="bg-white p-4 shadow">
                        <div className="avatar">
                            <div className="w-24 rounded">
                                <img src="https://cdn-icons-png.flaticon.com/256/12075/12075830.png" alt="" srcset="" />
                            </div>
                        </div>
                        <span>Carpeta 1</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-6">
                    <h3 className="text-3xl font-bold">Archivos</h3>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-6">
                    {<Table />}
                </div>
            </div>
        </div>
        </>
    )

}

export default Dashboard;