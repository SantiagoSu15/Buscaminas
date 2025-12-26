import {reiniciarPartida} from "./main.js"
import {anuncioEvento} from "./eventos.js"

function crearRelojHtml(): HTMLElement{   
    const r = document.getElementById("reloj");

    if(r !== null){
        r.remove();
    }

    let reloj = document.createElement("div")
    reloj.id= "reloj"
    reloj.classList.add("Reloj")
    document.body.appendChild(reloj);
    return reloj;
}


function crearReloj(r:HTMLElement,segundos:number,difi : Boolean){ // clase reloj 
    // Atributos
    let s = segundos;
    let intervalId: number | null = null;
    let b = difi;

    // metodos
    function iniciar(){  

        let spa  = document.createElement("span");
        spa.id = "spanReloj";
        spa.textContent = String(Math.trunc(s));
        r.appendChild(spa);

        if(intervalId !== null) return;
        //si no se guarda en variable se pueden generar infintos setInterval
        intervalId = window.setInterval(()=>{
            b ? s++ : s--
            
            spa.classList.remove('tick-up', 'tick-down');
            void spa.offsetWidth; 
            
            spa.classList.add(b ? 'tick-up' : 'tick-down');
            spa.textContent = String(Math.trunc(s));

             if(s ===0){
                anuncioEvento("Sin tiempo Perdiste")
                detener();
             }
        },1000);
    };


    function reiniciar() {
        detener();
        s = segundos;
        const todosLosSpans = r.querySelectorAll('span');
        todosLosSpans.forEach(span => r.removeChild(span));
        iniciar();
    }

    function detener() {
        if (intervalId !== null) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    return { iniciar, reiniciar, detener };

};


export function relojNormal(){

    const segundos = 0;
    let relojHtml = crearRelojHtml();
    const reloj = crearReloj(relojHtml,segundos,true);
    reloj.iniciar();

    return reloj;
};



export function relojDificultad(num:number){
    let segundos = ((num) * 0.2)*10;
    let relojHtml = crearRelojHtml();
    const reloj = crearReloj(relojHtml,segundos,false);
    reloj.iniciar();
    return reloj;

};

