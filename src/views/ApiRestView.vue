<script setup lang="ts">
import { onMounted, ref } from 'vue'

type User = { id?: number; name: string; email: string }
type Post = { id?: number; title: string; body: string }

const API_BASE = 'http://localhost:3000'

const users = ref<User[]>([])
const posts = ref<Post[]>([])
const error = ref('')
const loadingUsers = ref(false)
const loadingPosts = ref(false)

const userForm = ref<User>({ name: '', email: '' })
const postForm = ref<Post>({ title: '', body: '' })
const editingUserId = ref<number | null>(null)
const editingPostId = ref<number | null>(null)

const request = async <T,>(url: string, options?: RequestInit) => {
  error.value = ''
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }

  return (await response.json()) as T
}

const loadUsers = async () => {
  loadingUsers.value = true
  try {
    users.value = await request<User[]>(`${API_BASE}/users`)
  } catch (err) {
    error.value = `사용자 불러오기 실패: ${(err as Error).message}`
  } finally {
    loadingUsers.value = false
  }
}

const loadPosts = async () => {
  loadingPosts.value = true
  try {
    posts.value = await request<Post[]>(`${API_BASE}/posts`)
  } catch (err) {
    error.value = `게시글 불러오기 실패: ${(err as Error).message}`
  } finally {
    loadingPosts.value = false
  }
}

const resetUserForm = () => {
  userForm.value = { name: '', email: '' }
  editingUserId.value = null
}

const resetPostForm = () => {
  postForm.value = { title: '', body: '' }
  editingPostId.value = null
}

const saveUser = async () => {
  const payload = { name: userForm.value.name.trim(), email: userForm.value.email.trim() }
  if (!payload.name || !payload.email) return

  try {
    if (editingUserId.value) {
      await request<User>(`${API_BASE}/users/${editingUserId.value}`, {
        method: 'PUT',
        body: JSON.stringify({ id: editingUserId.value, ...payload }),
      })
    } else {
      await request<User>(`${API_BASE}/users`, {
        method: 'POST',
        body: JSON.stringify(payload),
      })
    }
    resetUserForm()
    await loadUsers()
  } catch (err) {
    error.value = `사용자 저장 실패: ${(err as Error).message}`
  }
}

const editUser = (user: User) => {
  userForm.value = { name: user.name, email: user.email }
  editingUserId.value = user.id ?? null
}

const deleteUser = async (id?: number) => {
  if (!id) return
  try {
    await request(`${API_BASE}/users/${id}`, { method: 'DELETE' })
    await loadUsers()
  } catch (err) {
    error.value = `사용자 삭제 실패: ${(err as Error).message}`
  }
}

const savePost = async () => {
  const payload = { title: postForm.value.title.trim(), body: postForm.value.body.trim() }
  if (!payload.title || !payload.body) return

  try {
    if (editingPostId.value) {
      await request<Post>(`${API_BASE}/posts/${editingPostId.value}`, {
        method: 'PUT',
        body: JSON.stringify({ id: editingPostId.value, ...payload }),
      })
    } else {
      await request<Post>(`${API_BASE}/posts`, {
        method: 'POST',
        body: JSON.stringify(payload),
      })
    }
    resetPostForm()
    await loadPosts()
  } catch (err) {
    error.value = `게시글 저장 실패: ${(err as Error).message}`
  }
}

const editPost = (post: Post) => {
  postForm.value = { title: post.title, body: post.body }
  editingPostId.value = post.id ?? null
}

const deletePost = async (id?: number) => {
  if (!id) return
  try {
    await request(`${API_BASE}/posts/${id}`, { method: 'DELETE' })
    await loadPosts()
  } catch (err) {
    error.value = `게시글 삭제 실패: ${(err as Error).message}`
  }
}

onMounted(async () => {
  await Promise.all([loadUsers(), loadPosts()])
})
</script>

<template>
  <v-container class="py-8">
    <v-row justify="center">
      <v-col cols="12" lg="10">
        <v-card class="mb-6">
          <v-card-title>REST CRUD (json-server)</v-card-title>
          <v-card-subtitle>사용자 / 게시글</v-card-subtitle>
          <v-card-text>
            <v-alert v-if="error" type="error" variant="tonal" class="mb-4">
              {{ error }}
            </v-alert>
            <v-chip color="grey" variant="tonal">API: {{ API_BASE }}</v-chip>
          </v-card-text>
        </v-card>

        <v-row>
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>사용자</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="saveUser">
                  <v-text-field v-model="userForm.name" label="이름" variant="outlined" />
                  <v-text-field v-model="userForm.email" label="이메일" variant="outlined" />
                  <div class="d-flex align-center ga-3">
                    <v-btn color="green" variant="flat" type="submit">
                      {{ editingUserId ? '수정' : '추가' }}
                    </v-btn>
                    <v-btn color="grey" variant="tonal" type="button" @click="resetUserForm">
                      초기화
                    </v-btn>
                  </div>
                </v-form>

                <v-divider class="my-4" />

                <v-progress-linear v-if="loadingUsers" indeterminate color="green" />
                <v-list v-else density="compact">
                  <v-list-item
                    v-for="user in users"
                    :key="user.id"
                    :title="user.name"
                    :subtitle="user.email"
                  >
                    <template #append>
                      <v-btn size="small" variant="text" @click="editUser(user)">수정</v-btn>
                      <v-btn size="small" variant="text" color="red" @click="deleteUser(user.id)">
                        삭제
                      </v-btn>
                    </template>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>게시글</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="savePost">
                  <v-text-field v-model="postForm.title" label="제목" variant="outlined" />
                  <v-textarea v-model="postForm.body" label="내용" variant="outlined" />
                  <div class="d-flex align-center ga-3">
                    <v-btn color="green" variant="flat" type="submit">
                      {{ editingPostId ? '수정' : '추가' }}
                    </v-btn>
                    <v-btn color="grey" variant="tonal" type="button" @click="resetPostForm">
                      초기화
                    </v-btn>
                  </div>
                </v-form>

                <v-divider class="my-4" />

                <v-progress-linear v-if="loadingPosts" indeterminate color="green" />
                <v-list v-else density="compact">
                  <v-list-item v-for="post in posts" :key="post.id" :title="post.title">
                    <template #subtitle>
                      <span>{{ post.body }}</span>
                    </template>
                    <template #append>
                      <v-btn size="small" variant="text" @click="editPost(post)">수정</v-btn>
                      <v-btn size="small" variant="text" color="red" @click="deletePost(post.id)">
                        삭제
                      </v-btn>
                    </template>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
