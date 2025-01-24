let precioTotal = document.querySelector("#precio-total");
let comprarBtn = document.querySelector("#comprar-btn");
let horizontalDeck = document.querySelector("#card-horizontal-deck");
let listaDeProductos = document.querySelector("#lista-de-productos");
let carritoVacio = document.querySelector("#carrito-vacio");
let preciosInd = horizontalDeck.querySelectorAll(".price");

fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then(console.log);

//Añadir productos dinámicamente y filtrar
fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((data) => {
    data.products.forEach((element) => {
      let nuevoProducto = document.createElement("div");
      nuevoProducto.innerHTML = `<div class="card h-100 w-40 ${element.category}" style="width: 18rem">
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

    // Añadir producto al carrito

    let totalPrecioConsola = 0;

    listaDeProductos.addEventListener("click", (e) => {
      let boton = e.target;
      if (boton.matches(".add-to-card")) {
        carritoVacio.remove();
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
                          <h6 class="price">${price}</h6>
                        </div>
                        <i
                          class="bi bi-trash3 fs-4 text-white bg-secondary rounded-circle d-flex justify-content-center align-items-center p-4 eliminar-btn"
                          style="width: 2rem; height: 2rem"
                        ></i>
                      </div>`;
          horizontalDeck.appendChild(newCard);
          Swal.fire({
            title: `${title} se ha añadido!`,
            icon: "success",
            draggable: true,
          });

          console.log(price);
          totalPrecioConsola += Number(price);
          console.log(
            "El precio total ahora es de " + totalPrecioConsola.toFixed(2)
          );
          precioTotal.innerText = `${totalPrecioConsola}`;
        }
      }
    });

    let card = horizontalDeck.querySelector(".card");

    if (card) {
      console.log("A card is in the deck!");
    } else {
      console.log("No cards in the deck");
    }

    //Filtrar

    let filtrarBtn = document.querySelector("#filtrar-btn");
    let opcionesFiltrar = document.querySelector("#opciones-filtrar");

    filtrarBtn.addEventListener("click", (e) => {
      let filtro = parseInt(opcionesFiltrar.value, 10);
      let cartas = listaDeProductos.querySelectorAll(".card");

      cartas.forEach((element) => {
        if (filtro === 1) {
          containsCard(element, "beauty");
        } else if (filtro === 2) {
          containsCard(element, "fragrances");
        } else if (filtro === 3) {
          containsCard(element, "furniture");
        } else if (filtro === 4) {
          containsCard(element, "groceries");
        } else {
          element.classList.remove("hidden");
        }
      });
    });

    function containsCard(element, type) {
      if (!element.classList.contains(type)) {
        element.classList.add("hidden");
      } else {
        element.classList.remove("hidden");
      }
    }
  })

  .catch((error) => console.error("Error fetching data:", error))
  .finally(() => console.log("El proceso ha acabado."));

//Eliminar productos de la cesta dinamicamente
horizontalDeck.addEventListener("click", (e) => {
  if (e.target.matches(".eliminar-btn")) {
    let eliminar = e.target.closest(".card");
    if (eliminar) {
      eliminar.remove();

      let card = horizontalDeck.querySelector(".card");

      if (card) {
        console.log("A card is in the deck!");
      } else {
        console.log("No cards in the deck");

        horizontalDeck.innerHTML = `<div class="d-flex flex-column align-items-center" id="carrito-vacio">

                  <div class="bg-info p-5 mt-4 d-flex flex-column align-items-center rounded-2 ">

                    <i class="bi bi-basket2-fill" style="font-size: 5rem; color: rgb(255, 255, 255);"></i>
                  <br>
                  <h4 class="text-white">Su carrito está vacío!</h4>
                  </div>

                </div>`;
      }
    }
  }
});

comprarBtn.addEventListener("click", (e) => {
  Swal.fire({
    title: "¿Quiere confirmar la compra?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, comprar!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Comprado!",
        text: "Ha realizado su pago",
        icon: "success",
      });
    }
  });
});
