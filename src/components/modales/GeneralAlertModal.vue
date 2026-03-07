<template>
  <q-dialog ref="dialogRef" no-backdrop-dismiss no-esc-dismiss>
    <q-card class="q-pa-md" style="width: 360px; max-width: 95vh">
      <q-card-section v-if="icon" class="text-center q-pb-none">
        <q-icon size="96px" :name="icon" :color="iconColor"/>
      </q-card-section>
      <q-card-section class="text-center column q-gutter-y-md">
        <div class="text-sm text-weight-bold">{{title}}</div>
        <div class="text-xs">{{message}}</div>
      </q-card-section>
      <q-card-actions>
        <q-btn
          :color="btnBg"
          :label="btnText"
          class="full-width text-weight-bold"
          no-caps
          padding="0.5rem"
          @click="onDialogOK"
          rounded
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
          :label="btnCancelText"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';

defineProps({
  icon: {
    type: String,
  },
  iconColor: {
    type: String,
    default: 'secondary'
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  btnText: {
    type: String,
    required: true,
  },
  btnBg: {
    type: String,
    required: true,
  },
  btnCancelText: {
    type: String,
    default: 'Cancelar',
  },
})

const { dialogRef, onDialogOK, onDialogHide } = useDialogPluginComponent();
</script>

<style lang="scss" scoped>
.q-card {
  border-radius: 20px !important;
}
</style>
