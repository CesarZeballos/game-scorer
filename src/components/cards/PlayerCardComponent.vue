<template>
  <q-card :class="'bg-' + playerData.player.color">
    <q-card-section class="text-xxl text-weight-bold flex no-wrap justify-between">
      <div class="text-white">
        {{playerData.player.name}}</div>
      <div class="text-white">
        {{playerData.totalScore}}
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import {PlayerCardModel} from "stores/models/gamesStoreModels";

defineProps<{
  playerData: PlayerCardModel,
  position: number
}>()
</script>
