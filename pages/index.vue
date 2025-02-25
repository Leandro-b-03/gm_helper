<script setup lang="ts">
const { database, Query } = useAppwrite();
const config = useRuntimeConfig();

const npcs = ref([]);

const databaseID = config.public.databaseID;
const npcsCollection = config.public.npcCollectionID;

const fetchDocuments = async () => {
  try {
    const { documents: npcsData } = await database.listDocuments(databaseID, npcsCollection, [ Query.limit(4)]);
    npcs.value = npcsData;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  fetchDocuments();
});
</script>

<style>
.custom-table {
  width: 100%;
  border-collapse: collapse;
}

.custom-table th,
.custom-table td {
  border-bottom: 1px solid #ddd;
  padding: 8px;
}

.custom-table th {
  text-align: left;
}

.custom-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.custom-table tbody tr:hover {
  background-color: #ddd;
}

.custom-table tfoot tr {
  background-color: #f2f2f2;
}
</style>

<template>
  <div class="bg-surface-50 dark:bg-surface-950">
    <div class="bg-surface-0 dark:bg-surface-900 p-6 shadow !rounded border border-gray-200 dark:border-gray-800">
      <div class="text-3xl font-medium text-surface-900 dark:text-surface-0 mb-2">{{ $t('home.cards.title') }}</div>
      <div class="font-medium text-surface-500 dark:text-surface-300 mb-4">{{ $t('home.cards.description') }}</div>
    </div>

    <div class="w-full mt-4">
      <h2 class="text-2xl font-medium text-surface-900 dark:text-surface-0 mb-4">{{ $t('home.cards.npcs') }}</h2>
      <div class="flex flex-row flex-wrap gap-4">
        <Card v-for="npc in npcs" style="width: 25rem; overflow: hidden">
          <template #header>
              <!-- <img alt="user header" src="/images/usercard.png" /> -->
          </template>
          <template #title>{{ npc.name }}</template>
          <template #subtitle>{{ `${npc.type}/${npc.class}` }}</template>
          <template #content>
            <p class="mb-2">{{ npc.description }}</p>
            <p class="mb-2">{{ npc.personality_traits }}</p>
            <p class="pb-4 border-b border-gray-200">{{ npc.plot_hook }}</p>
          </template>
          <template #footer>
            <div class="">
              <table class="custom-table">
                <thead class="p-datatable-thead">
                  <tr>
                    <th>Status</th>
                    <th>str</th>
                    <th>dex</th>
                    <th>con</th>
                    <th>int</th>
                    <th>wis</th>
                    <th>cha</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                    <td>{{ npc.str }}</td>
                    <td>{{ npc.dex }}</td>
                    <td>{{ npc.con }}</td>
                    <td>{{ npc.int }}</td>
                    <td>{{ npc.wis }}</td>
                    <td>{{ npc.cha }}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td>mod</td>
                    <td>{{ npc.str_mod }}</td>
                    <td>{{ npc.dex_mod }}</td>
                    <td>{{ npc.con_mod }}</td>
                    <td>{{ npc.int_mod }}</td>
                    <td>{{ npc.wis_mod }}</td>
                    <td>{{ npc.cha_mod }}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>