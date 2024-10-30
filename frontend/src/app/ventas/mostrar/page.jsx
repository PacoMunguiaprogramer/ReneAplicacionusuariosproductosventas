import Link from "next/link";
import axios from "axios";
import CancelVent from "@/components/cancelarVenta";
import EditVent from "@/components/editarVent";
import AddVenta from "@/components/nuevaVenta";

async function getVentas() {
    const url = "http://localhost:3000/ventas";
    const ventas = await axios.get(url);
    return ventas.data;
}

async function getUsuarios() {
    const url = "http://localhost:3000/";
    const usuarios = await axios.get(url);
    return usuarios.data;
}

async function getProductos() {
    const url = "http://localhost:3000/productos";
    const productos = await axios.get(url);
    return productos.data;
}

export default async function Ventas() {
    const ventas = await getVentas();
    const usuarios = await getUsuarios();
    const productos = await getProductos();

    // Combina los datos de ventas con los nombres de usuario y producto
    const ventasConDetalles = ventas.map((venta) => {
        // Encuentra el usuario y el producto asociados a cada venta
        const usuario = usuarios.find((user) => user.id === venta.idusuario);
        const producto = productos.find((prod) => prod.id === venta.idproducto);

        return {
            id: venta.id,
            cantidad: venta.cantidad,
            usuarioNombre: usuario ? usuario.nombre : "Usuario desconocido",
            productoNombre: producto ? producto.nombre : "Producto desconocido",
        };
    });

    return (
        <>
            <h1>Ventas</h1>
            <AddVenta />
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Usuario</th>
                        <th>Producto</th>
                        <th>Cantidad Vendida</th>
                        <th>Editar / Cancelar</th>
                    </tr>
                </thead>
                <tbody>
                    {ventasConDetalles.map((venta, index) => (
                        <tr key={venta.id}>
                            <td>{index + 1}</td>
                            <td>{venta.usuarioNombre}</td>
                            <td>{venta.productoNombre}</td>
                            <td>{venta.cantidad}</td>
                            <td>
                                <div className="d-flex">
                                    <EditVent id={venta.id} />
                                    <div style={{ margin: '0 10px' }}></div>
                                    <CancelVent id={venta.id} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

