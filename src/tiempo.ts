import {reiniciarPartida} from "./main.js"

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

        if(intervalId !== null) return;
        //si no se guarda en variable se pueden generar infintos setInterval
        intervalId = window.setInterval(()=>{
            b ? s++ : s--
             r.textContent = String(Math.trunc(s));

             if(s ===0){
                alert("Perdiste");
                reiniciarPartida();
             }
        },1000);
    };


    function reiniciar() {
        detener();
        s = segundos;
        r.textContent = String(s);
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

