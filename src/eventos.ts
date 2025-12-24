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
            reiniciarPartida();
        }else{
            if(cell.mina){
                cell.element.classList.add("mine");
                alert("Perdiste");
                reiniciarPartida();
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

document.addEventListener('contextmenu', function(event) {
    event.preventDefault(); 
});



