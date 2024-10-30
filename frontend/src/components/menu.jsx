import "@/components/menu.css"
import Link from "next/link";
export default function Menu(){
    return(
        <>
        <Link className="link" href="/universidades">Universidades</Link>
        <Link className="link" href="/usuarios/mostrar">Usuarios</Link>
        <Link className="link" href="/productos/mostrar">Productos</Link>
        <Link className="link" href="/ventas/mostrar">Ventas</Link>
        </>
    );
}