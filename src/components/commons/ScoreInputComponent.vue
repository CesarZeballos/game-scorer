<template>
  <q-input
    v-model.number="score"
    type="text"
    outlined
    hide-bottom-space
    bg-color="white"
    :color="color"
    :input-class="'text-weight-bold text-xl text-center text-' + color"
    style="width: 150px"
    mask="##"
  >
    <template #prepend>
      <q-icon name="o_remove" class="cursor-pointer" @click="decrement" :aria-disabled="score === 0" color="negative" />
    </template>
    <template #append>
      <q-icon name="o_add" class="cursor-pointer" @click="increment" color="positive"/>
    </template>
  </q-input>
</template>

<script setup lang="ts">
defineProps<{
  color: string
}>()

const score = defineModel<number>({
  required: true
})

function increment() {
  score.value ++
}

function decrement() {
  if (score.value === 0) return
  score.value --
}
</script>
