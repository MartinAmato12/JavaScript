
 const lista = document.getElementById('listado');

 fetch('../json/data.json')
     .then((response) => response.json())
     .then((data) => {
         data.forEach((producto) => {
             const li = document.createElement('li');
             li.innerHTML = `
                 <h4>${producto.nombre}</h4>
                 <p>${producto.precio}</p>
             `
             lista.appendChild(li);
         })
     })

const carrito = [];
function renderizarProductos(){

    const tienda = document.getElementById('tienda');  

    // Botones de filtro
    const btnFiltros = [
        'Mayor precio', 
        'Menor precio', 
        'Alfabeticamente', 
        'Mas vendidos', 
        'Por Año',
        'Descuentos'];

    // Crear botones en el html 

    const divContainer = document.createElement('div');
    divContainer.classList.add('container', 'text-center');

    btnFiltros.forEach((btn)=> {
        
        const boton = document.createElement('button');
        boton.textContent = btn;
        boton.classList.add('btn', 'btn-primary', 'm-2');

        tienda.appendChild(boton);
    })

    // Creacion
    const btnMayorPrecio = document.querySelector('button:nth-child(1)');
    btnMayorPrecio.addEventListener('click', ()=>{
        
        const product = BBDD.sort((a,b)=> b.precio - a.precio);

        console.log(product);

        tienda.innerHTML = '';

        product.forEach((e)=>{
            
            console.log(e);
            const div = document.createElement('div');

            div.classList.add('col-12');
            div.classList.add('col-md-4');
            div.classList.add('mb-5');
            div.classList.add('d-flex');
            div.classList.add('justify-content-center');

            div.innerHTML = `
            <div class="card text-dark" style="width: 18rem;">
            <img class="card-img-top" src="${e.img}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${e.nombre}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <p>${e.precio}€</p>
                <button class="btn btn-primary" id="${e.id}">Añadir al carrito</button>
            </div>
            </div>
        `
            div.querySelector('button').addEventListener('click', ()=>{
                agregarProductosAlCarrito(e.id);
            
            })

            tienda.appendChild(div);
        })

    })


    BBDD.forEach((p)=> {
        
        let producto = document.createElement('div');
        producto.classList.add('col-12');
        producto.classList.add('col-md-4');
        producto.classList.add('mb-5');
        producto.classList.add('d-flex');
        producto.classList.add('justify-content-center');

        producto.innerHTML = `
        <div class="card text-dark" style="width: 18rem;">
            <img class="card-img-top" src="${p.img}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${p.nombre}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <p>${p.precio}€</p>
                <button class="btn btn-primary" id="${p.id}">Añadir al carrito</button>
            </div>
        </div>
        `

        tienda.appendChild(producto);

        producto.querySelector('button').addEventListener('click', ()=>{
            
            agregarProductosAlCarrito(p.id);
            
        })

    })

}


renderizarProductos();

function agregarProductosAlCarrito(id){
    
    let producto = BBDD.find(producto => producto.id === id);

    let productoEnCarrito = carrito.find(producto => producto.id === id);

    if(productoEnCarrito){
        
        productoEnCarrito.cantidad++;

        console.log(carrito);

        alert(`La cantidad del producto ${producto.nombre} fue modificada`);

    }else {
        
        producto.cantidad = 1;

        carrito.push(producto);

        console.log(carrito);

        alert('Producto agregado correctamente al carrito')
    }

    renderizarCarrito();
    calcularTotal();
}

function renderizarCarrito(){

    const d = document;
    let carritoHTML = d.querySelector('#carrito');

    carritoHTML.innerHTML = '';

    carrito.forEach((p, index)=> {
    
        let producto = document.createElement('div');
        producto.classList.add('col-12');
        producto.classList.add('col-md-4');
        producto.classList.add('mb-5');
        producto.classList.add('d-flex');
        producto.classList.add('justify-content-center');

        producto.innerHTML = `
        
        <div class="card text-dark" style="width: 18rem;">
            <img class="card-img-top" src="${p.img}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${p.nombre}</h5>
                <p>${p.precio}€</p>
                <p>Cantidad: ${p.cantidad}</p>
                <button class="btn btn-danger">Eliminar</button>
            </div>
        </div>
        `

        producto.querySelector('button').addEventListener('click', ()=>{
        
            eliminarProductoDelCarrito(index)
        })

        carritoHTML.appendChild(producto);
    })
}

function eliminarProductoDelCarrito(indice){

    carrito[indice].cantidad--;
    alert(`La cantidad del producto ${carrito[indice].nombre} disminuyo`);

    if(carrito[indice].cantidad === 0){

        carrito.splice(indice,1);
        alert('El producto fue eliminado del carrito');
    }

    renderizarCarrito();
    calcularTotal()
}

function calcularTotal(){

    let total = 0;

    carrito.forEach((p)=>{
    
        total += p.precio * p.cantidad;
    })

    console.log(total);

    const t = document.getElementById('total');

    t.innerHTML = `<h5>${total}€</h5>`

}


const btn = document.querySelector('button');

function random(number) {
  return Math.floor(Math.random() * (number+1));
}

btn.addEventListener('click', () => {
  const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  document.body.style.backgroundColor = rndCol;
});


