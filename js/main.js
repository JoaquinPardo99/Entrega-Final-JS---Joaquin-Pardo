let libros = [];
let librosEnCarrito = [];

const mostrarLibrosDisponibles = () => {
    const listaLibros = document.getElementById('lista-libros');
    listaLibros.innerHTML = '';

    libros.forEach(({ id, titulo, autor, precio, imagen }) => {
        const li = document.createElement('li');

        li.innerHTML = `
            <img src="${imagen}" alt="${titulo}">
            <p>${titulo}</p>
            <p>${autor}</p>
            <p>$${precio}</p>
            <button onclick="agregarAlCarrito(${id})">Agregar al carrito</button>
        `;

        listaLibros.appendChild(li);
    });
};

const mostrarNotificacion = (mensaje, tipo) => {
    const notification = document.getElementById('notification');
    notification.textContent = mensaje;
    notification.className = tipo;
    notification.style.display = 'block';
    setTimeout(() => notification.style.display = 'none', 3000);
};

const agregarAlCarrito = (idLibro) => {
    const libroExistente = librosEnCarrito.find(({ libro }) => libro.id === idLibro);
    const libro = libros.find(({ id }) => id === idLibro);

    if (libro?.stock >= 1 && !libroExistente) {
        const libroConImagenModificada = { ...libro, imagen: `.${libro.imagen}` };
        librosEnCarrito.push({ libro: libroConImagenModificada });
        libro.stock--;
        mostrarNotificacion(`Se ha agregado "${libro.titulo}" al carrito.`, 'success');
        guardarCarrito();
        actualizarContadorCarrito();
    } else {
        mostrarNotificacion(libroExistente ? "¡Este libro ya está en el carrito!" : "Lo sentimos, no se pudo agregar el libro al carrito.", 'error');
    }
};

const guardarCarrito = () => {
    localStorage.setItem('carrito', JSON.stringify(librosEnCarrito));
};

const cargarCarrito = () => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        librosEnCarrito = JSON.parse(carritoGuardado);
        actualizarContadorCarrito();
    }
};

const actualizarContadorCarrito = () => {
    const contadorCarrito = document.getElementById('cart-count');
    if (contadorCarrito) {
        contadorCarrito.textContent = librosEnCarrito.length;
    }
};

const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
};

document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);

document.addEventListener('DOMContentLoaded', () => {
    fetch('data/libros.json')
        .then(response => response.json())
        .then(data => {
            libros = data;
            cargarCarrito();
            mostrarLibrosDisponibles();
        })
        .catch(error => console.error('Error al cargar los libros:', error));

    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
});
