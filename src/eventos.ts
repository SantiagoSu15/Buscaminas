import type { Celda } from "./celda.js";
import type { Tablero } from "./tablero.js";
import { verificarVictoria,verificarVecinos,revelarSinVecinos} from "./tablero.js";
import {reiniciarPartida} from "./main.js"


export function evetosTodos(table:Tablero){
    darEventoBandera(table);
    darEventoCeldas(table);
}






export function darEventoBandera(table:Tablero){
    table.celdas.forEach((fila)=>{
        fila.forEach((c)=>{
            c.element.addEventListener('mousedown',(e)=>{
                if(e.button === 2){
                    ponerBanderas(c);
                }
            });
        });
    });

   
};


export function darEventoCeldas(table:Tablero){
    table.celdas.forEach((fila)=>{
        fila.forEach((c)=>{
            c.element.addEventListener('click',()=>oprimirCelda(c,table) )
        });
    });

};


function ponerBanderas(cell: Celda){
    if(cell.revelado) return;
    if(!cell.bandera){
        cell.bandera = true;
        cell.element.classList.add("bandera")
    }else{
        cell.bandera = false;
        cell.element.classList.remove("bandera")
    }
};


function oprimirCelda(cell : Celda,table:Tablero){
    if(cell.revelado) return;
    if(cell.bandera){
        cell.bandera = false
        cell.element.classList.remove("bandera")
    }else{
        cell.revelado = true;
        cell.element.classList.add("open");
    
        if( verificarVictoria(table)){
            anuncioEvento("Ganaste ")
        }else{
            if(cell.mina){
                cell.element.classList.add("mine");
                anuncioEvento("Perdiste")
            }else{
                const minasVecinas :number = verificarVecinos(table,cell);
                if(minasVecinas===0){
                    revelarSinVecinos(cell,table)
                }else{
                    cell.element.textContent = minasVecinas.toString();
                }
            }
        }
    }
   
};


export function anuncioEvento(s :string){
    console.log("evento final")
    let tablero = document.getElementById("board");
    if(tablero !== null){
        tablero.remove();
    }
    const contenedor : HTMLElement = document.createElement("div");
    contenedor.id = "contenedor"
    const resultado : HTMLElement = document.createElement("p");
    resultado.id = "resultado";
    resultado.textContent = s;
    const boton : HTMLElement = document.createElement("button");
    boton.id = "botonFinal";
    boton.textContent = "Volver a jugar";

    contenedor.appendChild(resultado);
    contenedor.appendChild(boton);
    document.body.appendChild(contenedor); 

    boton.focus();

    const reiniciar = () => {
        reiniciarPartida();
        contenedor.remove();
    };

    boton.addEventListener("click", reiniciar);


    const barraEspacio = (e: KeyboardEvent) => {
        if (e.key === ' ' || e.key === 'Spacebar' || e.code === 'Space') {
            e.preventDefault();
            reiniciar();
            document.removeEventListener("keydown", barraEspacio);
        }
    };

    document.addEventListener("keydown", barraEspacio);
}

document.addEventListener('contextmenu', function(event) {
    event.preventDefault(); 
});



