<template>
  <q-dialog ref="dialogRef" position="bottom" >
    <q-card style="min-height: 80dvh" class="column">
      <q-form @submit="submitPlayers" class="col column">
        <q-card-section class="q-pt-sm text-center">
          <q-separator color="primary" spaced style="width: 100px" class="q-mx-auto" size="2px"/>
          <div class="flex justify-between items-center q-pt-sm no-wrap">
            <div>
              <div class="text-xl text-weight-bold ellipsis-2-lines">{{game.name}}</div>
              <div class="text-xxs text-grey-7">
                {{ game.minPlayers }} - {{ game.maxPlayers }} jugadores
              </div>

            </div>
            <div class="flex q-gutter-x-md no-wrap">
              <q-btn
                  icon="o_group_add"
                  flat
                  rounded
                  padding="0.8rem"
                  color="secondary"
                  @click="addPlayer"
              />
              <q-btn
                  type="submit"
                  rounded
                  padding="0.8rem"
                  icon="o_play_arrow"
                  color="primary"
              />
            </div>
          </div>
          <q-chip v-if="allowOverflow" label="(límite superado manualmente)" :icon="ionWarningOutline" color="yellow-1" text-color="yellow-10" class="text-weight-bold"/>
        </q-card-section>
        <q-card-section class="q-mb-auto q-gutter-y-md">
          <div v-for="(player, index) in players" :key="index" >
            <q-input
              v-model="players[index]"
              outlined
              dense
              :placeholder="`Jugador ${index + 1}`"
              clearable
              hideBottomSpace
              :rules="[mandatory()]"
            >
              <template v-if="players.length > game.minPlayers" #after>
                <q-btn flat round dense icon="close" color="negative" @click="removePlayer(index)" />
              </template>
            </q-input>
          </div>
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'
import {gameModel} from "src/utils/gameOptions";
import {ref} from "vue";
import {mandatory} from "src/commons/inputsValidators";
import useToast from "src/composables/useToast";
import {ionWarningOutline} from "@quasar/extras/ionicons-v8";

const { dialogRef, onDialogOK } = useDialogPluginComponent()

const props = defineProps<{
  game: gameModel
  initialPlayers?: string[]
}>()

const { showToastWithBtn } = useToast();
const players = ref<string[]>(
  props.initialPlayers?.length
    ? [...props.initialPlayers]
    : Array.from({length: props.game.minPlayers}, () => '')
)
const allowOverflow = ref(false)

function addPlayer() {
  if (!allowOverflow.value && players.value.length >= props.game.maxPlayers) {
    showToastWithBtn(
      `El máximo de jugadores es ${props.game.maxPlayers}`,
      'warning',
      'Agregar igual',
      () => {
        allowOverflow.value = true
        players.value.push('')
      },
      true
    )
    return
  }
  players.value.push('')
}

function removePlayer(index: number) {
  if (players.value.length <= props.game.minPlayers) return

  players.value.splice(index, 1)
}

function submitPlayers() {
  onDialogOK(players.value)
}
</script>
