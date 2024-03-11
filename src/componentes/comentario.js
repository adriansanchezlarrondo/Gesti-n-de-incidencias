export const comentario = (nombre,fecha,comentario) => {
    const template = // html
    `
    <div class="card p-3 m-2">
        <h5 class="text-end">Autor: <span id="nombre">${nombre}</span><span id="fecha" class="ms-4">${fecha}</span></h5>
        <p id="comentario">${comentario}</p>
    </div>
    `

    return template
}