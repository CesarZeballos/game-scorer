<template>
  <q-page padding class="column">
    <div class="q-gutter-y-md col">
      <PlayerCardComponent v-for="(p, index) in playersRanking" :key="p.player.uid" :playerData="p" :position="index + 1" />
    </div>
    <div class="q-mb-lg">
      <q-btn
          label="Cargar ronda"
          rounded
          no-caps
          icon="add"
          color="primary"
          class="text-weight-bold full-width"
          @click="newRound()"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import {useGameStore} from "stores/games-store";
import PlayerCardComponent from "components/cards/PlayerCardComponent.vue";
import {useQuasar} from "quasar";
import NewRoundOdinModalComponent from "pages/playing/odin/components/NewRoundOdinModalComponent.vue";
import {storeToRefs} from "pinia";

const gameStore = useGameStore()
const { playersRanking } = storeToRefs(gameStore)
const {dialog} = useQuasar();

function newRound() {
  dialog({
    component: NewRoundOdinModalComponent
  })
}
</script>
