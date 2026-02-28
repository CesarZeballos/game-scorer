<template>
  <q-dialog ref="dialogRef" position="bottom" >
    <q-card style="min-height: 80dvh" class="column">
      <q-card-section class="text-weight-bold text-center text-xl q-pt-sm">
        <q-separator color="primary" spaced style="width: 100px" class="q-mx-auto" size="2px"/>
        <div class="q-pt-sm">
          {{game.name}}
        </div>
      </q-card-section>
      <q-form @submit="submitPlayers" class="col column">
        <q-card-section class="q-mb-auto q-gutter-y-md">
          <div v-for="(player, index) in players" :key="index" >
            <q-input v-model="players[index]" outlined dense :placeholder="`Jugador ${index + 1}`" clearable>
              <template v-if="players.length > 2" #after>
                <q-btn flat round dense icon="close" color="negative" @click="removePlayer(index)" />
              </template>
            </q-input>
          </div>
        </q-card-section>
        <q-card-actions class="q-mb-lg q-gutter-y-md">
          <q-btn
              label="Agregar jugador"
              icon="add"
              flat
              rounded
              no-caps
              color="secondary"
              class="text-weight-bold full-width"
              @click="addPlayer"
          />
          <q-btn
              label="Empezar la partida"
              type="submit"
              rounded
              no-caps
              icon="o_play_arrow"
              color="primary"
              class="text-weight-bold full-width"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'
import {gameModel} from "src/utils/gameOptions";
import {ref} from "vue";

const { dialogRef, onDialogOK } = useDialogPluginComponent()

defineProps<{
  game: gameModel
}>()

const players = ref<string[]>([
    '', ''
])

function addPlayer() {
  players.value.push('')
}

function removePlayer(index: number) {
  if (players.value.length <= 2) return

  players.value.splice(index, 1)
}

function submitPlayers() {
  onDialogOK(players.value)
}
</script>