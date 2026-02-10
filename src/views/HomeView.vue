<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const feedback = ref('')
const STORAGE_KEY = 'userProfile'
let feedbackTimer: number | undefined

const loadProfile = () => {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return

  try {
    const data = JSON.parse(raw) as { name?: string; email?: string }
    name.value = data.name ?? ''
    email.value = data.email ?? ''
  } catch {
    name.value = ''
    email.value = ''
  }
}

const saveProfile = () => {
  const nextProfile = { name: name.value.trim(), email: email.value.trim() }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProfile))
  name.value = ''
  email.value = ''
  feedback.value = '저장되었어요!'

  if (feedbackTimer) {
    window.clearTimeout(feedbackTimer)
  }
  feedbackTimer = window.setTimeout(() => {
    feedback.value = ''
  }, 2000)
}

const handleLoad = () => {
  loadProfile()
  feedback.value = '불러왔어요!'

  if (feedbackTimer) {
    window.clearTimeout(feedbackTimer)
  }
  feedbackTimer = window.setTimeout(() => {
    feedback.value = ''
  }, 2000)
}
</script>

<template>
  <v-container class="py-8">
    <v-row justify="center">
      <v-col cols="12" md="6" lg="5">
        <v-card>
          <v-card-title>내 프로필</v-card-title>
          <v-card-subtitle>이름과 이메일은 이 브라우저에 로컬로 저장됩니다.</v-card-subtitle>

          <v-card-text>
            <v-form @submit.prevent="saveProfile">
              <v-text-field
                v-model="name"
                label="이름"
                placeholder="당신의 이름을 입력하세요"
                autocomplete="name"
                variant="outlined"
                class="mb-4"
              />

              <v-text-field
                v-model="email"
                label="이메일"
                type="email"
                placeholder="you@example.com"
                autocomplete="email"
                variant="outlined"
                class="mb-4"
              />

              <div class="d-flex align-center ga-3">
                <v-btn color="green" variant="flat" type="submit">저장</v-btn>
                <v-btn color="grey" variant="tonal" type="button" @click="handleLoad">
                  불러오기
                </v-btn>
              </div>

              <v-alert
                v-if="feedback"
                class="mt-4"
                type="success"
                variant="tonal"
                density="compact"
                role="status"
                aria-live="polite"
              >
                {{ feedback }}
              </v-alert>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
