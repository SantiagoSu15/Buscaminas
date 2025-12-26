import type { Celda } from "./celda.js";
import { Dificultad } from "./dificultad.js";
import { evetosTodos } from "./eventos.js";

export type Tablero = {
  celdas: Celda[][]; 
  dificultad: Dificultad;
  element: HTMLDivElement;
  minas: number;
};


function crearTablero(difi: Dificultad): Tablero {
    const minas = Math.floor((difi * difi) * 0.2);
    const celdas: Celda[][] = [];

    const elementoTablero = document.createElement("div");
    elementoTablero.id = "board";

    for (let i = 0; i < difi; i++) {
        const fila: Celda[] = [];

        for (let j = 0; j < difi; j++) {
            const el = document.createElement("div");
            el.className = "cell";

            const cell: Celda = {
                mina: false,
                revelado: false,
                bandera:false,
                element: el,
                fila: i,
                columna:j
            };


            fila.push(cell);
            elementoTablero.appendChild(el); 
        }

        celdas.push(fila);
    }

    document.body.appendChild(elementoTablero); 

    elementoTablero.style.setProperty("--size", difi.toString());

    const tablero: Tablero = {
        dificultad: difi,
        celdas: celdas,
        element: elementoTablero,
        minas: minas
    };


    return tablero;
}



function ponerMinas(table: Tablero){
    let minasPuesta = 0;

    while(minasPuesta<table.minas){
        const filas = table.celdas.length;
        const primeraFila = table.celdas[0];
        if (!primeraFila) return; 
        
        const columnas = primeraFila.length;

        const filaRandy = Math.floor(Math.random() * filas);
        const colRandy = Math.floor(Math.random() * columnas);

        const fila = table.celdas[filaRandy];
        if (!fila) continue; 
        
        const celdaRandy = fila[colRandy];
        if (!celdaRandy) continue; 

        if (!celdaRandy.mina) {
            celdaRandy.mina = true;
            minasPuesta++;
        }
     }
};



export function verificarVecinos(table:Tablero,cell :Celda):number{
    let posicion: [number,number] = [cell.fila,cell.columna]
    let minasVecinas :number = 0;

    const posicionesVecinas = [
        [-1,-1],[-1,0],[-1,1],
        [0,-1],[0,1],
        [1,-1],[1,0],[1,1]
    ];

    for(const[filaV,columnaV] of posicionesVecinas){
        if(filaV ==null) continue;
        if(columnaV==null)continue;

        let fila = posicion[0] +  filaV;
        let columna = posicion[1] + columnaV;

        const primeraFila = table.celdas[0];
        if (primeraFila == null || typeof primeraFila === 'undefined') continue; 
        const columnas = primeraFila.length;

        if(fila>= 0 && fila <= table.celdas.length && columna >= 0 && columna<= columnas){
            const celdaVecina = table?.celdas?.[fila]?.[columna];

            if (!celdaVecina) continue;
            if(celdaVecina.mina){
                minasVecinas++;
            }
        };


    };

    if(minasVecinas !==0){
        cell.element.textContent = minasVecinas.toString();
    }
    return minasVecinas;
};

export function revelarSinVecinos(cell : Celda,table: Tablero){
    let posicion: [number,number] = [cell.fila,cell.columna]

    const posicionesVecinas = [
        [-1,-1],[-1,0],[-1,1],
        [0,-1],[0,1],
        [1,-1],[1,0],[1,1]
    ];

    for(const[filaV,columnaV] of posicionesVecinas){
        if(filaV ==null) continue;
        if(columnaV==null)continue;

        let fila = posicion[0] +  filaV;
        let columna = posicion[1] + columnaV;

        const celdaVecina = table?.celdas?.[fila]?.[columna];
        if(celdaVecina == null || typeof celdaVecina === 'undefined') continue;

        const primeraFila = table.celdas[0];
        if (primeraFila == null || typeof primeraFila === 'undefined') continue; 
        const columnas = primeraFila.length;

        if(fila>= 0 && fila <= table.celdas.length && columna >= 0 && columna<= columnas){
            celdaVecina.element.classList.add("open");
            const n = verificarVecinos(table,celdaVecina);
            if(n===0 && !celdaVecina.revelado){
                celdaVecina.revelado = true;
                revelarSinVecinos(celdaVecina,table);
            }   
            celdaVecina.revelado = true;

            verificarVictoria(table)

        };
           
    };


};




export function verificarVictoria(table:Tablero):boolean{
    const cantidadMinas = table.celdas.flat().filter(m=> m.mina).length;
    const celdasSinRevelar = table.celdas.flat().filter(c => !c.revelado).length;

    console.log("Minas:" + cantidadMinas, "Sin Revelear:" + celdasSinRevelar)
    const victoria : boolean = cantidadMinas === celdasSinRevelar;
   
    return victoria;
}









export function jugar(difi: Dificultad): Tablero{
    const table: Tablero = crearTablero(difi);
    ponerMinas(table);
    evetosTodos(table);
    return table;
}

