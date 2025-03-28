<script setup lang="ts">
import { on } from '@primeuix/themes/aura/floatlabel';

const props = withDefaults(defineProps<{
  combat: any;
  loading: any;
  onCellEditComplete: any;
}>(), {
  combat: []
});

const turns = ref([]);

const updateTurns = (combat: any) => {
  turns.value = combat.data.map((item, index) => ({
    ...item,
    order: index + 1
  }));
};

onMounted(() => {
  updateTurns(props.combat);
});

watch(() => props.combat, (newCombat) => {
  updateTurns(newCombat);
}, { deep: true });
</script>

<template>
  <div class="bg-white dark:bg-gray-900 shadow rounded mt-4 overflow-hidden">
    <DataTable :value="combat.data" editMode="cell" @cell-edit-complete="onCellEditComplete">
      <Column field="order" style="width: 5%" header="#">
        <template #body="{ index }">{{ index + 1 }}</template>
      </Column>
      <Column field="name" :header="$t('common.name')">
        <template #body="{ data }">
          {{ $t(data.name) }}
        </template>
      </Column>
      <Column field="initiative" :header="$t('common.initiative')">
        <template #body="{ data }">
          {{ $t(data.initiative) }}
        </template>
      </Column>
      <Column field="hp" :header="$t('common.hp')">
        <template #body="{ data }">
          {{ $t(data.hp) }}
        </template>
      </Column>
      <Column field="status" :header="$t('common.status')">
        <template #body="{ data }">
          <Tag :severity="data.status === 'alive' ? 'success' : 'danger'" :value="$t(data.status)"></Tag>
        </template>
      </Column>
      <Column v-for="(col, index) in combat.columns" :key="index" :field="col.field" :header="$t(col.header)" :style="{ width: col.width }">
        <template #body="{ data }">
          <InputText v-model="data[col.field]" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>