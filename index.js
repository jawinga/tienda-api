let filtrarBtn = document.querySelector("#filtrar-btn");
let opcionesFiltrar = document.querySelector("#opciones-filtrar");
let precioTotal = document.querySelector("#precio-total");
let comprarBtn = document.querySelector("#comprar-btn");
let horizontalDeck = document.querySelector("#card-horizontal-deck");
let listaDeProductos = document.querySelector("#lista-de-productos");

fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then(console.log);

//Añadir productos dinámicamente
fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((data) => {
    data.products.forEach((element) => {
      let nuevoProducto = document.createElement("div");
      nuevoProducto.innerHTML = `<div class="card" style="width: 18rem">
                <img
                  class="card-img-top"
                  src="${element.images[0]}"  // Use the first image
                  alt="${element.title}"
                />
                <div class="card-body">
                  <h5 class="card-title">${element.title}</h5>
                  <p class="card-text">
                    ${element.price}
                  </p>
                  <a href="#" data-title = "${element.title}" 
                  data-price = "${element.price}"
                  data-image = "${element.images[0]}"
                  class="btn btn-primary add-to-card"
                    >Añadir al carrito</a
                  >
                </div>
              </div>`;
      listaDeProductos.appendChild(nuevoProducto);
    });

    listaDeProductos.addEventListener("click", (e) => {
      let boton = e.target;
      if (boton.matches(".add-to-card")) {
        let card = e.target.closest(".card");

        if (card) {
          let newCard = document.createElement("div");
          let title = boton.dataset.title;
          let price = boton.dataset.price;
          let image = boton.dataset.image;

          newCard.innerHTML = `<div
                        class="card d-flex justify-content-around flex-row align-items-center bg-white my-3 py-2 align-items-center card-basket"
                      >
                        <img
                          src="${image}"
                          class="card-img-left img-thumbnail"
                          style="width: 100px"
                        />
                        <div class="d-flex flex-column">
                          <h5>${title}</h5>
                          <h6>${price}</h6>
                        </div>
                        <i
                          class="bi bi-trash3 fs-4 text-white bg-secondary rounded-circle d-flex justify-content-center align-items-center p-4 eliminar-btn"
                          style="width: 2rem; height: 2rem"
                        ></i>
                      </div>`;
          horizontalDeck.appendChild(newCard);
        }
      }
    });
  })

  // Añadir producto al carrito

  .catch((error) => console.error("Error fetching data:", error))
  .finally(() => console.log("El proceso ha acabado."));

//Eliminar productos de la cesta dinamicamente
horizontalDeck.addEventListener("click", (e) => {
  if (e.target.matches(".eliminar-btn")) {
    let eliminar = e.target.closest(".card");
    if (eliminar) {
      eliminar.remove();
    }
  }
});
