<template>
  <q-page padding class="column items-center justify-center q-col-gutter-y-md">
    <q-btn
        v-for="games in gameOptions"
        :key="games.id"
        :label="games.name"
        @click="goToGame(games)"
        rounded
        no-caps
        color="primary"
        class="text-weight-bold full-width"
      />
  </q-page>
</template>

<script setup lang="ts">
import {gameModel, gameOptions} from 'src/utils/gameOptions'
import {useQuasar} from "quasar";
import SetPlayersModal from "components/modales/SetPlayersModal.vue";
import {useGameStore} from "stores/games-store";
import {useRouter} from "vue-router";

const { dialog } = useQuasar();
const {setNewGame} = useGameStore();
const router = useRouter();

function goToGame(game: gameModel) {
  console.log(game)
  dialog({
    component: SetPlayersModal,
    componentProps: {
      game
    }
  }).onOk((res) => {
    setNewGame(game.id, res)
    void router.push({name: game.pageName})
  })
}
</script>
