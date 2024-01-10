<template>
  <q-form class="login-form" @submit="submit">
    <h2 class="login-form__title">Вход</h2>
    <q-input
      class="login-form__input"
      v-model="login"
      label="Логин"
      placeholder="admin"
    />
    <q-input
      v-model="password"
      label="Пароль"
      placeholder="admin"
      :type="isPwd ? 'password' : 'text'"
      class="login-form__input"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
    <q-btn
      :disabled="isBtnDisabled"
      label="Войти"
      type="submit"
      color="primary"
      class="login-form__btn"
    />
  </q-form>
</template>

<script setup>
import { computed, ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useAuthStore } from "src/stores/auth";

const router = useRouter();
const $q = useQuasar();
const authStore = useAuthStore();

const login = ref("");
const password = ref("");
const isPwd = ref(true);

const isBtnDisabled = computed(() => {
  return login.value.length === 0 || password.value.length === 0;
});

const submit = async () => {
  const responseMessage = await authStore.login(login.value, password.value);

  if (responseMessage !== "ok") {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: responseMessage,
    });
  } else {
    await authStore.getMe();
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: "Успешно",
    });
    router.push({ name: "Home" });
  }
};
</script>

<style lang="scss" scoped>
.login-form {
  border-radius: 0.25rem;
  max-width: 35rem;
  border: 1px solid rgba(112, 112, 112, 0.12);
  padding: 1.5rem;
  margin-left: auto;
  margin-right: auto;
  margin-top: 6rem;

  @media (max-width: 640px) {
    margin-top: 3rem;
  }
}

.login-form__title {
  margin-top: 0;
  font-weight: 500;
  font-size: 2rem;
  line-height: 1.3;
  text-align: center;
}

.login-form__input {
  margin-top: 1rem;
}

.login-form__btn {
  margin-top: 1rem;
  width: 100%;
}
</style>
