import { bdComentarios } from "../bd/bd.js"
import { comentarios } from "../componentes/comentarios.js"
import { panel } from "./panel.js"

export const vistaComentarios = {
    template:
    `
    <div class="d-flex">
        <h1>Comentarios</h1><button id="btnVolver" class="btn btn-link ms-auto"> < Volver</button>
    </div>

    <h2 class="my-4">Código ticket: <span>123456</span></h2>
    <div class="">
      <form action="" class="form card p-3 shadow">
        <label for="comentario" class="form-label">Comentario: </label>
        <textarea id="coment" class="form-control" col="3"></textarea>
        <label for="fecha" class="form-label me-2 mt-3">Fecha: </label>
        <div class="d-flex align-items-center">
          <input id="fecha" type="datetime-local" class="form-control w-25">
          <button id="btnAñadir" class="btn btn-success ms-auto">Añadir comentario</button>
        </div>
      </form>

      <div id="comentarios" class="card mt-4 p-2 shadow"></div>
    </div>
    `,
    script: () => {
        console.log('Hola desde la vistaComentarios')
        comentarios()

        document.querySelector('#btnAñadir').addEventListener('click', (event) => {
          event.preventDefault()
  
          const comentarioInput = document.querySelector('#coment').value
          const fechaInput = document.querySelector('#fecha').value
          const autor = document.querySelector('#correo').innerHTML
          console.log(autor);
  
          const fechaArray = fechaInput.split('T')[0].split('-')
          const fechaFormateada = `${fechaArray[2]}/${fechaArray[1]}/${fechaArray[0]}`
  
          const nuevoComentario = {
              autor: autor,
              fecha: fechaFormateada,
              comentario: comentarioInput
          }
  
          bdComentarios.push(nuevoComentario)
          comentarios()

          document.querySelector('#coment').value = ''
          document.querySelector('#fecha').value = ''
        })
    
        document.querySelector('#btnVolver').addEventListener('click', (event) => {
          event.preventDefault()
          document.querySelector('main').innerHTML= panel.template;
          panel.script()
        })
    }
}