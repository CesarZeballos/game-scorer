<template>
  <q-dialog ref="dialogRef" position="bottom" >
    <q-card style="min-height: 80dvh" class="column">
      <q-card-section class="text-weight-bold text-center text-xl q-pt-sm">
        <q-separator color="primary" spaced style="width: 100px" class="q-mx-auto" size="2px"/>
        <div class="q-pt-sm text-primary">
          Ronda n{{rounds.length + 1}}
        </div>
      </q-card-section>
      <q-form @submit="submitRound" class="col column">
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

            <q-input
                v-model.number="p.score"
                type="text"
                outlined
                hideBottomSpace
                bg-color="white"
                :color="p.color"
                :input-class="'text-weight-bold text-xl text-center text-' + p.color"
                style="width: 150px"
                mask="##"
            >
              <template v-slot:prepend>
                <q-icon name="o_remove" @click="p.score--" class="cursor-pointer" />
              </template>
              <template v-slot:append>
                <q-icon name="o_add" @click="p.score++" class="cursor-pointer" />
              </template>
            </q-input>
          </div>
        </q-card-section>
        <q-card-actions class="q-mb-lg q-gutter-y-md">
          <q-btn
              label="Guardar Ronda"
              type="submit"
              rounded
              no-caps
              color="primary"
              class="text-weight-bold full-width"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import { useGameStore } from 'stores/games-store'

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
