<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const { locale } = useNuxtApp().$i18n;
const { database, ID } = useAppwrite();

const loading = ref(false);
const panelColapsed = ref(false);
const combatId = ref(route.params.id);
const combat = ref(null);

const { data: monsters, status: statusMonsters, error: errorMonsters, refresh: refreshMonsters, clear: clearMonsters } = await useAsyncData(
  'monsters',
  () => $fetch(`${config.public.url}tables/monsters.json`)
);

const initialValues = {
  monster: monsters.value[0],
  players: [],
}

const resolver = {
  monster: {
    required: 'Monster is required',
    validate: (value) => {
      if (!value) return false;
      return true;
    },
  },
};

const onFormSubmit = async (data) => {
  const { monster, players } = data;
  const combatData = {
    monster,
    players,
  };  
};
</script>

<template>
  <COMBATForm :monsters="monsters" :initialValues="initialValues" :resolver="resolver" :onFormSubmit="onFormSubmit" :loading="loading" :panelColapsed="panelColapsed" />
</template>