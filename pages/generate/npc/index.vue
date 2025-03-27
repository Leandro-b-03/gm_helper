<script setup lang="ts">
const { locale } = useNuxtApp().$i18n;
const { database, ID, Query } = useAppwrite();
const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();

const page = ref(Number(route.query.page) || 1);
const perPage = ref(Number(route.query.per_page) || 10);
const rows = computed(() => (page.value - 1) * perPage.value);
const offset = computed(() => (page.value - 1) * perPage.value);
const total = ref(0);
const npcs = ref([]);
const loading = ref(true);
const panelColapsed = ref(true);

const { data: age, status: statusAge, error: errorAge, refresh: refreshAge, clear: clearAge } = await useAsyncData(
  'age',
  () => $fetch(`${config.public.url}tables/age.json`)
);
const { data: races, status: statusRaces, error: errorRaces, refresh: refreshRaces, clear: clearRaces } = await useAsyncData(
  'races',
  () => $fetch(`${config.public.url}tables/races.json`)
);
const { data: gender, status: statusGender, error: errorGender, refresh: refreshGender, clear: clearGender } = await useAsyncData(
  'gender',
  () => $fetch(`${config.public.url}tables/gender.json`)
);
const { data: alignments, status: statusAlignments, error: errorAlignments, refresh: refreshAlignments, clear: clearAlignments } = await useAsyncData(
  'alignments',
  () => $fetch(`${config.public.url}tables/alignments.json`)
);
const { data: levels, status: statusLevels, error: errorLevels, refresh: refreshLevels, clear: clearLevels } = await useAsyncData(
  'levels',
  () => $fetch(`${config.public.url}tables/levels.json`)
);
const { data: classesData, status: statusClasses, error: errorClasses, refresh: refreshClasses, clear: clearClasses } = await useAsyncData(
  'classes',
  () => $fetch(`${config.public.url}tables/classes.json`)
);
const { data: jobs, status: statusJobs, error: errorJobs, refresh: refreshJobs, clear: clearJobs } = await useAsyncData(
  'jobs',
  () => $fetch(`${config.public.url}tables/jobs.json`)
);
const { data: backgrounds, status: statusBackgrounds, error: errorBackgrounds, refresh: refreshBackgrounds, clear: clearBackgrounds } = await useAsyncData(
  'backgrounds',
  () => $fetch(`${config.public.url}tables/backgrounds.json`)
);
const { data: sexOrientations, status: statusSexOrientations, error: errorSexOrientations, refresh: refreshSexOrientation, clear: clearSexOrientation } = await useAsyncData(
  'sexOrientation',
  () => $fetch(`${config.public.url}tables/sex_orientations.json`)
);
const { data: appearances, status: statusAppearances, error: errorAppearances, refresh: refreshAppearances, clear: clearAppearances } = await useAsyncData(
  'appearances',
  () => $fetch(`${config.public.url}tables/appearances.json`)
);
const { data: personalities, status: statusPersonalities, error: errorPersonalities, refresh: refreshPersonalities, clear: clearPersonalities } = await useAsyncData(
  'personalities',
  () => $fetch(`${config.public.url}tables/personalities.json`)
);
const { data: affiliations, status: statusAffiliations, error: errorAffiliations, refresh: refreshAffiliations, clear: clearAffiliations } = await useAsyncData(
  'affiliations',
  () => $fetch(`${config.public.url}tables/affiliations.json`)
);
const { data: goals, status: statusGoals, error: errorGoals, refresh: refreshGoals, clear: clearGoals } = await useAsyncData(
  'goals',
  () => $fetch(`${config.public.url}tables/goals.json`)
);
const { data: backstories, status: statusBackstories, error: errorBackstories, refresh: refreshBackstories, clear: clearBackstories } = await useAsyncData(
  'backstories',
  () => $fetch(`${config.public.url}tables/backstories.json`)
);
const { data: difficulty, status: statusDifficulty, error: errorDifficulty, refresh: refreshDifficulty, clear: clearDifficulty } = await useAsyncData(
  'difficulty',
  () => $fetch(`${config.public.url}tables/difficulty.json`)
);
const enemy = ref([
  { label: 'common.no', value: false },
  { label: 'common.yes', value: true }
]);
const initialValues = reactive({
  age: age.value[0],
  race: races.value[0],
  gender: gender.value[0],
  alignment: alignments.value[0],
  level: levels.value[0],
  class_: classesData.value[0],
  job: jobs.value[0],
  background: backgrounds.value[0],
  sex_orientation: sexOrientations.value[0],
  appearance: appearances.value[0],
  personality: personalities.value[0],
  affiliation: affiliations.value[0],
  goal: goals.value[0],
  backstory: backstories.value[0],
  difficult: difficulty.value[0],
  enemy: enemy.value[0],
});

const resolver = ({ values }) => {
  const errors = {};
  const requiredFields = [
    'age', 'race', 'gender', 'alignment', 'level', 'class_', 'job',
    'background', 'sex_orientation', 'appearance', 'personality',
    'affiliation', 'goal', 'backstory', 'difficult',
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
    query: {
      ...router.currentRoute.value.query,
      page: 1,
      search: search.slice(0, -1)
    }
  });
};

const fetchDocuments = async () => {
  const search_ = route.params.search || route.query.search || '';
  const search = search_.split(',');
  console.log(typeof search, search);
  try {
    const { documents: npcsData, total: total_ } = await database.listDocuments(
      config.public.databaseID,
      config.public.npcCollectionID,
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

          if (!key || value === undefined) {
            // Skip invalid search terms or throw an error
            console.warn(`Skipping invalid search term: ${item}`);
            // Returning null or undefined here won't work directly with spread,
            // Filter out invalid items *before* or *after* mapping if necessary.
            // A simple approach is to just let Query.equal handle potential errors
            // if key/value are bad, though Appwrite might throw.
            // For now, we proceed assuming key/value are somewhat valid.
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
    console.log(npcsData, total_);
    npcs.value = npcsData;
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
  <NPCForm
    :loading="loading"
    :panelColapsed="panelColapsed"
    :age="age"
    :races="races"
    :gender="gender"
    :alignments="alignments"
    :levels="levels"
    :classesData="classesData"
    :jobs="jobs"
    :backgrounds="backgrounds"
    :sexOrientations="sexOrientations"
    :appearances="appearances"
    :personalities="personalities"
    :affiliations="affiliations"
    :goals="goals"
    :backstories="backstories"
    :difficulty="difficulty"
    :enemy="enemy"
    :initialValues="initialValues"
    :resolver="resolver"
    :onFormSubmit="onFormSubmit"
  />

  <NPCSearchCard :npcs="npcs" :loading="loading"/>

  <CommonPagination :page="page" :rows="rows" :perPage="perPage" :totalRecords="total" />
</template>