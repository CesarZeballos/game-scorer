<template>
  <q-layout view="hHh Lpr fFf">
    <PlayingNavBarComponent />
    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>
<script setup lang="ts">
import PlayingNavBarComponent from "components/commons/PlayingNavBarComponent.vue";
</script>
