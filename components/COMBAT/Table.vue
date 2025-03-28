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
    whosTurn: index,
    hp: item.hp
  }));

  console.log('turns', turns.value);
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
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <Button icon="pi pi-user" :label="$t('combat.add_player')" severity="success" />
          <Button icon="pi pi-plus" :label="$t('combat.add_turn')" severity="secondary" />
        </div>
      </template>
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
      <Column v-for="(col, index) in turns" :key="index" :field="col.index" :header="`${$t('common.turn')} ${index}`">
        <template #body="{ data }">
          <InputText v-model="data[col.hp]" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>