// === BASE DE DATOS: Cargar productos guardados ===
const productos = JSON.parse(localStorage.getItem('pilas-productos')) || [];

// === GUARDAR EN ALMACENAMIENTO LOCAL ===
function guardarProductos() {
    localStorage.setItem('pilas-productos', JSON.stringify(productos));
}

// === CALCULAR ESTADO DEL PRODUCTO ===
function obtenerEstado(fechaCaducidad) {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Quitar horas para comparar solo fechas
    const fecha = new Date(fechaCaducidad);
    fecha.setHours(0, 0, 0, 0);

    const diasRestantes = Math.ceil((fecha - hoy) / (1000 * 60 * 60 * 24));

    if (diasRestantes < 0) {
        return {
            texto: `¡Vencido hace ${Math.abs(diasRestantes)} días!`,
            clase: 'estado-vencido'
        };
    }
    if (diasRestantes <= 7) {
        return {
            texto: `Próximo a vencer (${diasRestantes} días)`,
            clase: 'estado-proximo'
        };
    }
    return {
        texto: `Vigente (${diasRestantes} días restantes)`,
        clase: 'estado-ok'
    };
}

// === RENDERIZAR LA LISTA ===
function mostrarLista() {
    const lista = document.getElementById('lista-productos');
    lista.innerHTML = '';

    // Ordenar: los que vencen antes aparecen primero
    productos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

    productos.forEach((producto, indice) => {
        const estado = obtenerEstado(producto.fecha);

        lista.innerHTML += `
            <li>
                <div>
                    <strong>${producto.nombre}</strong><br>
                    Caduca: ${producto.fecha} — <span class="${estado.clase}">${estado.texto}</span>
                </div>
                <button class="btn-eliminar" onclick="borrarProducto(${indice})">Eliminar</button>
            </li>
        `;
    });
}

// === ELIMINAR PRODUCTO ===
function borrarProducto(indice) {
    if (confirm('¿Seguro que quieres eliminar este producto?')) {
        productos.splice(indice, 1);
        guardarProductos();
        mostrarLista();
    }
}

// === AGREGAR PRODUCTO NUEVO ===
document.getElementById('agregar').addEventListener('click', () => {
    const nombre = document.getElementById('nombre').value.trim();
    const fecha = document.getElementById('fecha').value;

    // Validaciones
    if (!nombre) {
        alert('Escribe el nombre del producto');
        return;
    }
    if (!fecha) {
        alert('Selecciona la fecha de caducidad');
        return;
    }

    // Agregar a la lista
    productos.push({ nombre, fecha });
    guardarProductos();
    mostrarLista();

    // Limpiar formulario
    document.getElementById('nombre').value = '';
    document.getElementById('fecha').value = '';
    document.getElementById('nombre').focus();
});

// === INICIO: Mostrar datos al cargar la página ===
mostrarLista();
