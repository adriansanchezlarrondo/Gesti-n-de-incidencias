import { tickets } from "../bd/tickets"
import { vistaComentarios } from "../vistas/vistaComentarios";

// meto mi bd ticket en una bd ficticia
let datosDB = tickets

export function Resolver (e, ticketsPendientes, ticketsResueltos){
    e.preventDefault()
    const divTicket = e.target.closest('.ticket')
    const idTicket = divTicket.dataset.ticketid

    let bdTicketPendientes = datosDB.filter((item) => item.id != idTicket && item.status == 0)
    let bdTicketResueltos = datosDB.filter((item) => item.id == idTicket || item.status == 1)

    let tablaPendiente = ''
    let tablaResuelto = ''

    bdTicketPendientes.forEach(row => {
        tablaPendiente += `
        <tr data-ticketid=${row.id} class="ticket">
            <td>${row.codigo}</td>
            <td>${row.fecha}</td>
            <td>${row.aula}</td>
            <td>${row.grupo}</td>
            <td>${row.ordenador}</td>
            <td>${row.descripcion}</td>
            <td>${row.alumno}</td>
            <td><button id="btnResolver" class="btn btn-success" title="Resolver ticket">Resolver</button></td>
            <td><button id="btnEdit" class="btn btn-warning" title="Añadir comentario"><i class="bi  bi-pencil" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
            </button>
            </td>
            <td><button id="btnComment" class="btn btn-info" title="Ver comentarios"><i class="bi bi-chat-left-text"></i>
            </button></td>
            <td><button id="btnEliminar" class="btn btn-danger" title="Eliminar ticket"><i class="bi bi-trash3"></i>
            </i>
            </button></td>
        </tr>
        `
    })


    bdTicketResueltos.forEach(row => {
        if (!row.fecha_resuelto) {
            // Crear un nuevo objeto Date
            const fecha = new Date()

            // Obtener el día, el mes y el año
            const dia = fecha.getDate()
            const mes = fecha.getMonth() + 1 // Sumamos 1 porque los meses van de 0 a 11
            const año = fecha.getFullYear()

            // Formatear la fecha en el formato dd/mm/yyyy
            const fechaFormateada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${año}`

            row.fecha_resuelto = fechaFormateada
            row.status = 1
        }

        tablaResuelto += `
        <tr data-ticketid=${row.id} class="ticket">
            <td>${row.codigo}</td>
            <td>${row.fecha}</td>
            <td>${row.fecha_resuelto}</td>
            <td>${row.aula}</td>
            <td>${row.grupo}</td>
            <td>${row.ordenador}</td>
            <td>${row.descripcion}</td>
            <td>${row.alumno}</td>
            <td><button id="btnComment" class="btn btn-info" title="Ver comentarios"><i class="bi bi-chat-left-text"></i>
            </button></td>
            <td><button id="btnEliminar" class="btn btn-danger" title="Eliminar ticket"><i class="bi bi-trash3"></i>
            </i>
            </button></td>
        </tr>
        `
    })

    ticketsPendientes.innerHTML = tablaPendiente
    ticketsResueltos.innerHTML = tablaResuelto

    // Cuando resuelvas un elemento actualizamos la bd datosDB con la nueva base de datos
    datosDB = [...bdTicketPendientes, ...bdTicketResueltos]
}

export function Editar (e, ticketsPendientes){
    e.preventDefault()
    const divTicket = e.target.closest('.ticket')
    const idTicket = divTicket.dataset.ticketid
    
    let ticketEdit = datosDB.find(ticket => ticket.id == idTicket)
    console.log('ticket a editar', ticketEdit)

    
    let modal = document.querySelector('#exampleModal')
    modal.classList.add('show')
    modal.style.display='block'
    if (ticketEdit) {

        ticketEdit.fecha = ticketEdit.fecha.split('/'); // Dividir la fecha en partes: día, mes, año
        ticketEdit.fecha = ticketEdit.fecha[2] + '-' + ticketEdit.fecha[1] + '-' + ticketEdit.fecha[0]; // Construir la fecha en formato "YYYY-MM-DD"

        // Añadimos en los inputs los valores del objeto
        document.querySelector('#codigo').value = ticketEdit.codigo
        document.querySelector('#fecha').value = ticketEdit.fecha
        document.querySelector('#aula').value = ticketEdit.aula
        document.querySelector('#ordenador').value = ticketEdit.ordenador
        document.querySelector('#descripcion').value = ticketEdit.descripcion
        document.querySelector('#alumno').value = ticketEdit.alumno
        document.querySelector('#grupo').value = ticketEdit.grupo
        
        
        document.querySelector('#btnGuardar').addEventListener('click', (e) => {
            e.preventDefault()

            // Reconvierto el formato de la fecha para guardarlo en el array
            let fecha = document.querySelector('#fecha').value
            fecha = fecha.split('-'); // Dividir la fecha en partes: día, mes, año
            fecha = fecha[2] + '/' + fecha[1] + '/' + fecha[0]; // Construir la fecha en formato "DD/MM/YYYY"

            const idTicketEditado = datosDB.findIndex(ticket => ticket.id == idTicket)

            
            datosDB[idTicketEditado] = {
                id: parseInt(idTicket),
                codigo: parseInt(document.querySelector('#codigo').value),
                fecha: fecha,
                aula: document.querySelector('#aula').value,
                ordenador: document.querySelector('#ordenador').value,
                descripcion: document.querySelector('#descripcion').value,
                alumno: document.querySelector('#alumno').value,
                grupo: document.querySelector('#grupo').value,
                status: 0
            }
            console.log('Ticket ya editado', datosDB[idTicketEditado]);

            console.log('datosDB', datosDB)

            let bdTicketPendientes = datosDB.filter((item) => item.status == 0)
            let tablaPendiente = ''

            bdTicketPendientes.forEach(row => {
                tablaPendiente += `
                <tr data-ticketid=${row.id} class="ticket">
                    <td>${row.codigo}</td>
                    <td>${row.fecha}</td>
                    <td>${row.aula}</td>
                    <td>${row.grupo}</td>
                    <td>${row.ordenador}</td>
                    <td>${row.descripcion}</td>
                    <td>${row.alumno}</td>
                    <td><button id="btnResolver" class="btn btn-success" title="Resolver ticket">Resolver</button></td>
                    <td><button id="btnEdit" class="btn btn-warning" title="Añadir comentario"><i class="bi  bi-pencil" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                    </button>
                    </td>
                    <td><button id="btnComment" class="btn btn-info" title="Ver comentarios"><i class="bi bi-chat-left-text"></i>
                    </button></td>
                    <td><button id="btnEliminar" class="btn btn-danger" title="Eliminar ticket"><i class="bi bi-trash3"></i>
                    </i>
                    </button></td>
                </tr>
                `
            })
            ticketsPendientes.innerHTML = tablaPendiente

            // Cerrar el modal
            modal.classList.remove('show');
            modal.style.display = 'none';
        })

        document.querySelector('#btnCerrar').addEventListener('click', (e) => {
            e.preventDefault()
            // Cerrar el modal
            modal.classList.remove('show');
            modal.style.display = 'none';
        })
    }
}

export function Comentario (){
    document.querySelector('main').innerHTML = vistaComentarios.template
    vistaComentarios.script()
}

export function Eliminar (e, ticketsPendientes, ticketsResueltos){
    e.preventDefault()
    const divTicket = e.target.closest('.ticket')
    const idTicket = divTicket.dataset.ticketid

    let bdTicketPendientes = datosDB.filter((item) => item.id != idTicket && item.status == 0)
    let bdTicketResueltos = datosDB.filter((item) => item.id != idTicket && item.status == 1)

    let tablaPendiente = ''
    let tablaResuelto = ''

    bdTicketPendientes.forEach(row => {
        tablaPendiente += `
        <tr data-ticketid=${row.id} class="ticket">
            <td>${row.codigo}</td>
            <td>${row.fecha}</td>
            <td>${row.aula}</td>
            <td>${row.grupo}</td>
            <td>${row.ordenador}</td>
            <td>${row.descripcion}</td>
            <td>${row.alumno}</td>
            <td><button id="btnResolver" class="btn btn-success" title="Resolver ticket">Resolver</button></td>
            <td><button id="btnEdit" class="btn btn-warning" title="Añadir comentario"><i class="bi  bi-pencil" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
            </button>
            </td>
            <td><button id="btnComment" class="btn btn-info" title="Ver comentarios"><i class="bi bi-chat-left-text"></i>
            </button></td>
            <td><button id="btnEliminar" class="btn btn-danger" title="Eliminar ticket"><i class="bi bi-trash3"></i>
            </i>
            </button></td>
        </tr>
        `
    })


    bdTicketResueltos.forEach(row => {
        tablaResuelto += `
        <tr data-ticketid=${row.id} class="ticket">
            <td>${row.codigo}</td>
            <td>${row.fecha}</td>
            <td>${row.fecha_resuelto}</td>
            <td>${row.aula}</td>
            <td>${row.grupo}</td>
            <td>${row.ordenador}</td>
            <td>${row.descripcion}</td>
            <td>${row.alumno}</td>
            <td><button id="btnComment" class="btn btn-info" title="Ver comentarios"><i class="bi bi-chat-left-text"></i>
            </button></td>
            <td><button id="btnEliminar" class="btn btn-danger" title="Eliminar ticket"><i class="bi bi-trash3"></i>
            </i>
            </button></td>
        </tr>
        `
    })

    ticketsPendientes.innerHTML = tablaPendiente
    ticketsResueltos.innerHTML = tablaResuelto

    // Cuando resuelvas un elemento actualizamos la bd datosDB con la nueva base de datos
    datosDB = [...bdTicketPendientes, ...bdTicketResueltos]

}