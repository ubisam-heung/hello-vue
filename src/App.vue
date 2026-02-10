<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <v-app-bar color="green-darken-1" density="comfortable" flat>
      <v-app-bar-title>유비샘-조흥재연구원</v-app-bar-title>
      <v-spacer />
      <v-btn to="/" variant="text">메인</v-btn>
      <v-btn to="/about" variant="text">소개</v-btn>
      <v-btn to="/apiRest" variant="text">API</v-btn>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>
