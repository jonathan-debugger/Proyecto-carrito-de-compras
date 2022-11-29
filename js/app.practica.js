//Variables
const carrito= document.getElementById('carrito');
const curso= document.getElementById('lista-cursos');
const listaCurso= document.querySelector('#lista-carrito tbody');
const vaciarCarritoBTN= document.getElementById('vaciar-carrito');

eventListeners();
function eventListeners(){
    curso.addEventListener('click',comprarCurso);    
    carrito.addEventListener('click', borrarCurso);
    document.addEventListener('DOMContentLoaded',listarCursosLocalStorage);
    vaciarCarritoBTN.addEventListener('click',vaciarCarrito);
}

function comprarCurso(e){
    e.preventDefault;

    if(e.target.classList.contains('agregar-carrito')){
        const datCurso=e.target.parentElement.parentElement;
        leerDatosCurso(datCurso);
    }
}

function leerDatosCurso(datCurso){
    const infoCurso={
        img: datCurso.querySelector('img').src,
        titulo: datCurso.querySelector('h4').textContent,
        precio: datCurso.querySelector('.precio span').textContent,
        id: datCurso.querySelector('a').getAttribute('data-id')
    }
    agregarDatosCurso(infoCurso);
}

function agregarDatosCurso(dataCurso){
    let row=document.createElement('tr');
        row.innerHTML= `
            <td>
                <img src="${dataCurso.img}" whith=100>
            </td>
            <td>${dataCurso.titulo}</td>
            <td>${dataCurso.precio}</td>
            <td>
                <a href='#' data-id="${dataCurso.id}" class="borrar-curso">X</a>
            </td>     

          `;  
          listaCurso.appendChild(row);
          setCursoLocalSorage(dataCurso);

           

}

function borrarCurso(e){
    e.preventDefault();
    //Delegation
    if(e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove();
    }
    borrarCursoLocalStorage(e.target.getAttribute('data-id'))
}


function setCursoLocalSorage(dataCurso){
        const cursosLS= getCursoLocalStorage();
        cursosLS.push(dataCurso);
        localStorage.setItem('cursos',JSON.stringify(cursosLS));
}


function getCursoLocalStorage(){
    let cursosLS
    if(localStorage.getItem('cursos')===null){
        cursosLS=[];

    }else{
        cursosLS=JSON.parse(localStorage.getItem('cursos')); //convertimos el array, o a objeto javscript de cadena de texto a un objeto o array json
    }
    return cursosLS;
}

function borrarCursoLocalStorage(idCurso){
    const cursosLS=getCursoLocalStorage();
        cursosLS.forEach(function(curso,indice ){
            if(idCurso===curso.id){
                cursosLS.splice(indice,1);
                
            }
        });
        localStorage.setItem('cursos',JSON.stringify(cursosLS));
    }

    function listarCursosLocalStorage(){
            let cursosLS=JSON.parse(localStorage.getItem('cursos'));
            cursosLS.forEach(function(curso){
                let row=document.createElement('tr');
                row.innerHTML= `
                    <td>
                        <img src="${curso.img}" whith=100>
                    </td>
                    <td>${curso.titulo}</td>
                    <td>${curso.precio}</td>
                    <td>
                        <a href='#' data-id="${curso.id}" class="borrar-curso">X</a>
                    </td>     
        
                  `;  
                  listaCurso.appendChild(row);
            });

    }

    function vaciarCarrito(){

        while(listaCurso.firstChild){
            listaCurso.removeChild(listaCurso.firstChild);
    
        }
           localStorage.clear();
            return false; 
    }