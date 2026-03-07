<template>
  <q-card :class="'bg-' + playerData.player.color">
    <q-expansion-item
        expand-separator
        dense
        hide-expand-icon
    >
      <template #header>
        <q-item-section>
          <div class="text-xxl text-weight-bold flex no-wrap justify-between">
            <div class="text-white">
              {{ playerData.player.name }}
            </div>
            <div class="text-white">
              {{ playerData.totalScore }}
            </div>
          </div>
        </q-item-section>
      </template>

      <q-card-section class="q-pt-none">
        <q-list separator>
          <q-item v-for="round in playerData.history" :key="round.roundNumber" dense>
            <q-item-section class="text-white">
              Ronda {{ round.roundNumber }}
            </q-item-section>
            <q-item-section side class="text-white text-weight-bold">
              {{ round.points }}
            </q-item-section>
          </q-item>
          <q-item v-if="!playerData.history.length" dense>
            <q-item-section class="text-grey-1 text-center">
              Sin rondas cargadas todavía
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-expansion-item>
  </q-card>
</template>

<script setup lang="ts">
import {PlayerCardModel} from "stores/models/gamesStoreModels";

defineProps<{
  playerData: PlayerCardModel,
  position: number
}>()
</script>
