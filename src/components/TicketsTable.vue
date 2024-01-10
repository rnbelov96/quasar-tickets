<template>
  <q-table
    title="Список тикетов"
    :rows="ticketList"
    :columns="columns"
    row-key="name"
    :filter="filter"
    rows-per-page-label="Тикетов на странице"
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="user" :props="props">
          <router-link
            :to="{ name: 'Profile', params: { id: props.row.userData.id } }"
            class="ticket-table__link"
          >
            {{ `${props.row.userData.lastName} ${props.row.userData.name}` }}
          </router-link>
        </q-td>
        <q-td key="id" :props="props">
          {{ props.row.id }}
        </q-td>
        <q-td key="title" :props="props">
          {{ props.row.title }}
        </q-td>
        <q-td key="text" :props="props">
          {{ `${props.row.text.slice(0, 25)}...` }}
        </q-td>
        <q-td key="creationDate" :props="props">
          {{ props.row.normalizedCreationDate }}
        </q-td>
        <q-td key="details" :props="props">
          <router-link :to="{ name: 'Ticket', params: { id: props.row.id } }">
            <q-btn>Подробнее</q-btn>
          </router-link>
        </q-td>
      </q-tr>
    </template>
    <template v-slot:top-right>
      <q-input
        borderless
        dense
        debounce="300"
        v-model="filter"
        placeholder="Поиск"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
  </q-table>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  ticketList: {
    required: true,
    type: Array,
  },
});

const filter = ref("");

const columns = [
  {
    name: "user",
    required: true,
    label: "Автор тикета",
    align: "left",
    field: (row) => `${row.userData.lastName} ${row.userData.name}`,
    sortable: true,
  },
  {
    name: "id",
    align: "center",
    label: "id тикета",
    field: "id",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "title",
    align: "center",
    label: "Заголовок",
    field: "title",
    sortable: true,
  },
  {
    name: "text",
    align: "center",
    label: "Текст тикета",
    field: "text",
    sortable: true,
  },
  {
    name: "creationDate",
    align: "center",
    label: "Дата создания",
    field: "creationDate",
    sortable: true,
    sort: (a, b) =>
      new Date(Number(a)).getTime() - new Date(Number(b)).getTime(),
  },
  {
    name: "details",
    align: "center",
    label: "",
  },
];
</script>

<style lang="scss">
.ticket-table__link {
  text-decoration: underline;
}
</style>
