<script setup lang="ts">
import defaultImage from '@/assets/images/npc/default_npc.webp';

const { locale } = useNuxtApp().$i18n;
const { database, ID } = useAppwrite();
const config = useRuntimeConfig();
const router = useRouter();
const route = useRoute();

const loading = ref(false);
const panelColapsed = ref(false);

const npc = reactive({
  show: false,
  name: '',
  age: 0,
  race: '',
  gender: '',
  alignment: '',
  level: 1,
  class_: '',
  job: '',
  background: '',
  sexOrientation: '',
  appearance: '',
  personality: '',
  affiliations: '',
  goal: '',
  backstory: '',
  languages: '',
  savingThrows: '',
  armourClass: 0,
  initiative: '',
  speed: '',
  hitPoints: 0,
  hitDice: '',
  attr: {},
  description: '',
  appearance_: '',
  created_at: '',
  enemy: false,
  secretPlot: '',
  items: [],
  spells: [],
  difficult: '',
  image: defaultImage,
});

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
  npc.show = true;

  try {
    const formData = new FormData();
    formData.append('generate', 'NPC');
    Object.entries(values).map(([key, value]) => {
      formData.append(key, value.value);
    });

    const NPC = await $fetch('/api/core', { method: 'POST', body: formData });

    Object.assign(npc, {
      ...NPC,
      age: parseInt(NPC.age, 10),
      level: parseInt(NPC.level, 10),
      armourClass: parseInt(NPC.armour_class, 10),
      attr: NPC.attr,
      items: NPC.items ? NPC.items : [],
      spells: NPC.spells ? NPC.spells : [],
      secretPlot: NPC.secret_plot,
      sexOrientation: NPC.sex_orientation,
      hitDice: NPC.hit_dice,
      hitPoints: NPC.hit_points,
      image: defaultImage,
      enemy: values.enemy.value,
    });

    const response = await database.createDocument(
      config.public.databaseID,
      config.public.npcCollectionID,
      ID.unique(),
      {
        ...NPC,
        age: parseInt(NPC.age, 10),
        level: parseInt(NPC.level, 10),
        armour_class: parseInt(NPC.armour_class, 10),
        attr: [JSON.stringify(NPC.attr)],
        items: NPC.items ? [JSON.stringify(NPC.items)] : [],
        spells: NPC.spells ? [JSON.stringify(NPC.spells)] : [],
      }
    );

    router.push({
      name: `generate-npc-id___${locale.value}`,
      params: { id: response.$id },
    });
  } catch (error) {
    console.error('Error creating NPC:', error);
  } finally {
    loading.value = false;
  }
};

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      npc.image = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

onMounted(async () => {
  const id = route.params.id;
  if (id !== 'new') {
    npc.show = true;
    loading.value = true;
    try {
      const response = await database.getDocument(
        config.public.databaseID,
        config.public.npcCollectionID,
        id
      );
      
      Object.assign(npc, {
        ...response,
        age: parseInt(response.age, 10),
        armourClass: parseInt(response.armour_class, 10),
        class_: response.class,
        level: parseInt(response.level, 10),
        attr: JSON.parse(response.attr[0]),
        items: response.items[0] ? JSON.parse(response.items[0]) : [],
        spells: response.spells[0] ? JSON.parse(response.spells[0]) : [],
        secretPlot: response.secret_plot,
        savingThrows: response.saving_throws,
        sexOrientation: response.sex_orientation,
        hitDice: response.hit_dice,
        hitPoints: response.hit_points,
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

  <NPCCard :npc="npc" :loading="loading" :onFileChange="onFileChange" />
</template>
