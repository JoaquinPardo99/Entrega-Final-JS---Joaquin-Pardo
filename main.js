const libros = [
    { id: 1, titulo: "Casi Tan Salvaje", autor: "Isabel Gonzales", genero: "Novela Contemporanea", precio: 20, stock: 1 },
    { id: 2, titulo: "El Guardian", autor: "Nicholas Sparks", genero: "Novela Romantica", precio: 15, stock: 1 },
    { id: 3, titulo: "El Reino del Dragon de Oro", autor: "Isabel Allende", genero: "Novela de Aventuras", precio: 10, stock: 1 },
    { id: 4, titulo: "Deliciosa Chiara", autor: "Nicky Pellegrino", genero: "Novela Romantica", precio: 15, stock: 1 },
    { id: 5, titulo: "El Jinete en la Onda del Shock", autor: "John Brunner", genero: "Ciencia Ficcion", precio: 10, stock: 1 },
    { id: 6, titulo: "El Retrato de Dorian Gray", autor: "Oscar Wilde", genero: "Novela Gotica", precio: 20, stock: 1 },
    { id: 7, titulo: "Sol Tan Lejos", autor: "Jorge Eslava", genero: "Novela Corta", precio: 10, stock: 1 },
];

let librosEnCarrito = [];

function mostrarLibrosDisponibles() {
    const listaLibros = document.getElementById('lista-libros');
    listaLibros.innerHTML = '';

    libros.forEach(libro => {
        const li = document.createElement('li');
        li.textContent = `ID: ${libro.id}, Título: ${libro.titulo}, Autor: ${libro.autor}, Precio: ${libro.precio}`;
        const button = document.createElement('button');
        button.textContent = 'Agregar al carrito';
        button.onclick = () => agregarAlCarrito(libro.id);
        li.appendChild(button);
        listaLibros.appendChild(li);
    });
}

function agregarAlCarrito(idLibro) {
    const libroExistente = librosEnCarrito.find(item => item.libro.id === idLibro);
    const libro = libros.find(libro => libro.id === idLibro);

    if (libro && libro.stock >= 1 && !libroExistente) {
        librosEnCarrito.push({ libro });
        libro.stock -= 1;
        mostrarNotificacion(`Se ha agregado "${libro.titulo}" al carrito.`, 'success');
        actualizarCarrito();
        mostrarLibrosDisponibles();
        guardarCarrito();
    } else if (libroExistente) {
        mostrarNotificacion("¡Este libro ya está en el carrito!", 'error');
    } else {
        mostrarNotificacion("Lo sentimos, no se pudo agregar el libro al carrito.", 'error');
    }
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = '';

    librosEnCarrito.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `Título: ${item.libro.titulo}, Autor: ${item.libro.autor}, Precio: ${item.libro.precio}`;
        const button = document.createElement('button');
        button.textContent = 'Eliminar';
        button.onclick = () => eliminarDelCarrito(index);
        li.appendChild(button);
        listaCarrito.appendChild(li);
    });

    const precioTotal = librosEnCarrito.reduce((total, item) => total + item.libro.precio, 0);
    document.getElementById('precio-total').textContent = `Precio Total: $${precioTotal}`;
}

function eliminarDelCarrito(index) {
    const libro = librosEnCarrito[index].libro;
    librosEnCarrito.splice(index, 1);
    libro.stock += 1;
    mostrarNotificacion(`Se ha eliminado "${libro.titulo}" del carrito.`, 'error');
    actualizarCarrito();
    mostrarLibrosDisponibles();
    guardarCarrito();
}

document.getElementById('simular-compra').addEventListener('click', simularCompra);

function simularCompra() {
    const precioTotal = librosEnCarrito.reduce((total, item) => total + item.libro.precio, 0);
    librosEnCarrito = [];
    libros.forEach(libro => libro.stock = 1);
    actualizarCarrito();
    mostrarLibrosDisponibles();
    localStorage.removeItem('carrito');
    Swal.fire({
        title: 'Gracias por tu compra!',
        text: `El precio total de la compra es: $${precioTotal}`,
        icon: 'success',
        confirmButtonText: 'Cerrar'
    });
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(librosEnCarrito));
}

function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        librosEnCarrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
}

function mostrarNotificacion(mensaje, tipo) {
    const notificaciones = document.getElementById('notificaciones');
    const div = document.createElement('div');
    div.className = `notificacion ${tipo}`;
    div.textContent = mensaje;
    notificaciones.appendChild(div);

    setTimeout(() => {
        div.classList.add('show');
    }, 10);

    setTimeout(() => {
        div.classList.remove('show');
        setTimeout(() => {
            notificaciones.removeChild(div);
        }, 300);
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarLibrosDisponibles();
    cargarCarrito();
});
