<template>
  <q-dialog ref="dialogRef" position="bottom" >
    <q-card style="min-height: 80dvh" class="column">
      <q-form @submit="submitRound" class="col column">
        <q-card-section class="q-pt-sm text-center">
          <q-separator color="primary" spaced style="width: 100px" class="q-mx-auto" size="2px"/>
          <div class="flex justify-between items-center q-pt-sm no-wrap">
            <div class="text-xl text-weight-bold">
              Ronda n{{ rounds.length + 1 }}
            </div>
            <div class="flex q-gutter-x-md no-wrap">
              <q-btn
                  icon="arrow_downward"
                  type="submit"
                  rounded
                  no-caps
                  color="primary"
                  padding="0.8rem"
              />
            </div>
          </div>
        </q-card-section>
        <q-card-section class="q-mb-auto q-gutter-y-md">
          <div
              v-for="p in roundPlayers"
              :key="p.playerUid"
              class="flex items-center justify-between no-wrap"
          >
            <div
                :class="'text-' + p.color"
                class="text-weight-bold text-xl q-mb-xs"
            >
              {{ p.name }}
            </div>

            <ScoreInputComponent v-model="p.score" :color="p.color" />
          </div>
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import { useGameStore } from 'stores/games-store'
import ScoreInputComponent from 'components/commons/ScoreInputComponent.vue'

const { dialogRef, onDialogOK } = useDialogPluginComponent()

const gameStore = useGameStore()
const { players, rounds, addRound } = gameStore

interface RoundPlayerInput {
  playerUid: string
  name: string
  color: string
  score: number
}

const roundPlayers = ref<RoundPlayerInput[]>(
    players.map(p => ({
      playerUid: p.uid,
      name: p.name,
      color: p.color,
      score: 0
    }))
)

function submitRound() {
  const payload = roundPlayers.value.map(p => ({
    playerId: p.playerUid,
    roundScore: Number(p.score) || 0
  }))

  addRound(payload)
  onDialogOK()
}
</script>
