document.addEventListener('DOMContentLoaded', () => {
    fetchProductos()
})

const fetchProductos = async () => {
    try {
        const res = await fetch('productos.json')
        const productos = await res.json()
        mostrarArt(productos)
        detectarBotones(productos)
    } catch (error) {
        console.log(error)
    }
}
const articulos = document.getElementById('articulos')
const templateArt = document.getElementById('templateArt').content
const fragment = document.createDocumentFragment()
const mostrarArt = (productos) =>{
    //console.log(productos)
    productos.forEach(producto =>{
        templateArt.querySelector('h5').textContent = producto.nombre
        templateArt.querySelector('p').textContent = producto.precio
        templateArt.querySelector('img').setAttribute('src' , producto.imagen)
        templateArt.querySelector('.btn-success').dataset.id = producto.id
        const clone = templateArt.cloneNode(true)
        fragment.appendChild(clone)   
    })
    articulos.appendChild(fragment)
}
let carrito = {}

const detectarBotones = (data) => {
    const botones = document.querySelectorAll('.card button')

    botones.forEach(btn => {
        btn.addEventListener('click', () => {
            
            const producto = data.find(item => item.id === parseInt(btn.dataset.id))
            producto.cantidad = 1
            if (carrito.hasOwnProperty(producto.id)) {
                producto.cantidad = carrito[producto.id].cantidad + 1
            }
            carrito[producto.id] = { ...producto }
            
            pintarCarrito()
        })
    })
}

const items = document.getElementById('items')

const pintarCarrito = () => {

    const template = document.querySelector('#template-carrito').content
    const fragment = document.createDocumentFragment()

    Object.values(carrito).forEach(producto => {
        
        template.querySelector('th').textContent = producto.id
        template.querySelectorAll('td')[0].textContent = producto.title
        template.querySelectorAll('td')[1].textContent = producto.cantidad
        template.querySelector('span').textContent = producto.precio * producto.cantidad
        
        //botones
        template.querySelector('.btn-info').dataset.id = producto.id
        template.querySelector('.btn-danger').dataset.id = producto.id

        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    })

    items.appendChild(fragment)

    mostrarFooter()
    accionBotones()

}

const footer = document.querySelector('#footer-carrito')
console.log(footer)
const mostrarFooter = () => {

    footer.innerHTML = ''
console.log(footer)
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope='row' colspan='5'>Carrito vacío</th>
        `
        return
    }

    const template = document.querySelector('#template-footer').content
    const fragment = document.createDocumentFragment()

    // sumar cantidad y sumar totales
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)
   

    template.querySelectorAll('td')[0].textContent = nCantidad
    template.querySelector('span').textContent = nPrecio

    const clone = template.cloneNode(true)
    fragment.appendChild(clone)

    footer.appendChild(fragment)


    const boton = document.querySelector('#vaciar-carrito')
    boton.addEventListener('click', () => {
        swal({
            title: "Borrar carrito?",
            text: "Si da click en OK se cancelara su pedido",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Se vació su carrito con exito!", {
                icon: "success",})
              carrito = {}
              pintarCarrito();
            } else {
              swal("Puede continuar con su compra!");
            }
          });
        
    })

}

const accionBotones = () => {
    const botonesAgregar = document.getElementById('items .btn-info')
    const botonesEliminar = document.getElementById('items .btn-danger')


    botonesAgregar.forEach(btn => {
        btn.addEventListener('click', () => {
            const producto = carrito[btn.dataset.id]
            producto.cantidad ++
            carrito[btn.dataset.id] = { ...producto }
            pintarCarrito()
        })
    })

    botonesEliminar.forEach(btn => {
        btn.addEventListener('click', () => {
            const producto = carrito[btn.dataset.id]
            producto.cantidad--
            if (producto.cantidad === 0) {
                delete carrito[btn.dataset.id]
            } else {
                carrito[btn.dataset.id] = { ...producto }
            }
            pintarCarrito()
        })
    })
}