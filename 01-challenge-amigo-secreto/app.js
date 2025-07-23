const listaAmigos = [];
const listaElement = document.getElementById('listaAmigos');
const resultadoElement = document.getElementById('resultado');

// Agrega un amigo a la lista
function agregarAmigo() {
    const input = document.getElementById('amigo');
    const nombre = input.value.trim();

    if (nombre && !listaAmigos.includes(nombre)) {
        listaAmigos.push(nombre);
        actualizarLista();
        input.value = '';
    }
}

// Muestra la lista de nombres en pantalla
function actualizarLista() {
    listaElement.innerHTML = '';
    listaAmigos.forEach((nombre, index) => {
        const li = document.createElement('li');
        li.textContent = nombre;
        li.classList.add('nombre-item');
        li.setAttribute('data-index', index);
        listaElement.appendChild(li);
    });
}

// Sortea los nombres
function sortearAmigo() {
    if (listaAmigos.length < 2) {
        alert('Agrega al menos 2 nombres para sortear.');
        return;
    }

    // Crea una copia y desordénala
    let sorteados;
    do {
        sorteados = [...listaAmigos].sort(() => Math.random() - 0.5);
    } while (!esValidoElSorteo(sorteados));

    mostrarSorteo(sorteados);
}

// Verifica que nadie se saque a sí mismo
function esValidoElSorteo(sorteados) {
    return sorteados.every((nombre, i) => nombre !== listaAmigos[i]);
}

// Muestra los nombres y agrega interacción para revelar su amigo secreto
function mostrarSorteo(sorteados) {
    resultadoElement.innerHTML = '';
    listaElement.innerHTML = '';

    listaAmigos.forEach((nombre, i) => {
        const li = document.createElement('li');
        li.textContent = nombre;
        li.classList.add('nombre-item');

        // Al hacer clic, mostrar su amigo secreto
        li.addEventListener('click', (e) => {
            e.stopPropagation();
            ocultarFlotantes();

            const flotante = document.createElement('div');
            flotante.textContent = `Tu amigo secreto es: ${sorteados[i]}`;
            flotante.classList.add('flotante');

            li.appendChild(flotante);
        });

        listaElement.appendChild(li);
    });

    // Ocultar flotantes al hacer clic fuera
    document.body.addEventListener('click', ocultarFlotantes);
}

// Oculta todos los flotantes visibles
function ocultarFlotantes() {
    const flotantes = document.querySelectorAll('.flotante');
    flotantes.forEach(f => f.remove());
}
