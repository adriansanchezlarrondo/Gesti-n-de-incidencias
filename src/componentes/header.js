import { login } from "../vistas/login"
import { panel } from "../vistas/panel"
import { registro } from "../vistas/registro"

export const header = {
    template: // html
    `
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand">Gestión de incidencias FPLLEFIA</a>
        <div>
          <button id="login" class="btn btn-secondary ms-2">LOGIN</button>
          <button id="registro" class="btn btn-secondary ms-2">REGISTRO</button>
        </div>
        <div>
          <button id="cierreSesion" class="btn btn-secondary ms-2 me-2 d-none">CERRAR SESIÓN</button> 
          <span id="correo">administrador@fpllefia.com</span>
        </div>
      </div>
    </nav>
    `,
    script: () => {
      const usuarios = []

      const usuRegistrado = {
        nombre: "Adrian",
        apellido: "Sanchez",
        mail: "adrian@gmail.com",
        pass: "adri",
        log: 0,
        rol: ''
      }

      usuarios.push(usuRegistrado)
      localStorage.setItem("usuarios", JSON.stringify(usuarios))
      
      // Cargar vista panel si esta logueado o no
      // let usuariosGuardados = localStorage.getItem("usuarios")
      // usuariosGuardados = JSON.parse(usuariosGuardados)

      for(let i=0 ; i < usuariosGuardados.length ; i++){
        if(usuariosGuardados[i].isLogin == 1){
          document.querySelector('main').innerHTML = panel.template
          document.querySelector('#correo').innerHTML = usuariosGuardados[i].mail
          panel.script()
        }
      }

      document.querySelector('#login').addEventListener('click', () => {
          document.querySelector('main').innerHTML = login.template
          login.script()
      })

      document.querySelector('#registro').addEventListener('click', () => {
          document.querySelector('main').innerHTML = registro.template
          registro.script()
      })
    }
}