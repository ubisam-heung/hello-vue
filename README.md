# myvue

Vue 3 + Vite 기반의 간단한 프로필 입력 앱과 json-server CRUD 데모를 포함한 프로젝트입니다.

## 기술 스택

- Vue 3 + TypeScript
- Vite
- Vue Router
- Vuetify (UI)
- json-server (REST CRUD 목업 API)

## 기능

- 프로필 입력 (이름/이메일) 및 로컬 저장
- About 페이지에서 저장된 값 확인
- `/apiRest`에서 Users/Posts CRUD 데모

## 폴더 구조 요약

- src/views/HomeView.vue: 프로필 입력
- src/views/AboutView.vue: 저장된 값 표시
- src/views/ApiRestView.vue: json-server CRUD 데모
- db.json: json-server 데이터

## 설치

```sh
npm install
```

## 실행

### 1) 프론트 실행

```sh
npm run dev
```

### 2) json-server 실행

```sh
npm run api
```

## 사용 방법

- Home: 이름/이메일 입력 후 저장
- About: 저장된 값 확인
- API: `/apiRest`에서 Users/Posts CRUD 테스트

## 개발 시 참고

- json-server 기본 포트: 3000
- Vite 기본 포트: 5173
- 데이터 파일: `db.json`


## 문제 해결

- `npm run api`가 실패하면 `db.json` 경로와 포트를 확인하세요.
- 포트가 충돌하면 `db.json` 서버 포트를 바꿔 실행할 수 있습니다.
	- 예: `json-server --watch db.json --port 3001`

