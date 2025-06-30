    // A. Definimos nuestro array 
        const productos = [
              { id: 1, nombre: "Remera", precio: 3000, categoria: "ropa", imagen: "remera.jpg" },
              { id: 2, nombre: "Gorra", precio: 1500, categoria: "accesorios", imagen: "gorra.jpg" },
              { id: 3, nombre: "Zapatillas", precio: 8000, categoria: "calzado", imagen: "zapatillas.jpg" },
              { id: 4, nombre: "Buzo", precio: 6000, categoria: "ropa", imagen: "buzo.jpg" },
              { id: 5, nombre: "Mochila", precio: 3500, categoria: "accesorios", imagen: "mochila.jpg" }
            ];

        // B. Obtenemos el contenedor donde pondremos los divs
        const container = document.getElementById('articulo');

        // C. Recorreel array con "forEach" por cada elemento del array
        productos.forEach(productos => {
            // Crea un nuevo div para cada elemento
            const div = document.createElement("div");
            // Agrega la clase para el estilo del "div"
            div.className = 'card p-4 col-md-4 my-2';
            // Agrega contenido dentro del HTML con un titulo y el nombre del producto
            div.innerHTML = 
            `<div class="card h-100 ">
                <img src="${productos.imagen}" style="width:50%; margin: 0 auto;">
                <div class="card-body d-flex flex-column text-center">
                    <h5 class="card-title">${productos.nombre}</h5>
                    <p class="card-text">$${productos.precio}</p>
                    <button class="btn btn-primary mt-auto" onclick="agregarAlCarrito(${productos.id})">
                    <i class="bi bi-gift-fill"></i>
                        Agregar al carrito
                    </button>
                </div>
             </div>`;
            // Este fragmento de código agrega el div al contenedor principal
            container.appendChild(div);
        });
    
    // Variable para almacenar el contador del carrito
    let contadorCarrito = 0;
    // Array para almacenar los productos del carrito
    let carrito = [];
    // Función para agregar productos al carrito
    function agregarAlCarrito(idProducto) {
        // Buscar el producto en el array de productos
        const producto = productos.find(p => p.id === idProducto);
        if (producto) {
            // Incrementar el contador
            contadorCarrito++;
            // Actualizar el contador en el botón del carrito
            document.getElementById('contador').textContent = contadorCarrito;
            // Agregar el producto al carrito (o incrementar cantidad si ya existe)
            const productoEnCarrito = carrito.find(p => p.id === idProducto);
            if (productoEnCarrito) {
                productoEnCarrito.cantidad++;
            } else {
                carrito.push({...producto, cantidad: 1});
            }
            // Opcional: Mostrar notificación
            alert(`¡${producto.nombre} agregado al carrito!`);
            
        }
    }

 // Función para mostrar/ocultar el carrito
    document.getElementById('verCarrito').addEventListener('click', function() 
        {
            const carritoDiv = document.getElementById('carrito');
            // Alternamos la clase 'd-none' para mostrar u ocultar el carrito
            carritoDiv.classList.toggle('d-none');
            actualizarCarrito();
         })

// Obtenemos el elemento de la lista del carrito
const listaCarrito = document.getElementById("lista-carrito");
// Obtenemos el elemento del total
const totalSpan = document.getElementById("total");
// Obtenemos el elemento del contador
const contador = document.getElementById("contador");
// Evento para mostrar el carrito al hacer clic en el botón
function actualizarCarrito() 
    {  
        listaCarrito.innerHTML = "";
        let total = 0;
        carrito.forEach(productos =>  
            {
            // Creamos un nuevo elemento de lista
            const item = document.createElement("li"); 
            // Asignamos una clase para el estilo 
            item.className = "list-group-item d-flex justify-content-between lead";
            // Agregamos el nombre del producto y la cantidad 
            item.textContent = `${productos.nombre} x ${productos.cantidad}`; 
            const precio = document.createElement("span");
            // Calculamos el precio total por producto
            precio.textContent = `$${productos.precio * productos.cantidad}`; 
            item.appendChild(precio);
            listaCarrito.appendChild(item);
            // Sumamos el precio total de los productos al total general
            total += productos.precio * productos.cantidad; 
            }
            );  
        totalSpan.textContent = total;
        // Actualizamos el contador de productos en el carrito
        contador.textContent = carrito.reduce((sum, productos) => sum + productos.cantidad, 0); 
    }

 //Función para finalizar la compra y enviar mensaje por WhatsApp
    function finalizarCompra() 
        {
            if (carrito.length === 0) 
            {
                alert("El carrito está vacío");
                return;
            }
            // Calcular total
            const total = carrito.reduce((sum, productos) => sum + (productos.precio * productos.cantidad), 0);
            // Crear mensaje con los productos
            let mensaje = "¡Hola! Quiero realizar la siguiente compra:%0A%0A";
            carrito.forEach(productos => 
            {
                mensaje += `- ${productos.nombre} x ${productos.cantidad}: $${productos.precio * productos.cantidad}%0A`;
            });
            mensaje += `%0ATotal: $${total}%0A%0A Y proceder con el pago y coordinar envio`;
            // Número de teléfono (reemplaza con el número de tu tienda)
            const telefono = "5491149899407"; // Ejemplo: Argentina +54 9 11
            // Crear enlace de WhatsApp
            const urlWhatsApp = `https://wa.me/${telefono}?text=${mensaje}`;
            // Abrir en nueva pestaña
            window.open(urlWhatsApp, '_blank');
            // Opcional: Vaciar carrito después de enviar
            carrito = [];
            actualizarCarrito();
            document.getElementById('carrito').classList.add('d-none');
        }
          