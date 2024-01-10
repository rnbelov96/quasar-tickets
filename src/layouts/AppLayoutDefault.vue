<template>
  <div class="app_layout">
    <DefaultHeader />
    <div class="container">
      <q-breadcrumbs class="breadcrumbs" v-if="breadcrumbs.length !== 0">
        <q-breadcrumbs-el
          :key="breadcrumb.text"
          v-for="breadcrumb in breadcrumbs"
          :label="breadcrumb.text"
          :to="breadcrumb.to"
        />
      </q-breadcrumbs>
      <slot />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import DefaultHeader from "./DefaultHeader.vue";
import { computed } from "vue";

const route = useRoute();

const breadcrumbs = computed(() => route.meta.breadcrumbs || []);
</script>

<style lang="scss" scoped>
.app_layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  display: flex;
  flex-grow: 1;
}

.breadcrumbs {
  margin-top: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 640px) {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
}
</style>
