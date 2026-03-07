<template>
  <q-page padding class="column">
    <div class="q-gutter-y-md col">
      <PlayerCardComponent
        v-for="(p, index) in playersRanking"
        :key="p.player.uid"
        :player-data="p"
        :position="index + 1"
        :total-players="playersRanking.length"
      />
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
import {computed, ref, watch} from "vue";
import {useGameStore} from "stores/games-store";
import PlayerCardComponent from "components/cards/PlayerCardComponent.vue";
import {useQuasar} from "quasar";
import NewRoundOdinModalComponent from "pages/playing/odin/components/NewRoundOdinModalComponent.vue";
import {storeToRefs} from "pinia";
import FinishedGameModalComponent from "pages/playing/odin/components/FinishedGameModalComponent.vue";
import SetPlayersModal from "components/modales/SetPlayersModal.vue";
import GeneralAlertModal from "components/modales/GeneralAlertModal.vue";

const gameStore = useGameStore()
const { playersRanking, players, actualGame } = storeToRefs(gameStore)
const { resetGame, setNewGame } = gameStore
const {dialog} = useQuasar();
const isFinalDialogOpen = ref(false)
const FINISH_SCORE = 15

function newRound() {
  dialog({
    component: NewRoundOdinModalComponent
  })
}

const maxScore = computed(() => {
  return playersRanking.value.reduce((max, player) => {
    return Math.max(max, player.totalScore)
  }, 0)
})

watch(
  maxScore,
  (newValue, oldValue) => {
    const previousScore = oldValue ?? 0
    if (newValue >= FINISH_SCORE && previousScore < FINISH_SCORE) {
      openFinishedGameModal()
    }
  },
  { immediate: true }
)

function openFinishedGameModal() {
  if (isFinalDialogOpen.value) return

  isFinalDialogOpen.value = true
  dialog({
    component: FinishedGameModalComponent,
    componentProps: {
      ranking: playersRanking.value
    }
  })
    .onOk(() => {
      openRestartOptionsAlert()
    })
    .onDismiss(() => {
      isFinalDialogOpen.value = false
    })
}

function openRestartOptionsAlert() {
  const game = actualGame.value
  if (!game) return

  const currentPlayers = players.value.map((player) => player.name)
  let keepSamePlayers = false

  dialog({
    component: GeneralAlertModal,
    componentProps: {
      icon: 'o_group',
      title: 'Iniciar nuevo juego',
      message: '¿Siguen jugando los mismos jugadores?',
      btnText: 'Sí, mismos jugadores',
      btnCancelText: 'No, jugadores distintos',
      btnBg: 'primary',
    }
  })
    .onOk(() => {
      keepSamePlayers = true
      resetGame()
    })
    .onDismiss(() => {
      if (keepSamePlayers) return

      dialog({
        component: SetPlayersModal,
        componentProps: {
          game,
          initialPlayers: currentPlayers
        }
      }).onOk((playerNames: string[]) => {
        setNewGame(game.id, playerNames)
      })
    })
}
</script>
