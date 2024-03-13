<<<<<<< HEAD
import { tickets } from "../bd/tickets"
import { panel } from "./panel"

export const nuevoTicket = {
    template:  //html
    `
        <div class="container mx-auto p-5 w-75">
            <form action="" class="form p-3" id="form">
                <label for="codigoTicket" class="form-label">Código: </label>
                <input type="text" class="form-control mb-3" id="codigoTicket">

                <label for="fechaTicket" class="form-label">Fecha: </label>
                <input type="date" class="form-control mb-3" id="fechaTicket">

                <label for="aulaTicket" class="form-label">Aula: </label>
                <input type="text" class="form-control mb-3" id="aulaTicket">

                <label for="ordenadorTicket" class="form-label">Ordenador: </label>
                <input type="text" class="form-control mb-3" id="ordenadorTicket">

                <label for="descripcionTicket" class="form-label">Descripción: </label>
                <textarea class="form-control mb-3" id="descripcionTicket" rows="3"></textarea>

                <label for="alumnoTicket" class="form-label">Alumno: </label>
                <input type="text" class="form-control mb-3" id="alumnoTicket">

                <label for="grupoTicket" class="form-label">Grupo: </label>
                <input type="text" class="form-control mb-3" id="grupoTicket">

                <div class="text-end mt-5">
                    <button id="btnAnadirTicket" class="btn btn-primary me-2">Añadir ticket</button>
                    <button id="btnSalir" class="btn btn-secondary ml-2">Volver atrás</button>
                </div>
            </form>

        </div>
    `,

    script : ()=>{
        document.querySelector('#btnAnadirTicket').addEventListener('click', (e) => {
            e.preventDefault()
            console.log('holaa');
    
            const codigo =  parseInt(document.querySelector('#codigoTicket').value)
            const aula = document.querySelector('#aulaTicket').value
            const ordenador = document.querySelector('#ordenadorTicket').value
            const descripcion = document.querySelector('#descripcionTicket').value
            const alumno = document.querySelector('#alumnoTicket').value
            const grupo = document.querySelector('#grupoTicket').value
                
            let fecha = document.querySelector('#fechaTicket').value
            fecha = fecha.split('-')
            fecha = fecha[2] + '/' + fecha[1] + '/' + fecha[0] 
    
            const ultimoId = tickets.length > 0 ? tickets[tickets.length - 1].id : 0

            const ticket = {
                id: ultimoId + 1,
                codigo,
                fecha,
                aula,
                grupo,
                ordenador,
                descripcion,
                alumno,
                status: 0,
            }
            console.log(ticket);
            tickets.push(ticket)
            console.log(tickets);
    
            document.querySelector('main').innerHTML= panel.template
            panel.script()
        })

        document.querySelector('#btnSalir').addEventListener('click', (e) => {
            e.preventDefault()
            document.querySelector('main').innerHTML= panel.template;
            panel.script()
        })
    } 
}
=======
import { tickets } from "../bd/tickets"
import { panel } from "./panel"

export const nuevoTicket = {
    template:  //html
    `
        <div class="container mx-auto p-5 w-75">
            <form action="" class="form p-3" id="form">
                <label for="codigoTicket" class="form-label">Código: </label>
                <input type="text" class="form-control mb-3" id="codigoTicket">

                <label for="fechaTicket" class="form-label">Fecha: </label>
                <input type="date" class="form-control mb-3" id="fechaTicket">

                <label for="aulaTicket" class="form-label">Aula: </label>
                <input type="text" class="form-control mb-3" id="aulaTicket">

                <label for="ordenadorTicket" class="form-label">Ordenador: </label>
                <input type="text" class="form-control mb-3" id="ordenadorTicket">

                <label for="descripcionTicket" class="form-label">Descripción: </label>
                <textarea class="form-control mb-3" id="descripcionTicket" rows="3"></textarea>

                <label for="alumnoTicket" class="form-label">Alumno: </label>
                <input type="text" class="form-control mb-3" id="alumnoTicket">

                <label for="grupoTicket" class="form-label">Grupo: </label>
                <input type="text" class="form-control mb-3" id="grupoTicket">

                <div class="text-end mt-5">
                    <button id="btnAnadirTicket" class="btn btn-primary me-2">Añadir ticket</button>
                    <button id="btnSalir" class="btn btn-secondary ml-2">Volver atrás</button>
                </div>
            </form>

        </div>
    `,

    script : ()=>{
        document.querySelector('#btnAnadirTicket').addEventListener('click', (e) => {
            e.preventDefault()
            console.log('holaa');
    
            const codigo =  parseInt(document.querySelector('#codigoTicket').value)
            const aula = document.querySelector('#aulaTicket').value
            const ordenador = document.querySelector('#ordenadorTicket').value
            const descripcion = document.querySelector('#descripcionTicket').value
            const alumno = document.querySelector('#alumnoTicket').value
            const grupo = document.querySelector('#grupoTicket').value
                
            let fecha = document.querySelector('#fechaTicket').value
            fecha = fecha.split('-')
            fecha = fecha[2] + '/' + fecha[1] + '/' + fecha[0] 
    
            const ultimoId = tickets.length > 0 ? tickets[tickets.length - 1].id : 0

            const ticket = {
                id: ultimoId + 1,
                codigo,
                fecha,
                aula,
                grupo,
                ordenador,
                descripcion,
                alumno,
                status: 0,
            }
            console.log(ticket);
            tickets.push(ticket)
            console.log(tickets);
    
            document.querySelector('main').innerHTML= panel.template
            panel.script()
        })

        document.querySelector('#btnSalir').addEventListener('click', (e) => {
            e.preventDefault()
            document.querySelector('main').innerHTML= panel.template;
            panel.script()
        })
    } 
}
>>>>>>> ca80d0a550b8553221366e7eb46defe68135c143
