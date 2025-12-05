// ---------------------- Mini-juego ----------------------
const personajeBase = {
  vida: 100,
  poder: "Ninguno",
  atacar() {
    return `${this.nombre} ataca usando ${this.poder}!`;
  },
  recibirDaño(cantidad) {
    this.vida -= cantidad;
    if (this.vida < 0) this.vida = 0;
  }
};

// Crear personajes
const eleven = Object.create(personajeBase);
eleven.nombre = "Eleven";
eleven.poder = "Telequinesis";

const demogorgon = Object.create(personajeBase);
demogorgon.nombre = "Demogorgon";
demogorgon.poder = "Garras del UD";

const personajesMap = { eleven, demogorgon };

// Elementos DOM
const infoBox = document.getElementById("info");
const cajasJuego = document.querySelectorAll(".caja-juego");
const atacanteSelect = document.getElementById("atacante");
const defensorSelect = document.getElementById("defensor");
const atacarBtn = document.getElementById("atacarBtn");

// Actualizar barra de vida
function actualizarVida(caja, personajeObj) {
  const fill = caja.querySelector(".vida-fill");
  const porcentaje = (personajeObj.vida / personajeBase.vida) * 100;
  fill.style.width = porcentaje + "%";
  fill.style.backgroundColor = porcentaje > 50 ? "#00ff00" : porcentaje > 20 ? "#ff9900" : "#ff0000";
}

// Mostrar info de personaje
function mostrarInfo(personajeObj) {
  infoBox.innerHTML = `
    <h2>${personajeObj.nombre}</h2>
    <p><strong>Poder:</strong> ${personajeObj.poder}</p>
    <p><strong>Vida:</strong> ${personajeObj.vida}</p>
    <p><strong>Métodos heredados:</strong> atacar(), recibirDaño()</p>
    <p><strong>Ejemplo de ataque:</strong> ${personajeObj.atacar()}</p>
  `;
}

// Inicializar barras y clics
cajasJuego.forEach(caja => {
  const personajeObj = personajesMap[caja.dataset.personaje];
  actualizarVida(caja, personajeObj);

  caja.addEventListener("click", () => mostrarInfo(personajeObj));
});

// Botón atacar
atacarBtn.addEventListener("click", () => {
  const atacanteObj = personajesMap[atacanteSelect.value];
  const defensorObj = personajesMap[defensorSelect.value];

  if (atacanteObj === defensorObj) {
    infoBox.innerHTML = "<p>No puedes atacarte a ti mismo 😱</p>";
    return;
  }

  const dano = Math.floor(Math.random() * 20) + 5;
  defensorObj.recibirDaño(dano);

  // Animación de daño
  const cajaDefensor = document.querySelector(`.caja-juego[data-personaje="${defensorSelect.value}"]`);
  cajaDefensor.classList.add("recibido-dano");
  setTimeout(() => cajaDefensor.classList.remove("recibido-dano"), 500);

  mostrarInfo(defensorObj);
  actualizarVida(cajaDefensor, defensorObj);
});

// ---------------------- Diagrama educativo ----------------------
const personajeBaseDiagrama = { vida: 100, poder: "Ninguno", atacar() { return `${this.nombre} ataca`; }, recibirDaño(c) { this.vida -= c; if(this.vida<0)this.vida=0; } };
const elevenDiagrama = Object.create(personajeBaseDiagrama); elevenDiagrama.nombre="Eleven";
const demogorgonDiagrama = Object.create(personajeBaseDiagrama); demogorgonDiagrama.nombre="Demogorgon";

const diagramaMap = { "eleven-diagrama": elevenDiagrama, "demogorgon-diagrama": demogorgonDiagrama };

function actualizarBarraDiagrama(caja, personajeObj) {
  const fill = caja.querySelector(".vida-fill");
  const porcentaje = (personajeObj.vida / personajeBaseDiagrama.vida) * 100;
  fill.style.width = porcentaje + "%";
  fill.style.backgroundColor = porcentaje > 50 ? "#00ff00" : porcentaje > 20 ? "#ff9900" : "#ff0000";
}

const cajasDiagrama = document.querySelectorAll(".caja-derivada");
cajasDiagrama.forEach(caja => {
  const personajeObj = diagramaMap[caja.dataset.personaje];
  actualizarBarraDiagrama(caja, personajeObj);

  caja.addEventListener("click", () => {
    const dano = Math.floor(Math.random() * 20) + 5;
    personajeObj.recibirDaño(dano);
    actualizarBarraDiagrama(caja, personajeObj);
    alert(`${personajeObj.nombre} recibió ${dano} de daño!\nVida actual: ${personajeObj.vida}`);
  });
});
