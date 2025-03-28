<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const { locale } = useNuxtApp().$i18n;
const { database, ID } = useAppwrite();

const loading = ref(false);
const panelColapsed = ref(false);
const combatId = ref(route.params.id);
const combat = ref<{
  show: boolean;
  players: any[];
  monsters: any[];
  data: any[];
}>({
  show: false,
  players: [],
  monsters: [],
  data: []
});

const { data: monsters, status: statusMonsters, error: errorMonsters, refresh: refreshMonsters, clear: clearMonsters } = await useAsyncData(
  'monsters',
  () => $fetch(`${config.public.url}tables/monsters.json`)
);

const initialValues = {
  monster: monsters.value[0]
}

const resolver = ({ values }) => {
  const errors = {};
  const requiredFields = [
    'monster'
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = [{ message: `${field} is required.` }];
    }
  });
  return { values, errors };
};

const onFormSubmit = async ({ values, valid }) => {
  if (!valid) {
    console.log('Form is invalid');
    return;
  }

  loading.value = true;

  combat.value.monsters = [...combat.value.monsters, values];
  combat.value.show = true;

  console.log(values.monster_qtd);

  for (let i = 0; i < values.monster_qtd; i++) {
    console.log(i);
    combat.value.data = [...combat.value.data, {
      name: values.monster.label,
      initiative: Math.floor(Math.random() * 20),
      hp: 999,
      status: 'alive',
    }];
  }

  console.log('combat.value', combat.value);
};

</script>

<template>
  <COMBATForm :monsters="monsters" :initialValues="initialValues" :resolver="resolver" :onFormSubmit="onFormSubmit" :loading="loading" :panelColapsed="panelColapsed" />

  <COMBATTable :combat="combat" :loading="loading" />
</template>