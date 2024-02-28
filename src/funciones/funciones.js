import { tickets } from "../bd/tickets"

// meto mi bd ticket en una bd ficticia
let datosDB = tickets

export function Resolver (e, ticketsPendientes, ticketsResueltos){
    const divTicket = e.target.closest('.ticket')
    console.log('divTicket', divTicket);

    const idTicket = divTicket.dataset.ticketid

    let bdTicketPendientes = datosDB.filter((item) => item.id != idTicket && item.status == 0)
    console.log('bdTicketPendientes', bdTicketPendientes);
    let bdTicketResueltos = datosDB.filter((item) => item.id == idTicket || item.status == 1)
    console.log('bdTicketResueltos', bdTicketResueltos);

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

export function Editar (e, ticketsPendientes, ticketsResueltos){
    console.log('e.target.id', e.target.id)
}

export function Comentar (e, ticketsPendientes, ticketsResueltos){
    console.log('e.target.id', e.target.id)
}

export function Eliminar (e, ticketsPendientes, ticketsResueltos){
    const divTicket = e.target.closest('.ticket')
    console.log('divTicket', divTicket);

    const idTicket = divTicket.dataset.ticketid

    let bdTicketPendientes = datosDB.filter((item) => item.id != idTicket && item.status == 0)
    console.log('bdTicketPendientes', bdTicketPendientes);
    let bdTicketResueltos = datosDB.filter((item) => item.id != idTicket && item.status == 1)
    console.log('bdTicketResueltos', bdTicketResueltos);

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