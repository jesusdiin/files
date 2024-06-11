const Table = () => {
    return (
        <>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Archivo</th>
                            <th>Ruta</th>
                            <th>Categoría</th>
                            <th></th>
                        </tr>
                    </thead>
                <tbody>
                    {/* row 1 */}
                    <tr>
                        <td>
                            <div className="flex items-center gap-3">
                            <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                <img src="https://cdn-icons-png.flaticon.com/512/337/337946.png" alt="Avatar Tailwind CSS Component" />
                                </div>
                            </div>
                            <div>
                                <div className="font-bold">Un Pdf Chido.pdf</div>
                                <div className="text-sm opacity-50">Autor</div>
                            </div>
                            </div>
                        </td>
                        <td>
                            /Users/Desktop
                        </td>
                        <td>Escolar</td>
                        <th>
                            <button className="btn btn-ghost btn-xs">Detalles</button>
                        </th>
                    </tr>
                    {/* Otro ejemplo */}


                    <tr>
                        <td>
                            <div className="flex items-center gap-3">
                            <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                <img src="https://cdn-icons-png.flaticon.com/512/1829/1829589.png" alt="Avatar Tailwind CSS Component" />
                                </div>
                            </div>
                            <div>
                                <div className="font-bold">Wallpapers.png</div>
                                <div className="text-sm opacity-50">Autor</div>
                            </div>
                            </div>
                        </td>
                        <td>
                            /Users/Images
                        </td>
                        <td>Escolar</td>
                        <th>
                            <button className="btn btn-ghost btn-xs">Detalles</button>
                        </th>
                    </tr>

                </tbody>
                </table>
            </div>
        </>
    )
}

export default Table;