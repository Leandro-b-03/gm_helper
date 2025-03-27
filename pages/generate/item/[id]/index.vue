<script setup lang="ts">
import defaultImage from '~/assets/images/items/default.webp';

const { locale } = useNuxtApp().$i18n;
const { database, ID } = useAppwrite();
const config = useRuntimeConfig();
const router = useRouter();
const route = useRoute();

const panelColapsed = ref(false);
const loading = ref(false);
const type = ref('');
const panel = ref(null);
const item = reactive({
  show: false,
  class_: '',
  name: '',
  description: '',
  weaponType: '',
  damage: '',
  requirements: '',
  type: '',
  wondrousItems: '',
  rarity: '',
  itemTier: '',
  evolutionLevel: [
    { level: 1 },
    { level: 2 },
    { level: 3 },
    { level: 4 },
    { level: 5 }
  ],
  notes: [],
  image: defaultImage,
  evolutionNotes: [],
});

if (item.show == true && item.name != '' && route.params.id == 'new') {
  const response = await database.createDocument(
    config.public.databaseID,
    config.public.itemsCollectionID,
    ID.unique(),
    {
      name: item.name,
      class: item.class_,
      description: item.description,
      type: item.type,
      damage: [JSON.stringify(item.damage)],
      damage_type: item.damage_type,
      requirements: item.requirements,
      wondrous_item: item.wondrous_item,
      rarity: item.rarity,
      item_tier: item.item_tier,
      weapon_type: item.weaponType,
      evolution_level: [JSON.stringify(item.evolutionLevel)],
      notes: item.notes,
      evolution_notes: item.evolutionNotes
    }
  );
}

const { data: classesData, status: statusClasses, error: errorClasses, refresh: refreshClasses, clear: clearClasses } = await useAsyncData(
  'classes',
  () => $fetch(`${config.public.url}tables/classes.json`)
);
const { data: damages, status: statusDamages, error: errorDamages, refresh: refreshDamages, clear: clearDamages } = await useAsyncData(
  'damages',
  () => $fetch(`${config.public.url}tables/damage_type.json`)
);
const { data: types, status: statusTypes, error: errorTypes, refresh: refreshTypes, clear: clearTypes } = await useAsyncData(
  'types',
  () => $fetch(`${config.public.url}tables/types.json`)
);
const { data: wondrousItems, status: statusWondrousItems, error: errorWondrousItems, refresh: refreshWondrousItems, clear: clearWondrousItems } = await useAsyncData(
  'wondrousItems',
  () => $fetch(`${config.public.url}tables/wondrous_items.json`)
);
const { data: rarities, status: statusRarities, error: errorRarities, refresh: refreshRarities, clear: clearRarities } = await useAsyncData(
  'rarities',
  () => $fetch(`${config.public.url}tables/rarities.json`)
);
const { data: weapons, status: statusWeapons, error: errorWeapons, refresh: refreshWeapons, clear: clearWeapons } = await useAsyncData(
  'weapons',
  () => $fetch(`${config.public.url}tables/weapons.json`)
);

const initialValues = reactive({
  class_: classesData.value[0],
  damage: damages.value[0],
  type: types.value[0],
  wondrous_items: wondrousItems.value[0],
  rarity: rarities.value[0],
  weapons: weapons.value[0],
});

const resolver = ({ values }) => {
  const errors = {};
  const requiredFields = [
    'type', 'class_', 'rarity', 'damage'
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = [{ message: `${field} is required.` }];
    }
  });
  return { values, errors };
};

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      item.image = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const onFormSubmit = async ({ values, valid }) => {
  if (!valid) return;

  panelColapsed.value = true;
  loading.value = true;
  item.show = true;
  item.image = '';

  try {
    const formData = new FormData();
    formData.append('generate', 'ITEM');
    Object.entries(values).map(([key, value]) => {
      formData.append(key, value.value);
    });

    const ITEM = await $fetch('/api/core', { method: 'POST', body: formData });

    Object.assign(item, {
      ...ITEM,
      class_: ITEM.class,
      wondrousItems: ITEM.wondrous_items,
      weaponType: ITEM.weapon,
      evolutionLevel: ITEM.evolution_levels,
      evolutionNotes: ITEM.evolution_notes,
      image: defaultImage,
    });

    const response = await database.createDocument(
      config.public.databaseID,
      config.public.itemsCollectionID,
      ID.unique(),
      {
        name: ITEM.name,
        class: ITEM.class,
        description: ITEM.description,
        type: ITEM.type,
        damage: [JSON.stringify(ITEM.damage)],
        damage_type: ITEM.damage_type,
        requirements: ITEM.requirements,
        wondrous_item: ITEM.wondrous_items,
        rarity: ITEM.rarity,
        item_tier: ITEM.item_tier,
        weapon_type: ITEM.weapon,
        evolution_level: [JSON.stringify(ITEM.evolution_levels)],
        notes:ITEM.notes,
        evolution_notes: ITEM.evolution_notes
      }
    );

    router.push({
      name: `generate-item-id___${locale.value}`,
      params: { id: response.$id },
      reload: false,
    });
  } catch (error) {
    console.error('Error creating ITEM:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  const id = route.params.id;
  if (id !== 'new') {
    item.show = true;
    loading.value = true;
    panelColapsed.value = true;
    try {
      const response = await database.getDocument(
        config.public.databaseID,
        config.public.itemsCollectionID,
        id
      );
      
      Object.assign(item, {
        ...response,
        class_: response.class,
        name: response.name,
        description: response.description,
        type: response.type,
        damage: JSON.parse(response.damage[0]),
        requirements: response.requirements,
        wondrousItems: response.wondrous_item,
        rarity: response.rarity,
        itemTier: response.item_tier,
        weaponType: response.weapon_type,
        evolutionLevel: JSON.parse(response.evolution_level[0]),
        notes: response.notes,
        evolutionNotes: response.evolution_notes,
      });
      panelColapsed.value = true;
    } catch (error) {
      console.error('Error fetching NPC:', error);
    } finally {
      loading.value = false;
    }
  } else {
    panelColapsed.value = false;
  }
});
</script>

<template>
  <ITEMForm
    :loading="loading"
    :onFormSubmit="onFormSubmit"
    :classesData="classesData"
    :damages="damages"
    :types="types"
    :wondrousItems="wondrousItems"
    :rarities="rarities"
    :weapons="weapons"
    :initialValues="initialValues"
    :resolver="resolver"
    :panelColapsed="panelColapsed"
    />

  <ITEMCard :item="item" :loading="loading" :onFileChange="onFileChange" />
</template>