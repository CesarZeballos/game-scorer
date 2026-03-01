<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar class="q-my-sm safe-top">
      <q-btn
        icon="close"
        round
        color="secondary"
        textColor="white"
        @click="onFinishGame()"
        />
      <div class="text-weight-bold full-width text-center text-xl">
        {{actualGame?.name || 'sin juego'}}
      </div>
      <q-btn
        icon="replay"
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
import {useRouter} from "vue-router";

const router = useRouter();
const {actualGame, resetGame, finishGame} = useGameStore();

function onFinishGame() {
  void router.push({name: 'gameSelector'})
  finishGame()
}
</script>
