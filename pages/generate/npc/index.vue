<script setup lang="ts">
const { locale } = useNuxtApp().$i18n;
const t = useNuxtApp().$i18n.t;
const supabase = useSupabaseClient();
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
const panelCollapsed = ref(true);

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

  panelCollapsed.value = true;
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

/**
 * Fetches documents from the Supabase 'npcs' table based on route search parameters,
 * applying pagination and ordering.
 *
 * @param {object} route - The route object (e.g., from Vue Router) containing params or query.
 */
const fetchDocuments = async () => {
  const search_ = route.params?.search || route.query?.search || '';
  const searchFilters = search_.split(',').filter(s => s.trim() !== '');

  try {
    let query = supabase
      .from('npcs')
      .select('*', { count: 'exact' });

    searchFilters.forEach((item) => {
      const [key, value] = item.split('=').map(s => s.trim());

      if (!key || value === undefined || value === null || value === '') {
        console.warn(`Skipping invalid search term: "${item}"`);
        return;
      }

      const filterValue = value.toLowerCase() === 'true' ? true :
                          value.toLowerCase() === 'false' ? false : value;

      query = query.eq(key, filterValue);
    });

    query = query.order('created_at', { ascending: false });

    const from = offset.value;
    const to = from + perPage.value - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching documents from Supabase:', error);
      throw error;
    }

    npcs.value = data || [];
    total.value = count || 0;
  } catch (error) {
    console.error('Failed to execute fetchDocuments:', error);
    npcs.value = [];
    total.value = 0;
  } finally {
    loading.value = false;
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

useSeoMeta({
  title: `${t('generate.npcs.list')} - ${t('sidekick')}`,
});
</script>

<template>
  <NPCForm
    :loading="loading"
    :panelCollapsed="panelCollapsed"
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