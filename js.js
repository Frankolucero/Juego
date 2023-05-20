const contenedor = document.querySelector('.contenedor')

//definir medidas
const altoTablero = 300
const anchoTable = 570
const altoBloque=20
const anchoBloque=100 


//definir posicion usuario
const posicionInicialUsuario = [230, 10]
let posicionActualUsuario = posicionInicialUsuario

//definir posicion de la bola
const posicionInicialBola = [270, 40]
let posicionActualBola = posicionInicialBola

//definir particularidad de la bola
let xDireccionBola = 2
let yDireccionBola = 2
let diametro = 20
//definir timer

let timerID




//definir clase

class Bloque{
    constructor(ejeX, ejeY){
        this.bottonLeft = [ejeX, ejeY]
        this.bottonRight = [ejeX + anchoBloque, ejeY]
        this.topLeft = [ejeX, ejeY + altoBloque]
        this.topRight = [ejeX + anchoBloque, ejeY + altoBloque]
        



    }   
        


}


//definir todos los bloques
const bloques = [
    new Bloque (10, 250),
    new Bloque (120, 250),
    new Bloque (230, 250),
    new Bloque (340, 250),
    new Bloque (450, 250),
    new Bloque (10, 220),
    new Bloque (120, 220),
    new Bloque (230, 220),
    new Bloque (340, 220),
    new Bloque (450, 220),
    new Bloque (10, 190),
    new Bloque (120, 190),
    new Bloque (230, 190),
    new Bloque (340, 190),
    new Bloque (450, 190),
]
//funcion añadir bloques

function addBloques(){
    for(let i = 0; i < bloques.length; i++){
         const bloque = document.createElement('div')
         bloque.classList.add('bloque')
        bloque.style.left = bloques[i].bottonLeft[0] + 'px'
        bloque.style.bottom = bloques[i].bottonLeft[1] + 'px'
        contenedor.appendChild(bloque)

    }

}
//añadir bloquesa l uego
addBloques()

//definirusuario
function dibujarUsuario(){
    usuario.style.left = posicionActualUsuario [0] + 'px'
    usuario.style.bottom = posicionActualUsuario [1] + 'px'
}
//añadir usuario

const usuario = document.createElement('div')
usuario.classList.add('usuario')
contenedor.appendChild(usuario)
dibujarUsuario() 

//mover usuario tablero
function moverUsuario (e){
    switch(e.key){
        case 'ArrowLeft':
            if(posicionActualUsuario [0] > 0) {
                posicionActualUsuario[0] -= 10
                dibujarUsuario()
            } 

            break
        case 'ArrowRight':
            if(posicionActualUsuario[0] < (anchoTable - anchoBloque)){
                posicionActualUsuario[0] += 10
                dibujarUsuario()
            }
            break 
    }

}

//añadir evento escuchador para el documento

document.addEventListener('keydown', moverUsuario)


//dibujar laobla

function dibujarBola(){
    bola.style.left = posicionActualBola [0] + 'px'
    bola.style.bottom = posicionActualBola [1] + 'px'
    
}
const bola = document.createElement('div')
bola.classList.add('bola')
contenedor.appendChild(bola)
dibujarBola()

//moviemtn bola

function moverBola (){
    posicionActualBola[0] +=xDireccionBola
    posicionActualBola[1] +=yDireccionBola 
    dibujarBola()
    revisarColisiones()
}

timerID = setInterval (moverBola, 20)

//revision de colision 

function revisarColisiones(){
    //colision bloques
    for (let i = 0; i < bloques.length; i++){
        if( (posicionActualBola[0] > bloques[i].bottonLeft[0] && posicionActualBola[0] < bloques[i].bottonRight[0]) &&
        ((posicionActualBola[1] + diametro) > bloques[i].bottonLeft[1] && posicionActualBola[1] < bloques[i].topLeft[1])
    ){
        const todosLosBloques = Array.from(document.querySelectorAll('.bloque'))
        todosLosBloques[i].classList.remove('bloque')
        bloques.splice(i, 1)    
        cambiarDireccion()
        }
    }
    //colision paredes
    if(
        posicionActualBola[0] >= (anchoTable - diametro) ||
        posicionActualBola[1] >= (altoTablero - diametro) ||
        posicionActualBola[0] <= 0 ||
        posicionActualBola [1] <= 0
    ){
        cambiarDireccion()
    }

//revision colosion con el usuario
    if((posicionActualBola[0] > posicionActualUsuario[0] && posicionActualBola[0] < posicionActualUsuario [0] + anchoBloque) &&
    (posicionActualBola[1] > posicionActualUsuario[1] && posicionActualBola[1] < posicionActualUsuario[1] + altoBloque)
    ){
        cambiarDireccion()
}

}

 
function gameOver(){
    if (posicionActualBola [1] <=0){
        clearInterval(timerID)
        puntuacion.innerHTML = 'Lo siento has perdido'
        document.removeEventListener('keydown', moverUsuario())
    }
}


//cambiar direccion bola

function cambiarDireccion (){
    if(xDireccionBola === 2 && yDireccionBola === 2){
        yDireccionBola=-2
        return
    }
    if(xDireccionBola === 2 && yDireccionBola === -2){
        xDireccionBola=-2
        return
    }
    if(xDireccionBola === -2 && yDireccionBola === -2){
        yDireccionBola=2
        return
    }
    if(xDireccionBola === -2 && yDireccionBola === 2){
        xDireccionBola=2
        return
    }
}