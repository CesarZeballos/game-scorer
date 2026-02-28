<template>
  <q-header elevated class="bg-primary text-white q-px-md ">
    <q-toolbar class="q-my-sm safe-top">
      <q-btn
        icon="close"
        round
        color="secondary"
        textColor="white"
        @click="finishGame()"
        />
      <div class="text-weight-bold full-width">
        {{actualGame?.name || 'sin juego'}}
      </div>
      <q-btn
        icon="close"
        round
        color="secondary"
        textColor="white"
        @click="resetGame()"
        />
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">

import {useGameStore} from "stores/games-store";

const {actualGame, resetGame, finishGame} = useGameStore();
</script>
