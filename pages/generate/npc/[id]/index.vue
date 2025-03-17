<script setup lang="ts">
const { locale } = useNuxtApp().$i18n;
const { database, ID } = useAppwrite();
const config = useRuntimeConfig();
const router = useRouter();
const route = useRoute();

const loading = ref(false);
const panel = ref(null);
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

  panel.value.toggle();
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

const proeficiency = (level: number): string => {
  if (level >= 1 && level <= 4) return '2';
  if (level >= 5 && level <= 8) return '3';
  if (level >= 9 && level <= 12) return '4';
  if (level >= 13 && level <= 16) return '5';
  if (level >= 17 && level <= 20) return '6';
  return '10';
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
  <Panel :header="$t('generate.npcs.header')" class="w-full shadow-sm" toggleable :collapsed="panelColapsed" ref="panel">
    <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-2">
        <div class="flex flex-col gap-1">
          <label for="age" class="text-sm font-medium text-surface-500 dark:text-surface-300 mb-2">{{ $t('age.title') }}</label>
          <Select :options="age" optionLabel="label" name="age" type="text" placeholder="age" fluid>
            <template #value="{ value }">
              <div class="flex flex-row items-center gap-2">
                <span>{{ $t(value.label) }}</span>
              </div>
            </template>
            <template #option="{ option }">
              <div class="flex flex-row items-center gap-2">
                <span>{{ $t(option.label) }}</span>
              </div>
            </template>
          </Select>
          <Message v-if="$form.age?.invalid" severity="error" size="small" variant="simple">{{ $form.age.error?.message }}</Message>
        </div>
        <div class="flex flex-col gap-1">
          <label for="race" class="text-sm font-medium text-surface-500 dark:text-surface-300 mb-2">{{ $t('races.title') }}</label>
          <Select :options="races" optionLabel="label" name="race" type="text" placeholder="race" fluid>
            <template #value="{ value }">
              <div class="flex flex-row items-center gap-2">
                <span>{{ $t(value.label) }}</span>
              </div>
            </template>
            <template #option="{ option }">
              <div class="flex flex-row items-center gap-2">
                <span>{{ $t(option.label) }}</span>
              </div>
            </template>
          </Select>
          <Message v-if="$form.race?.invalid" severity="error" size="small" variant="simple">{{ $form.race.error?.message }}</Message>
        </div>
        <div class="flex flex-col gap-1">
          <label for="gender" class="text-sm font-medium text-surface-500 dark:text-surface-300 mb-2">{{ $t('gender.title') }}</label>
          <Select :options="gender" optionLabel="label" name="gender" type="text" placeholder="gender" fluid>
            <template #value="{ value }">
              <div class="flex flex-row items-center gap-2">
                <span>{{ $t(value.label) }}</span>
              </div>
            </template>
            <template #option="{ option }">
              <div class="flex flex-row items-center gap-2">
                <span>{{ $t(option.label) }}</span>
              </div>
            </template>
          </Select>
          <Message v-if="$form.gender?.invalid" severity="error" size="small" variant="simple">{{ $form.gender.error?.message }}</Message>
        </div>
        <div class="flex flex-col gap-1">
          <label for="alignment" class="text-sm font-medium text-surface-500 dark:text-surface-300 mb-2">{{ $t('alignments.title') }}</label>
          <Select :options="alignments" optionLabel="label" name="alignment" type="text" placeholder="alignment" fluid>
            <template #value="{ value }">
              <div class="flex flex-row items-center gap-2">
                <span>{{ $t(value.label) }}</span>
              </div>
            </template>
            <template #option="{ option }">
              <div class="flex flex-row items-center gap-2">
                <span>{{ $t(option.label) }}</span>
              </div>
            </template>
          </Select>
          <Message v-if="$form.alignment?.invalid" severity="error" size="small" variant="simple">{{ $form.alignment.error?.message }}</Message>
        </div>
        <div class="flex flex-col gap-1">
          <label for="level" class="text-sm font-medium text-surface-500 dark:text-surface-300 mb-2">{{ $t('level.title') }}</label>
          <Select :options="levels" optionLabel="label" name="level" type="text" placeholder="level" fluid>
            <template #value="{ value }">
              <div class="flex flex-row items-center gap-2">
                <span>{{ $t(value.label) }}</span>
              </div>
            </template>
            <template #option="{ option }">
              <div class="flex flex-row items-center gap-2">
                <span>{{ $t(option.label) }}</span>
              </div>
            </template>
          </Select>
          <Message v-if="$form.level?.invalid" severity="error" size="small" variant="simple">{{ $form.level.error?.message }}</Message>
        </div>
        <div class="flex flex-col gap-1">
          <label for="class_" class="text-sm font-medium text-surface-500 dark:text-surface-300 mb-2">{{ $t('classes.title') }}</label>
          <Select :options="classesData" optionLabel="label" name="class_" type="text" placeholder="class" fluid>
            <template #value="{ value }">
              <div class="flex flex-row items-center gap-2">
                <span>{{ $t(value.label) }}</span>
              </div>
            </template>
            <template #option="{ option }">
              <div class="flex flex-row items-center gap-2">
                <span>{{ $t(option.label) }}</span>
              </div>
            </template>
          </Select>
          <Message v-if="$form.classes?.invalid" severity="error" size="small" variant="simple">{{ $form.classes.error?.message }}</Message>
        </div>
        <div class="flex flex-col gap-1">
          <label for="job" class="text-sm font-medium text-surface-500 dark:text-surface-300 mb-2">{{ $t('jobs.title') }}</label>
          <Select :options="jobs" optionLabel="label" name="job" type="text" placeholder="class" fluid>
            <template #value="{ value }">
              <div class="flex flex-row items-center gap-2">
                <span>{{ $t(value.label) }}</span>
              </div>
            </template>
            <template #option="{ option }">
              <div class="flex flex-row items-center gap-2">
                <span>{{ $t(option.label) }}</span>
              </div>
            </template>
          </Select>
          <Message v-if="$form.job?.invalid" severity="error" size="small" variant="simple">{{ $form.job.error?.message }}</Message>
        </div>
        <div class="flex flex-col gap-1">
          <label for="background" class="text-sm font-medium text-surface-500 dark:text-surface-300 mb-2">{{ $t('backgrounds.title') }}</label>
          <Select :options="backgrounds" optionLabel="label" name="background" type="text" placeholder="background" fluid>
            <template #value="{ value }">
              <div class="flex flex-row items-center gap-2">
                <span>{{ $t(value.label) }}</span>
              </div>
            </template>
            <template #option="{ option }">
              <div class="flex flex-row items-center gap-2">
                <span>{{ $t(option.label) }}</span>
              </div>
            </template>
          </Select>
          <Message v-if="$form.background?.invalid" severity="error" size="small" variant="simple">{{ $form.background.error?.message }}</Message>
        </div>
        <div class="flex flex-col gap-1">
          <label for="sex_orientation" class="text-sm font-medium text-surface-500 dark:text-surface-300 mb-2">{{ $t('sex_orientation.title') }}</label>
          <Select :options="sexOrientations" optionLabel="label" name="sex_orientation" type="text" placeholder="sexOrientation" fluid>
            <template #value="{ value }">
              <div class="flex flex-row items-center gap-2">
                <span>{{ $t(value.label) }}</span>
              </div>
            </template>
            <template #option="{ option }">
              <div class="flex flex-row items-center gap-2">
                <span>{{ $t(option.label) }}</span>
              </div>
            </template>
          </Select>
          <Message v-if="$form.sexOrientation?.invalid" severity="error" size="small" variant="simple">{{ $form.sexOrientation.error?.message }}</Message>
        </div>
        <div class="flex flex-col gap-1">
          <label for="appearance" class="text-sm font-medium text-surface-500 dark:text-surface-300 mb-2">{{ $t('appearances.title') }}</label>
          <Select :options="appearances" optionLabel="label" name="appearance" type="text" placeholder="appearance" fluid>
            <template #value="{ value }">
              <div class="flex flex-row items-center gap-2">
                <span>{{ $t(value.label) }}</span>
              </div>
            </template>
            <template #option="{ option }">
              <div class="flex flex-row items-center gap-2">
                <span>{{ $t(option.label) }}</span>
              </div>
            </template>
          </Select>
          <Message v-if="$form.appearance?.invalid" severity="error" size="small" variant="simple">{{ $form.appearance.error?.message }}</Message>
        </div>
        <div class="flex flex-col gap-1">
          <label for="personality" class="text-sm font-medium text-surface-500 dark:text-surface-300 mb-2">{{ $t('personalities.title') }}</label>
          <Select :options="personalities" optionLabel="label" name="personality" type="text" placeholder="personality" fluid>
            <template #value="{ value }">
              <div class="flex flex-row items-center gap-2">
                <span>{{ $t(value.label) }}</span>
              </div>
            </template>
            <template #option="{ option }">
              <div class="flex flex-row items-center gap-2">
                <span>{{ $t(option.label) }}</span>
              </div>
            </template>
          </Select>
          <Message v-if="$form.personality?.invalid" severity="error" size="small" variant="simple">{{ $form.personality.error?.message }}</Message>
        </div>
        <div class="flex flex-col gap-1">
          <label for="affiliation" class="text-sm font-medium text-surface-500 dark:text-surface-300 mb-2">{{ $t('affiliations.title') }}</label>
          <Select :options="affiliations" optionLabel="label" name="affiliation" type="text" placeholder="affiliations" fluid>
            <template #value="{ value }">
              <div class="flex flex-row items-center gap-2">
                <span>{{ $t(value.label) }}</span>
              </div>
            </template>
            <template #option="{ option }">
              <div class="flex flex-row items-center gap-2">
                <span>{{ $t(option.label) }}</span>
              </div>
            </template>
          </Select>
          <Message v-if="$form.affiliation?.invalid" severity="error" size="small" variant="simple">{{ $form.affiliation.error?.message }}</Message>
        </div>
        <div class="flex flex-col gap-1">
          <label for="goal" class="text-sm font-medium text-surface-500 dark:text-surface-300 mb-2">{{ $t('goals.title') }}</label>
          <Select :options="goals" optionLabel="label" name="goal" type="text" placeholder="goals" fluid>
            <template #value="{ value }">
              <div class="flex flex-row items-center gap-2">
                <span>{{ $t(value.label) }}</span>
              </div>
            </template>
            <template #option="{ option }">
              <div class="flex flex-row items-center gap-2">
                <span>{{ $t(option.label) }}</span>
              </div>
            </template>
          </Select>
          <Message v-if="$form.goal?.invalid" severity="error" size="small" variant="simple">{{ $form.goal.error?.message }}</Message>
        </div>
        <div class="flex flex-col gap-1">
          <label for="backstory" class="text-sm font-medium text-surface-500 dark:text-surface-300 mb-2">{{ $t('backstory.title') }}</label>
          <Select :options="backstories" optionLabel="label" name="backstory" type="text" placeholder="backstory" fluid>
            <template #value="{ value }">
              <div class="flex flex-row items-center gap-2">
                <span>{{ $t(value.label) }}</span>
              </div>
            </template>
            <template #option="{ option }">
              <div class="flex flex-row items-center gap-2">
                <span>{{ $t(option.label) }}</span>
              </div>
            </template>
          </Select>
          <Message v-if="$form.backstory?.invalid" severity="error" size="small" variant="simple">{{ $form.backstory.error?.message }}</Message>
        </div>
        <div class="flex flex-col gap-1">
          <label for="enemy" class="text-sm font-medium text-surface-500 dark:text-surface-300 mb-2">{{ $t('enemy.title') }}</label>
          <Select :options="enemy" optionLabel="label" name="enemy" type="text" placeholder="enemy" fluid>
            <template #value="{ value }">
              <div class="flex flex-row items-center gap-2">
                <span>{{ $t(value.label) }}</span>
              </div>
            </template>
            <template #option="{ option }">
              <div class="flex flex-row items-center gap-2">
                <span>{{ $t(option.label) }}</span>
              </div>
            </template>
          </Select>
          <Message v-if="$form.enemy?.invalid" severity="error" size="small" variant="simple">{{ $form.enemy.error?.message }}</Message>
        </div>
        <div class="flex flex-col gap-1">
          <label for="difficulty" class="text-sm font-medium text-surface-500 dark:text-surface-300 mb-2">{{ $t('difficulty.title') }}</label>
          <Select :options="difficulty" optionLabel="label" name="difficult" type="text" placeholder="difficult" fluid>
            <template #value="{ value }">
              <div class="flex flex-row items-center gap-2">
                <span>{{ $t(value.label) }}</span>
              </div>
            </template>
            <template #option="{ option }">
              <div class="flex flex-row items-center gap-2">
                <span>{{ $t(option.label) }}</span>
              </div>
            </template>
          </Select>
          <Message v-if="$form.difficulty?.invalid" severity="error" size="small" variant="simple">{{ $form.difficulty.error?.message }}</Message>
        </div>
      </div>
      <Button type="submit" severity="secondary" :label="$t('common.generate')" :disabled="panelColapsed.value" :loading="loading" />
    </Form>
  </Panel>

  <TransitionGroup name="fade">
    <div v-if="npc.show" class="bg-surface-50 dark:bg-surface-950 mt-4 rounded" key="npc">
      <div class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded">
        <div class="text-3xl font-medium text-surface-900 dark:text-surface-0 mb-2">
          <Skeleton v-if="loading" height="25px" width="150px" />
          <span v-else>{{ $t('generate.npcs.title') }}</span>
        </div>
        <div class="font-medium text-surface-500 dark:text-surface-300 mb-4">
          <Skeleton v-if="loading" width="100px" />
          <span v-else>{{ $t('generate.npcs.description') }}</span>
        </div>
        <div class="flex flex-col lg:flex-row">
          <div class="flex justify-center items-center inset-shadow-sm w-full h-auto rounded inset-shadow-gray-500 striped-bg">
            <div class="grid grid-cols-1 w-full lg:w-[900px] h-auto lg:h-auto bg-white shadow rounded overflow-hidden content-between">
              <div class="header bg-gray-800 p-4 flex flex-row justify-between items-center mb-1">
                <div>
                  <Skeleton v-if="loading" width="150px" height="35px" />
                  <h2 v-else class="text-3xl text-gray-50 mb-0">{{ npc.name }} <i class="text-xs">nv. {{ npc.level }}</i></h2>
                  <Skeleton v-if="loading" width="100px" height="15px" class="mt-1" />
                  <small v-else class="text-gray-50 relative -t-2">{{ (npc.age === -1) ? $t('age.unknown') : `${npc.age} ${$t('common.years')}` }} {{ `/ ${$t(`sex_orientation.${npc.sexOrientation}`)}` }}</small>
                </div>
                <div class="flex flex-col">
                  <Skeleton v-if="loading" width="100px" height="15px" class="mb-1" />
                  <small v-else class="text-gray-50">{{ $t(`races.${npc.race}`) }}</small>
                  <Skeleton v-if="loading" width="100px" height="15px" class="mb-1" />
                  <small v-else class="text-gray-50">{{ $t(`classes.${npc.class_}`) }}</small>
                  <Skeleton v-if="loading" width="100px" height="15px" />
                  <small v-else class="text-gray-50">{{ npc.job ? $t(`jobs.${npc.job}`) : '-' }}</small>
                </div>
              </div>
              <div class="body px-2">
                <div class="grid grid-cols-2 gap-2">
                  <div>
                    <table class="table-auto w-full border-separate mb-2">
                      <tbody>
                        <tr class="border-b border-gray-300">
                          <td class="bg-gray-200 p-1 rounded-tl w-[40%] text-right alegreya">{{ `${$t('common.armor_i')} ${$t('common.class_i')}` }}</td>
                          <td class="bg-gray-100 p-1 rounded-tr">
                            <Skeleton v-if="loading" width="15px" height="15px" />
                            <span v-else>{{ npc.armourClass }}</span>
                          </td>
                        </tr>
                        <tr class="border-b border-gray-300">
                          <td class="bg-gray-200 p-1 text-right alegreya">{{ $t('common.hit_points') }}</td>
                          <td class="bg-gray-100 p-1">
                            <Skeleton v-if="loading" width="50px" height="15px" />
                            <span v-else>{{ npc.hitPoints }} <small class="text-xs">{{ npc.hitDice }}</small></span>
                          </td>
                        </tr>
                        <tr class="">
                          <td class="bg-gray-200 p-1 rounded-bl text-right alegreya">{{ $t('common.speed') }}</td>
                          <td class="bg-gray-100 p-1 rounded-br">
                            <Skeleton v-if="loading" width="80px" height="15px" />
                            <span v-else>{{ npc.speed }}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="attrs flex fles-row justify-between gap-1 mb-2">
                      <div v-for="attr in npc.attr" class="flex items-center justify-center flex-col bg-gray-100 rounded px-2 py-1 w-[75px]">
                        <div><h2 class="text-sm font-semibold">{{ attr.short }}</h2></div>
                        <div>
                          <div class="flex flex-row items-center justify-center gap-1">
                            <Skeleton v-if="loading" width="35px" height="20px" />
                            <div v-else>
                              <span class="font-light">{{ attr.value }}</span>
                              <span class="font-semibold text-gray-500"> ({{ attr.bonus }})</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <table class="w-full border-separate mb-2">
                      <tbody>
                        <tr class="border-b border-gray-300">
                          <td class="bg-gray-200 p-1 text-right rounded-tl w-[40%]">{{ $t('common.saving_throws') }}</td>
                          <td class="bg-gray-100 p-1 rounded-tr">
                            <Skeleton v-if="loading" width="80px" height="15px" />
                            <div v-else>
                              <Tag v-for="value in npc.savingThrows.split(',')" :key="`saving-${value}`" :value="`${value}`" class="m-1 !text-xs" severity="info" size="small" />
                            </div>
                          </td>
                        </tr>
                        <tr class="border-b border-gray-300">
                          <td class="bg-gray-200 p-1 text-right">{{ $t('common.languages') }}</td>
                          <td class="bg-gray-100 p-1">
                            <Skeleton v-if="loading" width="80px" height="15px" />
                            <div v-else>
                              <Tag v-for="value in npc.languages.split(',')" :key="`saving-${value}`" :value="`${value}`" class="mr-1" severity="warn" size="small" />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td class="bg-gray-200 p-1 rounded-bl text-right">{{ $t('common.difficult') }}</td>
                          <td class="bg-gray-100 p-1 rounded-br">
                            <Skeleton v-if="loading" width="80px" height="15px" />
                            <span v-else>{{ $t(`difficulty.${npc.difficult}`) }}</span>
                          </td>
                        </tr>
                        <tr>
                          <td class="bg-gray-200 p-1 text-right">{{ $t('common.proeficiency') }}</td>
                          <td class="bg-gray-100 p-1">
                            <Skeleton v-if="loading" width="80px" height="15px" />
                            <span v-else>+{{ proeficiency(npc.level) }}</span>
                          </td>
                        </tr>
                        <tr>
                          <td class="bg-gray-200 p-1 rounded-bl text-right">{{ $t('common.initiative') }}</td>
                          <td class="bg-gray-100 p-1 rounded-br">
                            <Skeleton v-if="loading" width="15px" height="15px" />
                            <span v-else>{{ npc.initiative }}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table class="w-full border-separate mb-2">
                      <tbody>
                        <tr class="border-b border-gray-300">
                          <td class="bg-gray-200 p-1 text-right rounded-tl w-[40%]">{{ $t('items.weapon') }}</td>
                          <td class="bg-gray-100 p-1 rounded-tr">
                            <Skeleton v-if="loading" width="80px" height="15px" />
                            <span v-else>{{ npc.items.weapon }}</span>
                          </td>
                        </tr>
                        <tr class="border-b border-gray-300">
                          <td class="bg-gray-200 p-1 text-right">{{ $t('items.armor') }}</td>
                          <td class="bg-gray-100 p-1">
                            <Skeleton v-if="loading" width="80px" height="15px" />
                            <span v-else>{{ npc.items.armor }}</span>
                          </td>
                        </tr>
                        <tr class="border-b border-gray-300">
                          <td class="bg-gray-200 p-1 text-right">{{ $t('items.other') }}</td>
                          <td class="bg-gray-100 p-1">
                            <Skeleton v-if="loading" width="80px" height="15px" />
                            <span v-else>{{ npc.items.other }}</span>
                          </td>
                        </tr>
                        <tr class="border-b border-gray-300">
                          <td class="bg-gray-200 p-1 rounded-bl text-right">{{ $t('items.potions') }}</td>
                          <td class="bg-gray-100 p-1 rounded-br">
                            <Skeleton v-if="loading" width="80px" height="15px" />
                            <span v-else>{{ npc.potions }}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <table class="w-full border-separate mb-2">
                      <thead>
                        <tr>
                          <th colspan="2" class="bg-gray-200 p-1 text-center rounded-t">{{ $t('spells.title') }}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-if="loading" class="border-b border-gray-300">
                          <td class="bg-gray-100 p-1 rounded-br">
                            <Skeleton width="80px" height="15px" />
                          </td>
                        </tr>

                        <template v-else>
                          <template v-for="(spells, levelKey) in npc.spells" :key="levelKey">
                            <tr v-if="spells && spells.length > 0" class="border-b border-gray-300">
                              <td class="bg-gray-200 p-1 rounded-bl text-right">{{ $t(`spells.${levelKey}`) }}</td>
                              <td class="bg-gray-100 p-1" :class="{ 'rounded-br': isLastLevel(npc.spells, levelKey) }">
                                <Tag v-for="(spell, index) in spells" :key="`spell-${levelKey}-${index}`" :value="spell" class="m-1" severity="success" size="small" />
                              </td>
                            </tr>
                          </template>
                        </template>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <div class="rounded bg-gray-100 overflow-hidden mb-2">
                    <div class="bg-gray-200 py-1 px-2 rounded-tl">
                      <h2 class="font-semibold text-base">{{ $t('common.description') }}</h2>
                    </div>
                    <div class="text-justify text-xs p-2">
                      <Skeleton v-if="loading" width="100%" height="100px" />
                      <p v-else>{{ npc.description }}</p>
                    </div>
                  </div>
                  <div class="rounded bg-gray-100 overflow-hidden mb-2">
                    <div class="bg-gray-200 py-1 px-2 rounded-tl">
                      <h2 class="font-semibold text-base">{{ $t('appearances.title') }}</h2>
                    </div>
                    <div class="text-justify text-xs p-2">
                      <Skeleton v-if="loading" width="100%" height="100px" />
                      <p v-else>{{ npc.appearance_ }}</p>
                    </div>
                  </div>
                  <div class="rounded bg-gray-100 overflow-hidden mb-2">
                    <div class="bg-gray-200 py-1 px-2 rounded-tl">
                      <h2 class="font-semibold text-base">{{ $t('secret_plot.title') }}</h2>
                    </div>
                    <div class="text-justify text-xs p-2">
                      <Skeleton v-if="loading" width="100%" height="100px" />
                      <p v-else>{{ npc.secretPlot }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="footer w-full h-7 bg-gray-200 p-2">
                <div class="flex flex-row justify-between items-center">
                  <div class="flex flex-row gap-2">
                  </div>
                  <div class="flex flex-row gap-2">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </TransitionGroup>
</template>
