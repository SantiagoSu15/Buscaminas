import { Dificultad } from "./dificultad.js";
import { jugar } from "./tablero.js";
import { relojDificultad, relojNormal } from "./tiempo.js";


let dificultadSeleccionada: Dificultad = Dificultad.Normal;
let tiempoButton: string = "SinTiempo";


export function comenzarJuego(dificultad: Dificultad){
    dificultadSeleccionada = dificultad;
    let tablero = document.getElementById("board");
    if(tablero !== null){
        tablero.remove();
    }
    jugar(dificultad);

    console.log(tiempoButton)    
    botonTiempo();
    reloj();
    var div = document.getElementById("comenzarJuego");
    div?.remove();
}


(window as any).comenzarJuego = comenzarJuego;


function reloj(){
    const celdas = document.querySelectorAll(".cell").length;
     tiempoButton === "SinTiempo" ?  relojNormal() : relojDificultad(celdas);

}



function botonTiempo() {
    const verificacion = document.getElementById("tiempoButton");
    if (verificacion !== null) return;

    const difiTiempo = document.createElement("button");
    difiTiempo.id = "tiempoButton";
    difiTiempo.classList.add(tiempoButton);

    tiempoButton === "SinTiempo" ?  difiTiempo.textContent = "Cambiar A Modo Con Tiempo" : difiTiempo.textContent = "Cambiar A Modo Sin Tiempo"


    document.body.appendChild(difiTiempo);

    difiTiempo.addEventListener("click", () => {
        const t = difiTiempo.classList.toggle("SinTiempo");
        tiempoButton = t ? "SinTiempo" : "ConTiempo";

        difiTiempo.textContent = t
            ? "Cambiar A Modo Con Tiempo"
            : "Cambiar A Modo Sin Tiempo";

            comenzarJuego(dificultadSeleccionada);

        const celdas = document.querySelectorAll(".cell").length;

        if (t) {
            relojNormal();
        } else {
            relojDificultad(celdas);
        }

    });
}


export function reiniciarPartida() {
    let tablero = document.getElementById("board");
    if (tablero !== null) {
        tablero.remove();
    }


    let reloj = document.getElementById("reloj");
    reloj?.remove();

    let botonTiempo = document.getElementById("tiempoButton");
    botonTiempo?.remove();

    comenzarJuego(dificultadSeleccionada); 

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

