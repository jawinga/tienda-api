function calcularTotal() {
  let precioTotal = document.querySelector("#precio-total");
  let precioProducto = document.querySelectorAll(".precioProducto");

  let total = 0;

  precioProducto.forEach((element) => {
    total += parseFloat(element);
    console.log(total);
    precioTotal.innerText = total.toFixed(2);
  });
}
