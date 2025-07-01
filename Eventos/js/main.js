// FILTRAR EVENTOS POR TEXTO O FECHA
document.getElementById("buscador").addEventListener("input", function () {
    const valor = this.value.toLowerCase();

    document.querySelectorAll(".evento").forEach(evento => {
        const texto = evento.textContent.toLowerCase();
        evento.hidden = !texto.includes(valor);
    });
});

// MOSTRAR SOLO EVENTOS FUTUROS (TOGGLE)
let mostrarFuturos = false;
document.getElementById("toggle-futuros").addEventListener("click", function () {
    mostrarFuturos = !mostrarFuturos;
    this.textContent = mostrarFuturos
        ? "Mostrar todos los eventos"
        : "Mostrar solo eventos futuros";

    const hoy = new Date();

    document.querySelectorAll(".evento").forEach(evento => {
        const fechaTexto = evento.querySelector("strong")?.textContent.trim();
        const partes = fechaTexto.split("/");

        if (partes.length === 3) {
            const fecha = new Date(`${partes[2]}-${partes[1]}-${partes[0]}`);
            evento.hidden = mostrarFuturos ? fecha < hoy : false;
        }
    });
});

// EDITAR LA DESCRIPCIÓN DEL EVENTO (SIN GUARDAR)
document.querySelectorAll(".placeholder").forEach(desc => {
    desc.addEventListener("click", function () {
        const original = this.textContent;

        const input = document.createElement("input");
        input.type = "text";
        input.value = original;
        input.className = "descripcion-editable";

        // Estilos del input
        input.style.width = "100%";
        input.style.padding = "6px";
        input.style.fontSize = "14px";
        input.style.border = "1px solid #ccc";
        input.style.borderRadius = "6px";
        input.style.marginTop = "6px";

        this.replaceWith(input);
        input.focus();

        const guardar = () => {
            const nuevoTexto = input.value.trim() || "Agrega aquí la descripción del evento";
            const nuevoSpan = document.createElement("span");
            nuevoSpan.className = "placeholder";
            nuevoSpan.textContent = nuevoTexto;

            // Reasignar el mismo evento para seguir editando después
            nuevoSpan.addEventListener("click", arguments.callee);

            input.replaceWith(nuevoSpan);
        };

        input.addEventListener("blur", guardar);
        input.addEventListener("keydown", e => {
            if (e.key === "Enter") guardar();
        });
    });
});


// CAMBIAR IMAGEN DEL EVENTO AL HACER CLIC
document.querySelectorAll(".evento-imagen img").forEach(imagen => {
    imagen.style.cursor = "pointer";

    imagen.addEventListener("click", () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";

        input.addEventListener("change", () => {
            const file = input.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    imagen.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });

        input.click(); // Simular clic para abrir el explorador
    });
});

// EDITAR FECHA DEL EVENTO
document.querySelectorAll(".evento strong").forEach(fechaElem => {
    fechaElem.style.cursor = "pointer";

    fechaElem.addEventListener("click", function () {
        const fechaOriginal = fechaElem.textContent.trim();
        const partes = fechaOriginal.split("/");

        if (partes.length !== 3) return;

        // Convertir a formato yyyy-mm-dd para el input tipo date
        const fechaISO = `${partes[2]}-${partes[1]}-${partes[0]}`;
        const inputFecha = document.createElement("input");
        inputFecha.type = "date";
        inputFecha.value = fechaISO;

        // Estilo del input
        inputFecha.style.fontSize = "14px";
        inputFecha.style.padding = "4px";
        inputFecha.style.marginTop = "6px";

        fechaElem.replaceWith(inputFecha);
        inputFecha.focus();

        const guardarFecha = () => {
            const nuevaFecha = inputFecha.value;
            if (nuevaFecha) {
                const [a, m, d] = nuevaFecha.split("-");
                const nuevaFechaTexto = `${d}/${m}/${a}`;
                const nuevoStrong = document.createElement("strong");
                nuevoStrong.textContent = nuevaFechaTexto;

                inputFecha.replaceWith(nuevoStrong);

                // Reaplicar evento para volver a editar
                nuevoStrong.style.cursor = "pointer";
                nuevoStrong.addEventListener("click", arguments.callee);
            }
        };

        inputFecha.addEventListener("blur", guardarFecha);
        inputFecha.addEventListener("keydown", e => {
            if (e.key === "Enter") guardarFecha();
        });
    });
});



