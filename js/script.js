/* =========================================
   ESPERAR A QUE CARGUE LA PÁGINA
========================================= */

document.addEventListener(
    'DOMContentLoaded',
    () => {

        iniciarLoader();

        iniciarCuentaRegresiva();

    }
);




/* =========================================
   LOADER PREMIUM
========================================= */

/*
    ELEMENTOS DEL LOADER
*/

const loader =
    document.getElementById(
        'loader'
    );

const loaderStartScreen =
    document.getElementById(
        'loaderStartScreen'
    );

const loaderHeart =
    document.querySelector(
        '.loader-heart'
    );

const backgroundMusic =
    document.getElementById(
        'backgroundMusic'
    );


    /*
    Imágenes principales del loader.
*/

const brideImage =
    document.querySelector(
        '.loader-character.bride'
    );

const groomImage =
    document.querySelector(
        '.loader-character.groom'
    );



/*
    Evitamos ejecutar dos veces
    la transición.
*/

let loaderFinalizado = false;



function iniciarLoader() {

    if (
        !loader ||
        !loaderStartScreen ||
        !loaderHeart ||
        !backgroundMusic ||
        !brideImage ||
        !groomImage
    ) {

        return;

    }

    window.addEventListener(

        'load',

        async () => {

            /*
                Esperamos a que las imágenes
                estén completamente decodificadas.
            */

            await Promise.all([

                brideImage.decode().catch(() => {}),

                groomImage.decode().catch(() => {})

            ]);

            /*
                Ahora sí comienza el tiempo
                del loader.
            */

            setTimeout(

                mostrarPantallaInicio,

                7300

            );

        },

        {

            once: true

        }

    );

}


/* =========================================
   MOSTRAR MENSAJE
========================================= */

function mostrarPantallaInicio() {

    loader.classList.add(
    'loader-waiting'
);

loaderStartScreen.classList.add(
    'show'
);

esperarPrimerToque();

}


/* =========================================
   ESPERAR PRIMER TOQUE
========================================= */

function esperarPrimerToque() {

    window.addEventListener(

        'pointerdown',

        primerToque,

        {

            once: true

        }

    );

}


/* =========================================
   PRIMER TOQUE
========================================= */

function primerToque(evento) {

    if (
        loaderFinalizado
    ) {

        return;

    }

    loaderFinalizado = true;


    /*
        Ocultamos el mensaje.
    */

    loader.classList.remove(
        'loader-waiting'
    );

    loaderStartScreen.classList.remove(
        'show'
    );


    /*
        Posición del toque.
    */

    const x =
        evento.clientX;

    const y =
        evento.clientY;


    /*
        Ripple.
    */

    crearRipple(

        x,

        y

    );


    /*
        Glow.
    */

    activarGlow();


    /*
        Último latido.
    */

    ultimoLatido();


    /*
        IMPORTANTE:
        Reproducimos la música
        inmediatamente después
        del toque del usuario.
        Esto ayuda a Safari/iPhone.
    */

    backgroundMusic.play()

        .catch(
            error => {

                console.log(
                    'Error al reproducir audio:',
                    error
                );

            }
        );


        /*
    LLUVIA DE PÉTALOS
    Se activa al mismo tiempo
    que comienza la música.
*/

iniciarLluviaPetalos();




    /*
        Dejamos que termine
        la animación final.
    */

    setTimeout(

        () => {

            cerrarLoader();

        },

        700

    );

}

/* =========================================
   CREAR RIPPLE
========================================= */

function crearRipple(x, y) {

    const ripple =
        document.createElement(
            'div'
        );

    ripple.className =
        'loader-ripple';

    ripple.style.left =
        `${x}px`;

    ripple.style.top =
        `${y}px`;

    /*
        El ripple se agrega
        dentro del loader.
    */

    loader.appendChild(
        ripple
    );

    ripple.addEventListener(

        'animationend',

        () => {

            ripple.remove();

        },

        {

            once: true

        }

    );

}


/* =========================================
   ACTIVAR GLOW
========================================= */

function activarGlow() {

    loader.classList.add(
        'loader-awake'
    );

}


/* =========================================
   ÚLTIMO LATIDO
========================================= */

function ultimoLatido() {

    loaderHeart.classList.add(
        'final-beat'
    );

}




/* =========================================
   CERRAR LOADER
========================================= */

function cerrarLoader() {

    loader.classList.add(
        'hidden'
    );

    loader.addEventListener(

        'transitionend',

        () => {

            loader.style.display =
                'none';

        },

        {

            once: true

        }

    );

}




/* =========================================
   CUENTA REGRESIVA
========================================= */

function iniciarCuentaRegresiva() {


    /*
        FECHA DE LA BODA

        Sábado 2 de enero de 2027
        5:00 PM

        IMPORTANTE:

        Enero = mes 01

        Formato:

        Año-Mes-DíaTHora:Minuto:Segundo
    */


    const fechaBoda =
        new Date(
            '2027-01-02T17:00:00'
        ).getTime();


    /*
        Elementos HTML
    */

    const daysElement =
        document.getElementById(
            'days'
        );


    const hoursElement =
        document.getElementById(
            'hours'
        );


    const minutesElement =
        document.getElementById(
            'minutes'
        );


    const secondsElement =
        document.getElementById(
            'seconds'
        );


    /*
        Función para actualizar
        la cuenta regresiva
    */

    function actualizarCuenta() {


        /*
            Obtenemos la fecha y hora
            actual del dispositivo
        */

        const ahora =
            new Date().getTime();


        /*
            Calculamos cuánto tiempo
            falta para la boda
        */

        const diferencia =
            fechaBoda - ahora;


        /*
            Si la fecha de la boda
            ya llegó o pasó
        */

        if (
            diferencia <= 0
        ) {


            daysElement.textContent =
                '00';


            hoursElement.textContent =
                '00';


            minutesElement.textContent =
                '00';


            secondsElement.textContent =
                '00';


            return;

        }


        /*
            CALCULAR DÍAS
        */

        const dias =
            Math.floor(

                diferencia /

                (
                    1000 *
                    60 *
                    60 *
                    24
                )

            );


        /*
            CALCULAR HORAS
        */

        const horas =
            Math.floor(

                (
                    diferencia %

                    (
                        1000 *
                        60 *
                        60 *
                        24
                    )
                ) /

                (
                    1000 *
                    60 *
                    60
                )

            );


        /*
            CALCULAR MINUTOS
        */

        const minutos =
            Math.floor(

                (
                    diferencia %

                    (
                        1000 *
                        60 *
                        60
                    )
                ) /

                (
                    1000 *
                    60
                )

            );


        /*
            CALCULAR SEGUNDOS
        */

        const segundos =
            Math.floor(

                (
                    diferencia %

                    (
                        1000 *
                        60
                    )
                ) /

                1000

            );


        /*
            MOSTRAR DÍAS
        */

        daysElement.textContent =
            String(
                dias
            ).padStart(
                2,
                '0'
            );


        /*
            MOSTRAR HORAS
        */

        hoursElement.textContent =
            String(
                horas
            ).padStart(
                2,
                '0'
            );


        /*
            MOSTRAR MINUTOS
        */

        minutesElement.textContent =
            String(
                minutos
            ).padStart(
                2,
                '0'
            );


        /*
            MOSTRAR SEGUNDOS
        */

        secondsElement.textContent =
            String(
                segundos
            ).padStart(
                2,
                '0'
            );

    }


    /*
        Ejecutamos inmediatamente
        para evitar que aparezca
        00:00:00 mientras carga.
    */

    actualizarCuenta();


    /*
        Actualizamos cada segundo.

        La fecha objetivo permanece fija
        en el 2 de enero de 2027 a las 5 PM.

        Por eso, si alguien cierra la página
        y regresa después de varias horas
        o varios días, el contador continuará
        desde el tiempo real restante.
    */

    setInterval(

        actualizarCuenta,

        1000

    );

}





/*======================================================
=        APARICIÓN SUAVE AL HACER SCROLL
======================================================*/

const revealSections = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("visible");

        }else{

            entry.target.classList.remove("visible");

        }

    });

},{
    threshold:.25
});

revealSections.forEach(section=>{

    observer.observe(section);

});




/*======================================================
=        CONFIRMACIÓN DE ASISTENCIA                   =
======================================================*/

const confirmationModal=document.getElementById("confirmationModal");

const openConfirmationModal=document.getElementById("openConfirmationModal");

const closeConfirmationModal=document.getElementById("closeConfirmationModal");

const closeModalButton=document.getElementById("closeModalButton");

const confirmationForm=document.getElementById("confirmationForm");

const guestName=document.getElementById("guestName");

const sendConfirmation=document.getElementById("sendConfirmation");



const phoneNumber="5218117958580";



function openModal(){

    confirmationModal.classList.add("active");

    confirmationModal.setAttribute("aria-hidden","false");

    document.body.style.overflow="hidden";

    setTimeout(()=>{

        guestName.focus();

    },250);

}



function closeModal(){

    confirmationModal.classList.remove("active");

    confirmationModal.setAttribute("aria-hidden","true");

    document.body.style.overflow="";

    confirmationForm.reset();

}



openConfirmationModal.addEventListener("click",openModal);

closeConfirmationModal.addEventListener("click",closeModal);

closeModalButton.addEventListener("click",closeModal);



document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        closeModal();

    }

});



confirmationForm.addEventListener("submit",(e)=>{

    e.preventDefault();



    const name=guestName.value.trim();



    if(name===""){

        guestName.focus();

        return;

    }



    sendConfirmation.disabled=true;

    sendConfirmation.textContent="Preparando mensaje...";



    const message=

`Hola.

Soy ${name}.

Con mucho gusto confirmo mi asistencia a su boda.

¡Será un honor acompañarlos en este día tan especial!`;



    const whatsappURL=

`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;



    setTimeout(()=>{

        window.location.href=whatsappURL;



        sendConfirmation.disabled=false;

        sendConfirmation.textContent="Confirmar asistencia";



        closeModal();

    },700);

});







/* =========================================================
   LLUVIA DE PÉTALOS Y ANILLOS
========================================================= */

function iniciarLluviaPetalos() {

    const contenedor =
        document.getElementById(
            'petalos-container'
        );


    /*
        Si el contenedor no existe,
        detenemos la función.
    */

    if (!contenedor) {

        return;

    }


    /*
        Activamos visualmente
        el contenedor.
    */

    contenedor.classList.add(
        'activo'
    );


    /*
        Cantidad de pétalos.
        Se adapta dependiendo
        del dispositivo.
    */

    const cantidadPetalos =
        window.innerWidth <= 768
            ? 10
            : 17;


    /*
        Creamos los pétalos.
    */

    for (
        let i = 0;
        i < cantidadPetalos;
        i++
    ) {

        const petalo =
            document.createElement(
                'div'
            );


        /*
            Clase principal.
        */

        petalo.classList.add(
            'petalo'
        );


        /*
            Elegimos aleatoriamente
            entre rosa y azul.
        */

        const color =
            Math.random() < 0.5
                ? 'rosa'
                : 'azul';


        petalo.classList.add(
            color
        );


        /*
            Posición horizontal
            aleatoria.
        */

        petalo.style.left =
            `${Math.random() * 100}%`;


        /*
            Duración aleatoria.
            Los pétalos caen lentamente.
        */

        const duracion =
            10 +
            Math.random() * 8;


        petalo.style.animationDuration =
            `${duracion}s`;


        /*
            Retraso aleatorio.
            Esto distribuye los pétalos
            durante los primeros segundos.
        */

        const retraso =
            Math.random() * 8;


        petalo.style.animationDelay =
            `${retraso}s`;


        /*
            Agregamos el pétalo.
        */

        contenedor.appendChild(
            petalo
        );

    }


    /*
    ========================================================
        INICIAR ANILLOS
    ========================================================

        Los anillos se crean por separado
        de los pétalos.

        No aparecen todos juntos.

        Se crea un nuevo anillo cada cierto
        tiempo para mantener la animación
        ligera y elegante.
    */

    iniciarAnillos(
        contenedor
    );

}




/* =========================================================
   LLUVIA DE ANILLOS
   Mantiene una cantidad máxima de anillos activos
========================================================= */

function iniciarAnillos(
    contenedor
) {

    /*
        Cantidad máxima de anillos
        visibles al mismo tiempo.

        Celular: 5
        PC: 7
    */

    const cantidadMaxima =
        window.innerWidth <= 768
            ? 5
            : 7;


    /*
        Contador de anillos
        actualmente activos.
    */

    let anillosActivos = 0;


    /*
        Función interna encargada
        de crear nuevos anillos.
    */

    function crearNuevoAnillo() {

        /*
            Si ya alcanzamos el límite,
            no creamos otro.
        */

        if (
            anillosActivos >=
            cantidadMaxima
        ) {

            return;

        }


        /*
            Aumentamos el contador.
        */

        anillosActivos++;


        /*
            Creamos el anillo.
        */

        crearAnillo(
            contenedor,

            () => {

                /*
                    Cuando el anillo termina
                    su recorrido y desaparece,
                    reducimos el contador.
                */

                anillosActivos--;


                /*
                    Esperamos unos segundos
                    antes de crear el siguiente.

                    Esto evita que aparezca
                    inmediatamente otro anillo.
                */

                const espera =
                    4000 +
                    Math.random() * 5000;


                setTimeout(
                    () => {

                        crearNuevoAnillo();

                    },

                    espera

                );

            }

        );

    }


    /*
        Creamos inicialmente
        los anillos de forma gradual.

        No aparecen todos al mismo tiempo.
    */

    for (
        let i = 0;
        i < cantidadMaxima;
        i++
    ) {

        const esperaInicial =
            2000 +
            Math.random() * 8000;


        setTimeout(
            () => {

                crearNuevoAnillo();

            },

            esperaInicial

        );

    }

}





/* =========================================================
   CREAR ANILLO
========================================================= */

function crearAnillo(
    contenedor,
    alTerminar
) {

    /*
        Creamos el elemento.
    */

    const anillo =
        document.createElement(
            'div'
        );


    /*
        Clase que contiene
        el aro y el diamante.
    */

    anillo.classList.add(
        'anillo'
    );


    /*
        Posición horizontal aleatoria.
    */

    anillo.style.left =
        `${Math.random() * 100}%`;


    /*
        Duración aleatoria.

        Los anillos caen lentamente.
    */

    const duracion =
        14 +
        Math.random() * 6;


    anillo.style.animationDuration =
        `${duracion}s`;


    /*
        Pequeño retraso aleatorio.
    */

    const retraso =
        Math.random() * 2;


    anillo.style.animationDelay =
        `${retraso}s`;


    /*
        Agregamos el anillo
        al contenedor.
    */

    contenedor.appendChild(
        anillo
    );


    /*
        Cuando termina la animación:
        1. Eliminamos el anillo.
        2. Avisamos a iniciarAnillos()
           para que pueda crear otro.
    */

    anillo.addEventListener(

        'animationend',

        () => {

            anillo.remove();


            /*
                Avisamos que el anillo
                ya terminó.
            */

            if (
                typeof alTerminar ===
                'function'
            ) {

                alTerminar();

            }

        },

        {
            once: true
        }

    );

}