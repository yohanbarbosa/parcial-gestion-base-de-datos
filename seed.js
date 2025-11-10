import mongoose from "mongoose";

// ====== CONEXIÓN A MONGO ======
const MONGODB_URI = "mongodb://127.0.0.1:27017/tu_base_de_datos"; // <-- cámbiala si es necesario

await mongoose.connect(MONGODB_URI);
console.log("✅ Conectado a MongoDB");


// ====== ESQUEMAS ======
const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  correo: String,
  saldo: Number,
  pais: String,
});

const EventoSchema = new mongoose.Schema({
  deporte: String,
  fecha: Date,
  cuota_local: Number,
  cuota_empate: Number,
  cuota_visitante: Number,
});

const ApuestaSchema = new mongoose.Schema({
  monto: Number,
  ganancia_posible: Number,
  estado: String,
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
  evento: { type: mongoose.Schema.Types.ObjectId, ref: "Evento" },
});

// ====== MODELOS ======
const Usuario = mongoose.model("Usuario", UsuarioSchema);
const Evento = mongoose.model("Evento", EventoSchema);
const Apuesta = mongoose.model("Apuesta", ApuestaSchema);


// ====== LIMPIAR COLECCIONES ======
await Usuario.deleteMany({});
await Evento.deleteMany({});
await Apuesta.deleteMany({});

console.log("🧹 Colecciones limpiadas");


// ====== INSERTAR USUARIOS ======
const usuarios = await Usuario.insertMany([
  { nombre: "Carlos Gómez", correo: "carlos@example.com", saldo: 50000, pais: "Colombia" },
  { nombre: "Laura Ruiz", correo: "laura@example.com", saldo: 80000, pais: "México" },
  { nombre: "Pedro Hernández", correo: "pedro@example.com", saldo: 30000, pais: "Argentina" },
]);

console.log("👤 Usuarios creados:", usuarios.length);


// ====== INSERTAR EVENTOS ======
const eventos = await Evento.insertMany([
  {
    deporte: "Fútbol",
    fecha: new Date("2025-04-20 18:00:00"),
    cuota_local: 1.80,
    cuota_empate: 3.10,
    cuota_visitante: 2.20
  },
  {
    deporte: "Baloncesto",
    fecha: new Date("2025-05-12 20:00:00"),
    cuota_local: 1.60,
    cuota_empate: 4.50,
    cuota_visitante: 2.80
  }
]);

console.log("🏟️ Eventos creados:", eventos.length);


// ====== INSERTAR APUESTAS ======
await Apuesta.insertMany([
  {
    monto: 10000,
    ganancia_posible: 18000,
    estado: "en curso",
    usuario: usuarios[0]._id,
    evento: eventos[0]._id
  },
  {
    monto: 15000,
    ganancia_posible: 24000,
    estado: "en curso",
    usuario: usuarios[1]._id,
    evento: eventos[1]._id
  }
]);

console.log("💰 Apuestas creadas");


// ====== FINALIZAR ======
await mongoose.connection.close();
console.log("🔌 Conexión cerrada. ✅ Seed completado.");
