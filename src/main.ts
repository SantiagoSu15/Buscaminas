import { Dificultad } from "./dificultad.js";
import { jugar } from "./tablero.js";

let dificultadSeleccionada: Dificultad = Dificultad.Normal;

export function comenzarJuego(dificultad: Dificultad){
    dificultadSeleccionada = dificultad;
    let tablero = document.getElementById("board");
    if(tablero !== null){
        tablero.remove();
    }
    jugar(dificultad);


    var div = document.getElementById("comenzarJuego");
    div?.remove();
}


(window as any).comenzarJuego = comenzarJuego;



export function reiniciarPartida() {
    let tablero = document.getElementById("board");
    if (tablero !== null) {
        tablero.remove();
    }

    const el = document.createElement("button");
    el.id = "comenzarJuego";
    el.textContent = "Comenzar Juego";

    el.addEventListener("click", function() {
        comenzarJuego(dificultadSeleccionada); 
    });

    document.body.appendChild(el);
}




export function crearDificultad(){
    const el = document.createElement("button");
    el.id = "dificultadButtom";
    el.textContent = "Dificultad";

    const la = document.createElement("select");
    la.style.display = "none";


    for(const d of Object.keys(Dificultad)){
        if (isNaN(Number(d))) {
            const opcion = document.createElement("option");
            opcion.classList = "subDificultadButtom"
            opcion.value = d;
            opcion.textContent = d;
            la.appendChild(opcion);
        };
    }

    la.addEventListener("change", function() {
        const dificultadTexto = la.value;
        const d = mapDificultad(dificultadTexto);
        if(d !== undefined) {
            comenzarJuego(d);
        }
    });

    el.addEventListener("click", function() {
        if (la.style.display === "none") {
            la.style.display = "block"; 
        } else {
            la.style.display = "none"; 
        }
    });
    
    
    document.body.appendChild(el);
    document.body.appendChild(la);
}

(window as any).crearDificultad = crearDificultad;




function mapDificultad(difi: string): Dificultad | undefined {
    const aString: [string, Dificultad][] = [
        ["Super",Dificultad.Super],
        ["Facil", Dificultad.Facil],
        ["Normal", Dificultad.Normal],
        ["Dificil", Dificultad.Dificil]
    ];

    const result = aString.find(([key]) => key === difi);
    return result ? result[1] : undefined;
}

