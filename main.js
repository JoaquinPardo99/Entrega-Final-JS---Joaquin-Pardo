let librosDisponibles = 10
let librosEnCarrito = 0
const precioPorLibro = 10

let cantidad

do{
    cantidad = parseInt(prompt("Ingrese la cantidad de libros que desea agregar al carrito:"))

    if(isNaN(cantidad) || cantidad <= 0) {
        alert("Por favor, ingrese una cantidad válida mayor a 0.")
    }else if (cantidad > librosDisponibles) {
        alert("Lo sentimos, no hay suficientes libros disponibles.")
    }else if (cantidad > 10) {
        alert("Por favor, ingrese una cantidad menor o igual a 10.")
    }
}while(isNaN(cantidad) || cantidad <= 0 || cantidad > 10)

function agregarAlCarrito(cantidad){

    librosEnCarrito += cantidad
    librosDisponibles -= cantidad

    alert(`Se han agregado ${cantidad} libros al carrito.`)
}

agregarAlCarrito(cantidad)

function simularCompra(){

    const precioTotal = librosEnCarrito * precioPorLibro
    alert(`El precio total de la compra es: $${precioTotal}`)
    librosEnCarrito = 0
    librosDisponibles = 10
}

simularCompra()
