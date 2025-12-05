// -------------------------------------------
// 1️⃣ Prototipo base
// -------------------------------------------
const personajeBase = {
  vida: 100,
  poder: "Ninguno",
  atacar() {
    return `${this.nombre} ataca usando ${this.poder}!`;
  },
  recibirDaño(cantidad) {
    this.vida -= cantidad;
    if (this.vida < 0) this.vida = 0;
    return `${this.nombre} recibe ${cantidad} de daño. Vida actual: ${this.vida}`;
  }
};

// -------------------------------------------
// 2️⃣ Personajes creados con Object.create()
// -------------------------------------------
const eleven = Object.create(personajeBase);
eleven.nombre = "Eleven";
eleven.poder = "Telequinesis";

const demogorgon = Object.create(personajeBase);
demogorgon.nombre = "Demogorgon";
demogorgon.poder = "Garras del UD";

// Mapa para enlazar dataset con objetos
const personajesMap = { eleven, demogorgon };

// -------------------------------------------
// 3️⃣ Elementos DOM
// -------------------------------------------
const infoBox = document.getElementById("info");
const personajesDOM = document.querySelectorAll(".personaje");
const atacanteSelect = document.getElementById("atacante");
const defensorSelect = document.getElementById("defensor");
const atacarBtn = document.getElementById("atacarBtn");

// -------------------------------------------
// 4️⃣ Funciones para UI
// -------------------------------------------
function generarInfoHTML(personajeObj) {
  return `
    <h2>${personajeObj.nombre}</h2>
    <p><strong>Poder:</strong> ${personajeObj.poder}</p>
    <p><strong>Vida:</strong> ${personajeObj.vida}</p>
    <p><strong>Métodos heredados:</strong> atacar(), recibirDaño()</p>
    <p><strong>Ejemplo de ataque:</strong> "${personajeObj.atacar()}"</p>
  `;
}

function mostrarInfo(personajeObj) {
  infoBox.innerHTML = generarInfoHTML(personajeObj);
}

function actualizarVidaDOM() {
  personajesDOM.forEach(caja => {
    const personajeObj = personajesMap[caja.dataset.personaje];
    const vidaParcial = caja.querySelector(".vida");
    if (!vidaParcial) {
      const spanVida = document.createElement("p");
      spanVida.classList.add("vida");
      spanVida.textContent = `Vida: ${personajeObj.vida}`;
      caja.appendChild(spanVida);
    } else {
      vidaParcial.textContent = `Vida: ${personajeObj.vida}`;
    }
  });
}

// -------------------------------------------
// 5️⃣ Interacción del diagrama
// -------------------------------------------
personajesDOM.forEach(caja => {
  const personajeObj = personajesMap[caja.dataset.personaje];
  mostrarInfo(personajeObj);
  actualizarVidaDOM();

  caja.addEventListener("click", () => {
    mostrarInfo(personajeObj);
  });
});

// -------------------------------------------
// 6️⃣ Mini-juego de ataque
// -------------------------------------------
function atacarPersonaje() {
  const atacanteObj = personajesMap[atacanteSelect.value];
  const defensorObj = personajesMap[defensorSelect.value];

  if (atacanteObj === defensorObj) {
    infoBox.innerHTML = "<p>No puedes atacarte a ti mismo 😱</p>";
    return;
  }

  // Daño aleatorio
  const dano = Math.floor(Math.random() * 20) + 5;
  const resultado = defensorObj.recibirDaño(dano);

  // Animación de daño
  const cajaDefensor = document.querySelector(`[data-personaje="${defensorSelect.value}"]`);
  cajaDefensor.classList.add("recibido-dano");
  setTimeout(() => {
    cajaDefensor.classList.remove("recibido-dano");
  }, 500);

  // Mostrar resultados
  infoBox.innerHTML = `
    <h2>Mini-juego de ataque</h2>
    <p>${atacanteObj.atacar()}</p>
    <p>${resultado}</p>
  `;

  // Actualizar vida en diagrama
  actualizarVidaDOM();
}

// Event listener del botón
atacarBtn.addEventListener("click", atacarPersonaje);


// -------------------------------------------
// Diagrama educativo interactivo
// -------------------------------------------

// Creamos mini-objetos para demostrar herencia en el diagrama
const personajeBaseDiagrama = {
  vida: 100,
  poder: "Ninguno",
  atacar() {
    return `${this.nombre} ataca usando ${this.poder}`;
  }
};

const elevenDiagrama = Object.create(personajeBaseDiagrama);
elevenDiagrama.nombre = "Eleven";

const demogorgonDiagrama = Object.create(personajeBaseDiagrama);
demogorgonDiagrama.nombre = "Demogorgon";

const diagramaMap = {
  "eleven-diagrama": elevenDiagrama,
  "demogorgon-diagrama": demogorgonDiagrama
};

// Seleccionamos las cajas derivadas del diagrama
const cajasDiagrama = document.querySelectorAll(".caja-derivada");

cajasDiagrama.forEach(caja => {
  caja.addEventListener("click", () => {
    const personajeObj = diagramaMap[caja.dataset.personaje];
    alert(
      `Nombre: ${personajeObj.nombre}\n` +
      `Vida heredada: ${personajeObj.vida}\n` +
      `Poder heredado: ${personajeObj.poder}\n` +
      `Método ejemplo: ${personajeObj.atacar()}`
    );
  });
});
