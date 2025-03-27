<script setup lang="ts">
const { locale } = useNuxtApp().$i18n;
const { database, ID, Query } = useAppwrite();
const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();

const items = ref(null);
const page = ref(Number(route.query.page) || 1);
const perPage = ref(Number(route.query.per_page) || 10);
const rows = computed(() => (page.value - 1) * perPage.value);
const offset = computed(() => (page.value - 1) * perPage.value);
const total = ref(0);
const loading = ref(false);
const panelColapsed = ref(true);

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

const onFormSubmit = async ({ values, valid }) => {
  if (!valid) return;

  panelColapsed.value = true;
  loading.value = true;

  let search = '';

  Object.entries(values).map(([key, value]) => {
    if (value.value !== 'random') {
      search += `${key}=${value.value},`;
    }
  });

  router.push({
    params: {
      id: search
    }
  });
};

const fetchDocuments = async () => {
  const search_ = route.params.search || route.query.search || '';
  const search = search_.split(',');
  try {
    const { documents: npcsData, total: total_ } = await database.listDocuments(
      config.public.databaseID,
      config.public.itemsCollectionID,
      [ // The array of queries must be flat (an array of strings)
        // Pagination and Sorting Queries
        Query.limit(perPage.value),
        Query.offset(offset.value),
        Query.orderDesc('$createdAt'),

        // Dynamically generated Search Queries from the 'search' array
        // Use the spread syntax (...) to add each element from the result of map
        // into the main query array.
        ...search.map((item) => {
          // Basic split by '='. Consider adding error handling if 'item' might not contain '='.
          const [key, value] = item.split('=');

          if (!key || value === undefined || key === "" || value === null) {
            // Skip invalid search terms or throw an error
            console.warn(`Skipping invalid search term: ${item}`);
            // Returning null or undefined here won't work directly with spread,
            // Filter out invalid items *before* or *after* mapping if necessary.
            // A simple approach is to just let Query.equal handle potential errors
            // if key/value are bad, though Appwrite might throw.
            // For now, we proceed assuming key/value are somewhat valid.
            return Query.isNotNull("name");
          }

          // Appwrite's Query.equal expects the attribute name and an ARRAY of values.
          // IMPORTANT: If you are querying a numeric field (like 'level'),
          // you might need to convert the 'value' string to a number:
          // return Query.equal(key, [Number(value)]);
          // Assuming string values for now:
          if (value === 'false') {
            return Query.equal(key, [false]);
          } else if (value === 'true') {
            return Query.equal(key, [true]);
          }

          // For other types, you might need to handle them accordingly.
          // For example, if 'key' is a number, you might want to parse it:
          // return Query.equal(key, [parseInt(value)]);
          return Query.equal(key, [value]);
        })
        // If search terms could be invalid, you might filter *after* mapping:
        // .filter(query => query !== null) // if you returned null for invalid items
      ]
    );
    items.value = npcsData;
    total.value = total_;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  fetchDocuments();
  loading.value = false;
});

watch(() => route.query, async () => {
  page.value = parseInt(route.query.page) || 1;
  perPage.value = parseInt(route.query.per_page) || 10;
  offset.value = (page.value - 1) * perPage.value;
  loading.value = true;
  fetchDocuments();
  loading.value = false;
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

  <ITEMSearchCard 
    :loading="loading"
    :items="items"/>

    <CommonPagination :page="page" :rows="rows" :perPage="perPage" :totalRecords="total" />
</template>