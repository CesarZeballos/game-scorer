# 🎲 Board Game Score Tracker

Minimalist web app para contar puntos en juegos de mesa sin discusiones eternas ni hojas volando por la mesa.

Construido con **Quasar + Vue + Pinia**, pensado para ser claro, rápido y fácil de extender para futuros juegos.

---

## ✨ Objetivo del proyecto

Crear un contador de puntos simple, legible desde lejos y adaptable a distintos juegos de mesa.

El enfoque es **MVP primero**:

* Sin features innecesarias
* Sin librerías externas raras
* 100% Quasar
* Código limpio y escalable

---

## 🚀 Funcionalidades actuales (MVP)

* Crear una partida
* Agregar participantes
* Agregar rondas con puntaje por jugador
* Editar rondas existentes
* Ver historial de rondas
* Puntaje total visible en cards grandes
* Jugadores ordenados por menor puntaje
* Indicadores visuales:

    * 🏆 jugador con menos puntos
    * 🚽 jugador con más puntos
* Guardado automático en LocalStorage

Diseñado para verse claro desde la otra punta de la mesa.

---

## 🧠 UX Principles

* **Total siempre visible** → nadie pregunta quién va perdiendo
* **Historial colapsable** → fácil corregir errores
* **Cards grandes** → legible desde lejos
* **Modal bottom-sheet** → cómodo en mobile
* **Minimalismo** → menos fricción, más juego

---

## 🛠️ Stack

* Vue 3
* Quasar Framework
* Pinia
* TypeScript (opcional pero recomendado)
* LocalStorage

---

## 📁 Estructura sugerida

```
src/
 ├─ components/
 │   ├─ PlayerCard.vue
 │   ├─ RoundDialog.vue
 │   └─ RoundHistory.vue
 │
 ├─ pages/
 │   └─ GamePage.vue
 │
 ├─ stores/
 │   └─ gameStore.ts
 │
 ├─ models/
 │   └─ game.ts
 │
 └─ utils/
     └─ scoreHelpers.ts
```

---

## 📊 Modelo de datos

```ts
Player {
  id: string
  name: string
}

Round {
  id: string
  scores: Record<PlayerId, number>
}

Game {
  players: Player[]
  rounds: Round[]
}
```

👉 Los totales **NO se guardan**. Se calculan dinámicamente.

---

## ▶️ Instalación

```bash
npm install
quasar dev
```

Build producción:

```bash
quasar build
```

---

## 🧪 Roadmap

### Próximo Sprint

* Vista alternativa tipo tabla (jugadores columnas / rondas filas)
* Configuración por juego
* Detectar automáticamente quién pierde según regla
* Exportar/importar partidas

### Futuro

* Soporte multi‑juego
* Sincronización entre dispositivos
* Modo torneo
* Estadísticas

---

## 🎯 Filosofía del proyecto

> Si necesita tutorial, está mal diseñado.

La app tiene que poder usarse en 10 segundos mientras alguien reparte cartas.

---

## 🤝 Contribuciones

PRs bienvenidos si cumplen:

* Mantener minimalismo
* No agregar dependencias innecesarias
* Mantener componentes reutilizables

---

## 🧉 Licencia

Libre para usar, modificar y mejorar.
Porque discutir puntos en juegos de mesa ya es suficientemente difícil 😄
