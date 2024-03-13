import { bdComentarios } from "../bd/bd"
import { comentario } from "./comentario"

export const comentarios = () => {
    let html = ''

    bdComentarios.forEach(element => {
        html += comentario(element.autor,element.fecha,element.comentario)
    })

    document.querySelector('#comentarios').innerHTML = html
}