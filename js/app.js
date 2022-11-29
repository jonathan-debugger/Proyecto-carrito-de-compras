
// Variables
const carrito  = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBTN = document.getElementById('vaciar-carrito');


// Listeners

cargarEventListeners();
function cargarEventListeners(){
    // Dispara cuando  se presiona "Agregar Carrito"
    cursos.addEventListener('click',comprarCurso);
    
    //cuando se  elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Al vaciar el carrito 
    vaciarCarritoBTN.addEventListener('click', vaciarCarrito);
    
    //AL cargar documento, mostrar local storage
document.addEventListener('DOMContentLoaded',leerLocalStorage);
}



// Funciones
// Funcion que añade el curso al carrito

function comprarCurso(e) {
    e.preventDefault();
    
    //Delegation para agregar-carrito
    if(e.target.classList.contains('agregar-carrito')){
            const curso = e.target.parentElement.parentElement;
           //Enviamos el curso seleccionado para tomar sus datos
            leerDatosCurso(curso);

    }
}
//Lee los datos del curso

function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id:     curso.querySelector('a').getAttribute('data-id')

    }
    insertarCarrito(infoCurso);
}


//Muestra el  curso selccionado el en carrito
function insertarCarrito(curso){
    const row = document.createElement('tr');
          row.innerHTML =  `
            <td>
                <img src="${curso.imagen}" width=100>
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
            `;

            listaCursos.appendChild(row);    
            guardarCursoLocalStorage(curso);  
            
}

// Elimina el curso del  carito en el DOM
function eliminarCurso(e){
    e.preventDefault();

    let curso,cursoId;
    //Delegation
    if(e.target.classList.contains('borrar-curso')){
          e.target.parentElement.parentElement.remove() 
          curso = e.target.parentElement.parentElement; 
          cursoId = curso.querySelector('a').getAttribute('data-id');

    }
    eliminarCursoLocalStorage(cursoId);
}



function vaciarCarrito(){
    // forma lenta
    //listaCursos.innerHTML ='';  

    //forma rapida(recomendada)
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);

    }
    //vaciar carrito local storage
    vaciarLocalStorage(); 

    return false;   
}

//Almacena  cursos en el  carrito al local Storage

function guardarCursoLocalStorage(curso){
    let cursos;
        cursos= obtenerCursosLocalStorage();
        //El curso seleccionado se agrega al arreglo   
        cursos.push(curso);  
        localStorage.setItem('cursos',JSON.stringify(cursos));

}

//COmprueba que  haya elementos  en local storage
function obtenerCursosLocalStorage(){
    let cursosLS;

    //Comprobamos si hay algo en localStorage

    if(localStorage.getItem('cursos') === null){
        cursosLS=[];
    }else{
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }

    return cursosLS;
}

//Imprime los cursos de local storage

function leerLocalStorage(){
    let cursosLS;
    cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach(function(curso) {

         //Construir el template
         const row = document.createElement('tr');
         row.innerHTML =  `
           <td>
           <img src="${curso.imagen}" width=100>
           </td>
           <td>${curso.titulo}</td>
           <td>${curso.precio}</td>
           <td>
               <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
           </td>
           `;

           listaCursos.appendChild(row); 

        
    });
}

//Elimina el curso por el ID en Local Storage


function eliminarCursoLocalStorage(curso){          
    let cursosLS;
    //obtenemos el arraglo de cursos
    cursosLS = obtenerCursosLocalStorage();
    //Iteramos comprando el  id del curso borrando con los del LS
    cursosLS.forEach(function(cursoLS,index){
        if(cursoLS.id===curso){
            cursosLS.splice(index,1);

        }
    });
    //Añadimos el arreglo  actual a storage
    localStorage.setItem('cursos', JSON.stringify(cursosLS));
}

//Elimina todos los curos del  local storage

function vaciarLocalStorage(){
    localStorage.clear();
}

