// -------------------------------------------
// 🧬 1. PROTOTIPO BASE
// Este objeto será el "molde" del que heredarán los personajes.
// -------------------------------------------

const personajeBase = {
  nombre: "Desconocido",
  poder: "Ninguno",
  vida: 100,

  // Acción genérica (todos la heredan)
  atacar() {
    console.log(`${this.nombre} ataca usando ${this.poder}!`);
  },

  recibirDaño(cantidad) {
    this.vida -= cantidad;
    console.log(`${this.nombre} recibe ${cantidad} de daño. Vida actual: ${this.vida}`);
  }
};


// -------------------------------------------
// 🧒 2. CREAR PERSONAJES USANDO Object.create()
// Aquí empieza la magia de la herencia prototípica.
// -------------------------------------------

// Eleven hereda del personajeBase
const eleven = Object.create(personajeBase);
// Se personalizan sus propiedades
eleven.nombre = "Eleven";
eleven.poder = "Telequinesis";

// Demogorgon hereda del personajeBase
const demogorgon = Object.create(personajeBase);
demogorgon.nombre = "Demogorgon";
demogorgon.poder = "Garras del Upside Down";


// -------------------------------------------
// 🎮 3. MINI-JUEGO
// Simulación rápida de un turno de batalla.
// -------------------------------------------

console.log("🔥 COMIENZA LA BATALLA EN HAWKINS 🔥");

// Turno 1: Eleven ataca
eleven.atacar();
demogorgon.recibirDaño(40);

// Turno 2: Demogorgon contraataca
demogorgon.atacar();
eleven.recibirDaño(25);

// Turno 3: Eleven usa un ataque final especial
console.log("⚡ Eleven concentra todo su poder... ⚡");
demogorgon.recibirDaño(80);
