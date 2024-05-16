let libros = [
    { id: 1, titulo: "Casi Tan Salvaje", autor: "Isabel Gonzales", genero: "Novela Contemporanea", precio: 20, stock: 1 },
    { id: 2, titulo: "El Guardian", autor: "Nicholas Sparks", genero: "Novela Romantica", precio: 15, stock: 1 },
    { id: 3, titulo: "El Reino del Dragon de Oro", autor: "Isabel Allende", genero: "Novela de Aventuras", precio: 10, stock: 1 },
    { id: 4, titulo: "Deliciosa Chiara", autor: "Nicky Pellegrino", genero: "Novela Romantica", precio: 15, stock: 1 },
    { id: 5, titulo: "El Jinete en la Onda del Shock", autor: "John Brunner", genero: "Ciencia Ficcion", precio: 10, stock: 1 },
    { id: 6, titulo: "El Retrato de Dorian Gray", autor: "Oscar Wilde", genero: "Novela Gotica", precio: 20, stock: 1 },
    { id: 7, titulo: "Sol Tan Lejos", autor: "Jorge Eslava", genero: "Novela Corta", precio: 10, stock: 1 },
]

function mostrarLibrosDisponibles() {
    console.log("Libros disponibles:")
    libros.forEach(libro => {
        console.log(`ID: ${libro.id}, Título: ${libro.titulo}, Autor: ${libro.autor}, Precio: ${libro.precio}`)
    })
}

let librosEnCarrito = []

function buscarPorTitulo(titulo) {
    return libros.filter(libro => libro.titulo.toLowerCase().includes(titulo.toLowerCase()))
}

function filtrarPorAutor(autor) {
    return libros.filter(libro => libro.autor.toLowerCase() === autor.toLowerCase())
}

function agregarAlCarrito(idLibro) {
    let libroExistente = librosEnCarrito.find(item => item.libro.id === idLibro)
    let libro = libros.find(libro => libro.id === idLibro)

    if (libro && libro.stock >= 1 && !libroExistente) {
        librosEnCarrito.push({ libro })
        libro.stock -= 1
        return true
    } else if (libroExistente) {
        alert("Este libro ya está en el carrito")
        return false
    } else {
        return false
    }
}

let continuar
do {
    mostrarLibrosDisponibles()

    let idLibro = parseInt(prompt("Ingrese el ID del libro que desea agregar al carrito:"))

    if (agregarAlCarrito(idLibro)) {
        alert(`Se ha agregado el libro al carrito.`)
    } else {
        alert("Lo sentimos, no se pudo agregar el libro al carrito.")
    }

    let respuesta
    do {
        respuesta = prompt("¿Desea agregar más libros al carrito? (si/no)").toLowerCase()
    } while (respuesta !== "si" && respuesta !== "no")

    continuar = respuesta === "si"

} while (continuar)

function simularCompra() {
    let precioTotal = 0
    librosEnCarrito.forEach(item => {
        precioTotal += item.libro.precio
    })
    alert(`El precio total de la compra es: $${precioTotal}`)
    librosEnCarrito = []
}

simularCompra()
