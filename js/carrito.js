let librosEnCarrito = [];

const actualizarContadorCarrito = () => {
    const contadorCarrito = document.getElementById('cart-count');
    if (contadorCarrito) {
        contadorCarrito.textContent = librosEnCarrito.length;
    }
};

const mostrarNotificacion = (mensaje, tipo) => {
    const notification = document.getElementById('notification');
    notification.textContent = mensaje;
    notification.className = tipo;
    notification.style.display = 'block';
    setTimeout(() => notification.style.display = 'none', 3000);
};

const actualizarCarrito = () => {
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = '';

    librosEnCarrito.forEach(({ libro: { id, titulo, autor, precio, imagen } }) => {
        const li = document.createElement('li');
        li.className = 'item-carrito';

        li.innerHTML = `
            <img src="${imagen}" alt="${titulo}" class="miniatura">
            <div class="detalles">
                <p>${titulo}</p>
                <p>${autor}</p>
                <p>$${precio}</p>
            </div>
            <button onclick="eliminarDelCarrito(${id})">Eliminar</button>
        `;

        listaCarrito.appendChild(li);
    });

    const precioTotal = librosEnCarrito.reduce((total, { libro: { precio } }) => total + precio, 0);
    document.getElementById('precio-total').textContent = `Precio Total: $${precioTotal}`;
    actualizarContadorCarrito();
};

const eliminarDelCarrito = (idLibro) => {
    const index = librosEnCarrito.findIndex(({ libro }) => libro.id === idLibro);
    if (index !== -1) {
        librosEnCarrito.splice(index, 1);
        mostrarNotificacion('Libro eliminado del carrito.', 'error');
        actualizarCarrito();
        guardarCarrito();
    }
};

document.getElementById('simular-compra').addEventListener('click', () => {
    if (librosEnCarrito.length === 0) {
        Swal.fire({
            icon: 'info',
            title: 'Carrito vacío',
            text: 'No hay libros en el carrito para comprar.',
        });
        return;
    }

    const precioTotal = librosEnCarrito.reduce((total, { libro: { precio } }) => total + precio, 0);

    Swal.fire({
        icon: 'success',
        title: 'Gracias por su compra',
        text: `El precio total de la compra es: $${precioTotal}`,
    });

    librosEnCarrito = [];
    actualizarCarrito();
    localStorage.removeItem('carrito');
    actualizarContadorCarrito();
});

const guardarCarrito = () => {
    localStorage.setItem('carrito', JSON.stringify(librosEnCarrito));
    actualizarContadorCarrito();
};

const cargarCarrito = () => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        librosEnCarrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
};

const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
};

document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);

document.addEventListener('DOMContentLoaded', () => {
    cargarCarrito();

    document.getElementById('home-link').addEventListener('click', () => {
        window.location.href = '../index.html';
    });
    
    const carritoFooter = document.createElement('div');
    carritoFooter.id = 'carrito-footer';
    document.getElementById('carrito').appendChild(carritoFooter);
    carritoFooter.appendChild(document.getElementById('precio-total'));
    carritoFooter.appendChild(document.getElementById('simular-compra'));

    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
});
