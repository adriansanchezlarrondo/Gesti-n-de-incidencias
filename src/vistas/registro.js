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
      const nombre = document.querySelector('#nombre')
      const apellidos = document.querySelector('#apellidos')
      const email = document.querySelector('#email')
      const password = document.querySelector('#password')


      document.querySelector('#enviar').addEventListener('click', (event) => {
        event.preventDefault()
        const nombreValue = nombre.value
        const apellidosValue = apellidos.value
        const emailValue = email.value
        const passwordValue = password.value

        if(!nombreValue || !apellidosValue || !emailValue || !passwordValue){
          return alert('Complete todos los campos del registro')
        }

        const roles = ['alumno', 'profesor', 'administrador']
        const random = Math.floor(Math.random() * roles.length)
        console.log('rol registrado', roles[random])

        const usuariosLocalStorage = localStorage.getItem('usuarios')

        if (usuariosLocalStorage) {
          usuariosLocalStorage = JSON.parse(usuariosLocalStorage)
        } else {
          usuariosLocalStorage = []
        }

        const usuRegistrado = {
          nombre: nombreValue + ' ' + apellidosValue,
          email: emailValue,
          pass: passwordValue,
          login: 0,
          rol: roles[random],
        }


        if (usuariosLocalStorage.length == 0){
          usuariosLocalStorage.push(usuRegistrado)
          localStorage.setItem('usuarios', JSON.stringify(usuariosLocalStorage))
          document.querySelector('main').innerHTML = login.template
          login.script()
        } else {
          usuariosLocalStorage.forEach(item => {
            if (item.email != emailValue){
              usuariosLocalStorage.push(usuRegistrado)
              localStorage.setItem('usuarios', JSON.stringify(usuariosLocalStorage))
              document.querySelector('main').innerHTML = login.template
              login.script()    
            } else {
              alert('Este mail ya esta registrado')
            }
          })
        }
      })
    }
}