# 🏠 Ejercicio – Casa de Apuestas Deportivas (MongoDB)

Una **casa de apuestas deportivas** desea manejar la información de sus apuestas.  
Se requiere registrar **usuarios**, **eventos deportivos** y **apuestas realizadas**.

---

## 📋 Requerimientos del sistema

### 🧑‍💼 Usuarios
Cada usuario debe almacenar los siguientes datos:
- **nombre**
- **correo**
- **saldo**
- **país**

### ⚽ Eventos deportivos
Cada evento debe incluir como mínimo:
- **deporte**
- **fecha**
- **cuotas del ganador** (`cuota_local`, `cuota_empate`, `cuota_visitante`, etc.)

> Los usuarios y eventos pueden registrarse sin ninguna limitante.

### 💰 Apuestas
Cada apuesta debe registrar:
- **monto apostado**
- **posible ganancia**
- **estado** (`ganada`, `perdida`, `en curso`, etc.)
- **usuario** que realizó la apuesta
- **evento** sobre el cual se realizó la apuesta

---

## 🗄️ Creación de Base de Datos y Colecciones (0.5 pts)

1. Crear la base de datos **`casa_apuestas`**.  
2. Crear las colecciones:
   - `usuarios`
   - `eventos`
   - `apuestas`

---

## 🧩 Inserción de Documentos (1 pt)

- Insertar **al menos 5 usuarios** con diferentes países y saldos.  
- Insertar **al menos 5 eventos deportivos** (fútbol, baloncesto, tenis, etc.) con sus cuotas correspondientes.  
- Insertar **al menos 5 apuestas** que referencien usuarios y eventos mediante sus **_id**.

---

## 🔍 Consultas Básicas (1 pt)

1. Mostrar todas las **apuestas registradas**.  
2. Mostrar todos los **eventos de un deporte específico** (por ejemplo, “fútbol”).  
3. Mostrar los **usuarios con saldo superior** a un valor dado (por ejemplo, mayor a `50000`).

---

## 🎯 Consultas con Filtros y Proyecciones (1.5 pts)

1. Mostrar las **apuestas con estado “en curso”**, mostrando solo:
   - nombre del usuario  
   - deporte  
   - posible ganancia  

2. Mostrar los **eventos cuya `cuota_local` sea mayor a 2.0**.  
3. Mostrar el **correo y país de los usuarios** que hayan apostado en **eventos de baloncesto**.

---

## 🔄 Actualizaciones (1.5 pts)

1. **Actualizar el saldo** de un usuario después de ganar una apuesta (sumando la ganancia).  
2. **Cambiar el estado** de una apuesta a “ganada” o “perdida”.  
3. **Modificar la `cuota_visitante`** de un evento deportivo.

---

## ❌ Eliminaciones (0.5 pts)

1. Eliminar un **evento que ya haya finalizado**.  
2. Eliminar un **usuario** (y opcionalmente, todas sus apuestas).

---

## 📊 Consultas con Agregaciones (1 pt)

1. Calcular el **total apostado por cada usuario**.  
2. Calcular el **promedio de cuotas por deporte**.  
3. Mostrar los **usuarios con mayor ganancia acumulada**.

---

## 🔗 Consulta con `$lookup` (1 pt)

Realizar una consulta que una las colecciones `apuestas`, `usuarios` y `eventos` para mostrar:

| Campo | Descripción |
|-------|--------------|
| `nombre` | Nombre del usuario |
| `deporte` | Deporte del evento |
| `monto_apostado` | Monto de la apuesta |
| `posible_ganancia` | Ganancia potencial |
| `estado` | Estado de la apuesta |

---

## 📦 Tecnologías sugeridas
- MongoDB
- Mongo Shell o Compass
- Node.js (opcional para integrar consultas)

---

## ✍️ Autor
**[Yohan]**  
Curso: *Bases de Datos NoSQL*  
Fecha: *[10/11/2025]*

---

