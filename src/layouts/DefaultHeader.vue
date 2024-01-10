<template>
  <header class="header">
    <div class="container">
      <div class="header__content">
        <h3 class="header__title">Список тикетов</h3>
        <div class="header__avatar-box">
          <q-icon name="account_circle" size="4rem" color="white" />
          <q-menu style="width: 150px" anchor="bottom left" self="top left">
            <router-link
              :to="{
                name: 'Profile',
                params: { id: authStore.getUserAttribute('id') },
              }"
            >
              <q-item class="text-center" clickable v-close-popup>
                <q-item-section>Мой профиль</q-item-section>
              </q-item>
            </router-link>
            <router-link :to="{ name: 'Tickets' }">
              <q-item class="text-center" clickable v-close-popup>
                <q-item-section>Мои тикеты</q-item-section>
              </q-item>
            </router-link>
            <q-item class="text-center" clickable v-close-popup @click="logout">
              <q-item-section>Выйти</q-item-section>
            </q-item>
          </q-menu>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from "src/stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const logout = async () => {
  authStore.logout();
  router.replace({ name: "Login" });
};
</script>

<style lang="scss" scoped>
.header {
  background-color: var(--q-primary);
  min-height: 4rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  flex-shrink: 0;
}

.header__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header__title {
  margin-top: 0;
  margin-bottom: 0;
  color: white;
  font-size: 2.5rem;
  font-weight: 500;

  @media (max-width: 640px) {
    font-size: 1.5rem;
  }
}

.header__avatar-box {
  cursor: pointer;
}
</style>
