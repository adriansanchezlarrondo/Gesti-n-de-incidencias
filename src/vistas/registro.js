import { login } from "./login"

export const registro = {
    template: // html
    `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
          <h1 class="text-center mb-4 fw-light">Registro</h1>
          <div class="card rounded-0">
            <div class="card-body">
              <form action="proyecto.html">
                <div class="mb-3">
                  <label for="nombre" class="form-label">Nombre:</label>
                  <input type="text" class="form-control rounded-0" id="nombre">
                </div>
                <div class="mb-3">
                  <label for="apellidos" class="form-label">Apellidos:</label>
                  <input type="text" class="form-control rounded-0" id="apellidos">
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email:</label>
                  <input type="email" class="form-control rounded-0" id="email">
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Contraseña:</label>
                  <input type="password" class="form-control rounded-0" id="password">
                </div>
                <button id="enviar" type="submit" class="btn btn-primary rounded-0 w-100">Enviar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    `,
    script: () => {
      const email = document.querySelector('#email')
      const password = document.querySelector('#password')


      document.querySelector('#enviar').addEventListener('click', (event) => {
        event.preventDefault()
        const emailValue = email.value
        const passwordValue = password.value

        let usuariosGuardados = localStorage.getItem("usuarios")

        if (!usuariosGuardados) {
          usuariosGuardados = [];
        } else {
          usuariosGuardados = JSON.parse(usuariosGuardados);
        }

        let existe = false 
        for (let i = 0; i < usuariosGuardados.length; i++) {
          if (emailValue === usuariosGuardados[i].mail) {
            existe = true
            i = usuariosGuardados.length
          }
        }
        
        if (!existe) {
          usuariosGuardados.push({
            mail: emailValue,
            pass: passwordValue,
            isLogin: 0
          });
          alert('Usuario registrado con éxito')
          document.querySelector('main').innerHTML = login.template
          login.script()
        } else {
          alert('Usuario ya registrado.')
          document.querySelector('main').innerHTML = registro.template
          registro.script()
        }

        
        // Guardamos en localstorage
        localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados))
      })
    }

}