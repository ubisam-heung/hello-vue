<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const profile = ref<{ name: string; email: string } | null>(null)
const STORAGE_KEY = 'userProfile'

const loadProfile = () => {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    profile.value = null
    return
  }

  try {
    const data = JSON.parse(raw) as { name?: string; email?: string }
    const name = data.name?.trim() ?? ''
    const email = data.email?.trim() ?? ''
    profile.value = name || email ? { name, email } : null
  } catch {
    profile.value = null
  }
}

const nameText = computed(() => profile.value?.name || '설정되지 않음')
const emailText = computed(() => profile.value?.email || '설정되지 않음')

onMounted(loadProfile)
</script>

<template>
  <v-container class="py-8">
    <v-row justify="center">
      <v-col cols="12" md="6" lg="5">
        <v-card>
          <v-card-title>내 정보</v-card-title>
          <v-card-subtitle>홈페이지에 저장된 값입니다.</v-card-subtitle>

          <v-card-text>
            <v-list density="compact">
              <v-list-item title="이름" :subtitle="nameText" />
              <v-list-item title="이메일" :subtitle="emailText" />
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
