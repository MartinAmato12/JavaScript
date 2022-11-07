//guardar local storage
const guardarCarritoEnStoraje = (carrito) => {
    localStorage.setItem("main", JSON.stringify(carrito));
};

//informacion alojada en el storage
const obtenerCarritoDeStoraje = () => {
    const carritoStoraje = JSON.parse(localStorage.getItem("main"));
    return carritoStoraje;
};
export { guardarCarritoEnStoraje , obtenerCarritoDeStoraje }