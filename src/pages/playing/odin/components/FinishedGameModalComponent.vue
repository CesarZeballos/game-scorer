<template>
  <q-dialog ref="dialogRef" no-backdrop-dismiss no-esc-dismiss>
    <q-card class="q-pa-md" style="width: 360px; max-width: 95vh">
      <q-card-section class="text-center q-pb-none">
        <q-icon size="96px" name="o_emoji_events" color="secondary" />
      </q-card-section>

      <q-card-section class="text-center column q-gutter-y-md">
        <div class="text-sm text-weight-bold">Juego finalizado</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-list separator>
          <q-item v-for="(player, index) in ranking" :key="player.player.uid" dense>
            <q-item-section avatar>
              <q-icon :name="getPositionIcon(index)" :color="player.totalScore >= 15 ? 'negative' : undefined" />
            </q-item-section>
            <q-item-section :class="player.totalScore >= 15 ? 'text-negative' : ''">
              {{ player.player.name }}
            </q-item-section>
            <q-item-section side class="text-weight-bold" :class="player.totalScore >= 15 ? 'text-negative' : ''">
              {{ player.totalScore }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-actions>
        <q-btn
            label="Iniciar nuevo juego"
            class="full-width text-weight-bold"
            no-caps
            padding="0.5rem"
            @click="onDialogOK"
            rounded
          color="primary"
        />
        <q-btn
            class="full-width q-mt-md text-weight-bold"
            text-color="secondary"
            no-caps
            padding="0.5rem"
            unelevated
            @click="onDialogHide"
            rounded
            outline
            label="Cancelar"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'
import { PlayerCardModel } from 'stores/models/gamesStoreModels'

const { dialogRef, onDialogOK, onDialogHide } = useDialogPluginComponent()

defineProps<{
  ranking: PlayerCardModel[]
}>()

function getPositionIcon(index: number) {
  const position = index + 1
  const boundedPosition = Math.min(Math.max(position, 1), 9)
  return `sym_o_counter_${boundedPosition}`
}
</script>

<style lang="scss" scoped>
.q-card {
  border-radius: 20px !important;
}
</style>
