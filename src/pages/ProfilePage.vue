<template>
  <div v-if="userData" class="profile">
    <div class="profile__data-box">
      <q-input v-model="userData.name" label="Имя" :readonly="isReadOnly" />
    </div>
    <div class="profile__data-box">
      <q-input
        v-model="userData.lastName"
        label="Фамилия"
        :readonly="isReadOnly"
      />
    </div>
    <div class="profile__data-box">
      <q-input v-model="userData.birthday" label="Дата рождения" readonly />
      <q-date
        v-if="!isReadOnly"
        v-model="userData.birthday"
        :mask="'DD.MM.YYYY'"
        :locale="localDates"
        :options="options"
        class="profile__datepicker"
      />
    </div>
    <div class="profile__data-box">
      <q-input
        v-if="isReadOnly"
        v-model="userData.city"
        label="Город"
        :readonly="isReadOnly"
      />
      <q-select
        v-else
        v-model="userData.city"
        :options="citiesList"
        label="Город"
      />
    </div>
    <q-btn
      v-if="!isReadOnly"
      label="Сохранить"
      type="submit"
      color="primary"
      @click="saveResult"
      class="profile__submit-btn"
    />
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useAuthStore } from "src/stores/auth";
import { useProfileStore } from "src/stores/profile";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const profileStore = useProfileStore();
const authStore = useAuthStore();
const $q = useQuasar();
const route = useRoute();
const router = useRouter();

const userData = ref(null);
const isReadOnly = computed(() => {
  return Number(route.params.id) !== Number(authStore.getUserAttribute('id'));
});

const getUserData = async () => {
  const responseMessage = await profileStore.getUserById(route.params.id);

  if (responseMessage !== "ok") {
    router.push({ name: "Home" });
    return;
  }

  userData.value = {
    ...profileStore.userData,
  };
};

const localDates = {
  days: [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
  ],
  daysShort: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
  months: [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ],
  monthsShort: [
    "Янв",
    "Фев",
    "Мар",
    "Апр",
    "Май",
    "Июн",
    "Июл",
    "Авг",
    "Сен",
    "Окт",
    "Ноя",
    "Дек",
  ],
};
const citiesList = ["Казань", "Москва", "Санкт-Петербург"];
const options = (date) => {
  return new Date(date).getTime() <= new Date().getTime();
};
const saveResult = async () => {
  const responseMessage = await profileStore.updateUserData(userData);

  if (responseMessage !== "ok") {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: responseMessage,
    });
  } else {
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: "Submitted",
    });
  }
};

getUserData();
</script>

<style lang="scss" scoped>
.profile__data-box {
  margin-top: 1rem;
}

.profile__datepicker {
  margin-top: 0.5rem;
}

.profile__submit-btn {
  margin-top: 1rem;
}
</style>
