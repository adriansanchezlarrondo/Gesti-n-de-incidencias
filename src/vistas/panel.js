import { tickets } from "../bd/tickets"
import { Comentario, Editar, Eliminar, Resolver } from "../funciones/funciones"
import { login } from "./login"
import { nuevoTicket } from "./nuevoTicket"

export const panel = {
    template: // html
    `
    <h1>Administración de incidencias</h1>
    <h2 id="pendientesH2" class="mt-5">Tickets pendientes</h2>

    <div class="text-end">
      <button id="btnNuevoTicket" class="btn btn-primary" title="Añadir ticket">Añadir ticket</button>
    </div>

    <table id="pendientesTable" class="table mt-4">
      <thead>
        <tr>
          <th>Código</th>
          <th>Fecha</th>
          <th>Aula</th>
          <th>Grupo</th>
          <th>Ordenador</th>
          <th>Descripción</th>
          <th>Alumno</th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody id="ticketsPendientes">
      </tbody>
    </table>

    <h2 id="resueltosH2" class="mt-5">Tickets resueltos</h2>
    <table id="resueltosTable" class="table mt-4">
      <thead>
        <tr>
          <th>Código</th>
          <th>Fecha</th>
          <th>Fecha resuelto</th>
          <th>Aula</th>
          <th>Grupo</th>
          <th>Ordenador</th>
          <th>Descripción</th>
          <th>Alumno</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody id="ticketsResueltos">
      </tbody>
    </table>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">

          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Editar ticket</h5>
            <button type="button" id="btnCerrar" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body">
            <form action="" class="form card p-3 shadow" id="form">
              <label for="codigoTicket" class="form-label">Código: </label>
              <input type="text" class="form-control mb-3" id="codigo">

              <label for="fecha" class="form-label">Fecha: </label>
              <input type="date" class="form-control mb-3" id="fecha">

              <label for="aula" class="form-label">Aula: </label>
              <input type="text" class="form-control mb-3" id="aula">

              <label for="ordenador" class="form-label">Ordenador: </label>
              <input type="text" class="form-control mb-3" id="ordenador">

              <label for="descripcion" class="form-label">Descripción: </label>
              <textarea class="form-control mb-3" id="descripcion" rows="3"></textarea>

              <label for="alumno" class="form-label">Alumno: </label>
              <input type="text" class="form-control mb-3" id="alumno">

              <label for="grupo" class="form-label">Grupo: </label>
              <input type="text" class="form-control mb-3" id="grupo">
            </form>
          </div>

          <div class="modal-footer">
            <button type="button" id="btnGuardar" class="btn btn-success">Guardar cambios</button>
          </div>

        </div>
      </div>
    </div>
    `,
    script: () => {
      let usuario = localStorage.getItem('usuarios')
      usuario = JSON.parse(usuario)
      console.log('usuario', usuario);
      const usuarioLogueado = usuario.find(usu => usu.login == 1)
      console.log('usuarioLogueado', usuarioLogueado);

      if (usuarioLogueado.rol == 'alumno') {
        document.querySelector('#pendientesH2').classList.add('d-none')
        document.querySelector('#pendientesTable').classList.add('d-none')
        document.querySelector('#resueltosH2').classList.add('d-none')
        document.querySelector('#resueltosTable').classList.add('d-none')
      }

      document.querySelector('#login').classList.add('d-none')
      document.querySelector('#registro').classList.add('d-none')
      document.querySelector('#cierreSesion').classList.remove('d-none')

      let ticketsPendientes = document.querySelector('#ticketsPendientes')
      let ticketsResueltos = document.querySelector('#ticketsResueltos')
      
      let tablaPendiente = ''
      let tablaResuelto = ''

      tickets.forEach(item =>{
        if(item.status == 0){
          tablaPendiente += `
          <tr data-ticketid=${item.id} class="ticket">
            <td>${item.codigo}</td>
            <td>${item.fecha}</td>
            <td>${item.aula}</td>
            <td>${item.grupo}</td>
            <td>${item.ordenador}</td>
            <td>${item.descripcion}</td>
            <td>${item.alumno}</td>
            <td><button id="btnResolver" class="btn btn-success" title="Resolver ticket">Resolver</button></td>
            <td>
              <button id="btnEdit" class="btn btn-warning" title="Añadir comentario">
              <i class="bi  bi-pencil" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
              </button>
            </td>
            <td>
              <button id="btnComment" class="btn btn-info" title="Ver comentarios">
              <i class="bi bi-chat-left-text"></i>
              </button>
            </td>
            <td>
              <button id="btnEliminar" class="btn btn-danger" title="Eliminar ticket">
              <i class="bi bi-trash3"></i>
              </button>
            </td>
          </tr>
          `
        } else {
          tablaResuelto += `
          <tr data-ticketid=${item.id} class="ticketResuelto">
            <td>${item.codigo}</td>
            <td>${item.fecha}</td>
            <td>${item.fecha_resuelto}</td>
            <td>${item.aula}</td>
            <td>${item.grupo}</td>
            <td>${item.ordenador}</td>
            <td>${item.descripcion}</td>
            <td>${item.alumno}</td>
            <td>
              <button id="btnComment" class="btn btn-info" title="Ver comentarios">
              <i class="bi bi-chat-left-text"></i>
              </button>
            </td>
            <td>
              <button id="btnEliminar" class="btn btn-danger" title="Eliminar ticket">
              <i class="bi bi-trash3"></i>
              </button>
            </td>
          </tr>
          `
        }
      })

      if(tablaPendiente != ''){
        ticketsPendientes.innerHTML = tablaPendiente
      }
      
      if(tablaResuelto != ''){
        ticketsResueltos.innerHTML = tablaResuelto
      }

      document.querySelector('body').addEventListener('click', (e) => {
          if(usuarioLogueado.rol == 'administrador') {
            // Completar tarea
            if(e.target.id == 'btnResolver'){
              Resolver(e, ticketsPendientes, ticketsResueltos)
            }

            // Editar tarea 
            if(e.target.id == 'btnEdit'){
              Editar(e, ticketsPendientes)
            }

            // Borrar tarea
            if(e.target.id == 'btnEliminar'){
              Eliminar(e, ticketsPendientes, ticketsResueltos)
            }
          }

          if(usuarioLogueado.rol == 'administrador' || usuarioLogueado.rol == 'profesor') {
            // Comentar tarea
            if(e.target.id == 'btnComment'){
              Comentario()
            }
          }
        })
        
      document.querySelector('#btnNuevoTicket').addEventListener('click', (e) => {
        e.preventDefault()
        console.log('hola');
        document.querySelector('main').innerHTML = nuevoTicket.template
        nuevoTicket.script()
      })

      document.querySelector('#cierreSesion').addEventListener('click' , (e) =>{
        e.preventDefault()        

        const correoLogueado = document.querySelector('#correo').innerHTML
        
        let usuariosGuardados = localStorage.getItem("usuarios")
        usuariosGuardados = JSON.parse(usuariosGuardados)

        const usuarioLogueadoEncontrado = usuariosGuardados.find(usuari => usuari.email == correoLogueado)
        const IDusuarioLogueadoEncontrado = usuariosGuardados.findIndex(usuari => usuari.email == correoLogueado)
        if(usuarioLogueadoEncontrado){
          usuariosGuardados[IDusuarioLogueadoEncontrado].login = 0
          localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados))
        }

        document.querySelector('main').innerHTML = login.template
        login.script()
        document.querySelector('#correo').innerHTML = ''
        document.querySelector('#cierreSesion').classList.add('d-none')
        document.querySelector('#login').classList.remove('d-none')
        document.querySelector('#registro').classList.remove('d-none')
      })
    }
}