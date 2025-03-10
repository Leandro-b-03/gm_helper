<script setup lang="ts">
const { database, ID } = useAppwrite();
const config = useRuntimeConfig();

const loading = ref(false);
const npc = reactive({
  show: false,
  name: 'Eldrathorn',
  age: 22,
  race: 'human',
  gender: 'male',
  alignment: 'Neutro Bom',
  level: 1,
  classes: 'fighter',
  job: 'innkeeper',
  background: 'noble',
  sexOrientation: 'heterosexual',
  appearance: 'tattooed',
  personality: 'friendly',
  affiliations: 'xanathar',
  goal: 'freedom',
  backstory: 'Criação nobre',
  languages: 'Comum, Elfo',
  savingThrows: 'Força, Destreza',
  armourClass: 15,
  initiative: '2',
  speed: "30 ft (9 m)",
  hitPoints: 12,
  hitDice: '1d10',
  attr: {
    str: {
      title: 'attr.str',
      short: 'STR',
      value: 16,
      bonus: "+3"
    },
    dex: {
      title: 'attr.dex',
      short: 'DEX',
      value: 14,
      bonus: "+2"
    },
    con: {
      title: 'attr.con',
      short: 'CON',
      value: 15,
      bonus: "+2"
    },
    int: {
      title: 'attr.int',
      short: 'INT',
      value: 10,
      bonus: 0
    },
    wis: {
      title: 'attr.wis',
      short: 'WIS',
      value: 9,
      bonus: -1
    },
    cha: {
      title: 'attr.cha',
      short: 'CHA',
      value: 13,
      bonus: "+1"
    }
  },
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur lorem condimentum, vestibulum leo non, fermentum enim. Nam at accumsan justo, quis consequat justo. Nullam cursus velit at eleifend sodales. Ut vehicula malesuada neque, sed gravida libero euismod id. Sed mattis lacus sit amet ligula vehicula consequat. Nunc sit amet consectetur nisi. Integer ultricies nunc ante, eget interdum sem maximus ut.',
  appearance_: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur lorem condimentum, vestibulum leo non, fermentum enim. Nam at accumsan justo, quis consequat justo. Nullam cursus velit at eleifend sodales. Ut vehicula malesuada neque, sed gravida libero euismod id.',
  created_at: ''
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
  backstory: backstories.value[0]
});
const panelColapsed = ref(false);
// const panelColapsed = ref(true);

const resolver = ({ values }) => {
  const errors = {};

  if (!values.age) {
      errors.age = [{ message: 'Age is required.' }];
  }

  if (!values.race) {
      errors.race = [{ message: 'Username is required.' }];
  }

  if (!values.gender) {
    errors.gender = [{ message: 'gender is required.' }];
  }

  if (!values.alignment) {
    errors.alignment = [{ message: 'Alignment is required.' }];
  }

  if (!values.level) {
    errors.level = [{ message: 'Level is required.' }];
  }

  if (!values.class_) {
    errors.class_ = [{ message: 'Class is required.' }];
  }

  if (!values.jobs) {
    errors.jobs = [{ message: 'Jobs is required.' }];
  }

  if (!values.background) {
    errors.background = [{ message: 'Background is required.' }];
  }

  if (!values.sex_orientation) {
    errors.sex_orientation = [{ message: 'Sex orientation is required' }];
  }

  if (!values.appearance) {
    errors.appearance = [{ message: 'Appearance is required.' }];
  }

  if (!values.personality) {
    errors.personality = [{ message: 'Personality is required.' }];
  }

  if (!values.affiliation) {
    errors.affiliation = [{ message: 'Affiliation is required.' }];
  }

  if (!values.goal) {
    errors.goal = [{ message: 'Goals is required.' }];
  }

  if (!values.backstory) {
    errors.backstory = [{ message: 'Backstory is required.' }];
  }

  return {
      values, // (Optional) Used to pass current form values to submit event.
      errors
  };
};

const onFormSubmit = async ({ values, valid }) => {
  panelColapsed.value = true;
  loading.value = true;
  npc.show = true;
  if (valid) {
    const formData = new FormData();
    formData.append('generate', 'NPC');
    Object.entries(values).map(([key, value]) => {
      formData.append(key, value.value);
    });

    const { data: NPC, status, error } = await useAsyncData(
      'NPC',
      () => $fetch('/api/core', { method: 'POST', body: formData })
    );

    npc.show = true;
    npc.name = NPC.value.name;
    npc.age = parseInt(NPC.value.age, 10);
    npc.race = NPC.value.race;
    npc.gender = NPC.value.gender;
    npc.alignment = NPC.value.alignment;
    npc.level = parseInt(NPC.value.level, 10);
    npc.classes = NPC.value.class;
    npc.job = NPC.value.job;
    npc.background = NPC.value.background;
    npc.sexOrientation = NPC.value.sex_orientation;
    npc.description = NPC.value.description;
    npc.appearance = NPC.value.appearance;
    npc.appearance_ = NPC.value.appearance_;
    npc.personality = NPC.value.personality;
    npc.affiliations = NPC.value.affiliations;
    npc.goal = NPC.value.goal;
    npc.backstory = NPC.value.backstory;
    npc.armourClass = parseInt(NPC.value.armour_class, 10);
    npc.languages = NPC.value.languages;
    npc.savingThrows = NPC.value.saving_throws;
    npc.initiative = NPC.value.initiative;
    npc.speed = NPC.value.speed;
    npc.hitPoints = NPC.value.hit_points;
    npc.hitDice = NPC.value.hit_dice;
    npc.attr = NPC.value.attr;

    NPC.value.age = parseInt(NPC.value.age, 10);
    NPC.value.level = parseInt(NPC.value.level, 10);
    NPC.value.armour_class = parseInt(NPC.value.armour_class, 10);
    NPC.value.attr = [JSON.stringify(NPC.value.attr)];

    console.log(NPC.value);

    if (status.value === 'success') {
      loading.value = false;
    }

    const promise = database.createDocument(
      config.public.databaseID,
      config.public.npcCollectionID,
      ID.unique(),
      NPC.value
    );

    promise.then(function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });
  }
};

const proeficiency = (level: number): string => {
  // Implement the function logic here
  if (level >= 1 && level <= 4) {
    return '2';
  } else if (level >= 5 && level <= 8) {
    return '3';
  } else if (level >= 9 && level <= 12) {
    return '4';
  } else if (level >= 13 && level <= 16) {
    return '5';
  } else if (level >= 17 && level <= 20) {
    return '6';
  } else {
    return 'Invalid level';
  }
};
</script>

<style>
.striped-bg {
  background-color: #ccd1d6;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1.25rem 10px;
  background-image: linear-gradient(135deg, #e0e4e8 25%, #d9dde1 25%, #d9dde1 50%, #e0e4e8 50%, #e0e4e8 75%, #d9dde1 75%, #d9dde1 100%);
  background-size: 10px 10px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<template>
  <Panel :header="$t('generate.npcs.header')" class="w-full shadow-sm" toggleable :collapsed="panelColapsed">
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
      </div>
      <Button type="submit" severity="secondary" label="Submit" />
    </Form>
  </Panel>

  <TransitionGroup name="fade">
    <div v-if="npc.show" class="bg-surface-50 dark:bg-surface-950 mt-4 rounded">
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
          <div class="w-full lg:w-1/2 border-r border-gray-400 dark:border-gray-300">
            <section class="info mb-2 w-full lg:w-[340px] h-20 px-4 py-2 flex flex-row justify-between">
              <div class="w-auto">
                <div class="text-xs font-medium text-surface-500 dark:text-surface-300">{{ $t('common.name') }}</div>
                <div class="text-base font-semibold text-surface-900 dark:text-surface-0">
                  <Skeleton v-if="loading" width="150px" />
                  <span v-else>{{ npc.name }} <i class="text-xs">nv. {{ npc.level }}</i></span>
                </div>
                <div class="text-xs font-light text-surface-900 dark:text-surface-0">
                  <Skeleton v-if="loading" height="12px" width="50px" class="mt-1" />
                  <span v-else>{{ `${npc.age} ${$t('common.years')}` }}</span>
                </div>
              </div>
              <div class="">
                <div class="text-sm font-light text-surface-900 dark:text-surface-0">
                  <Skeleton v-if="loading" width="100px" class="mb-1" />
                  <span v-else>{{ $t(`races.${npc.race}`) }}</span>
                </div>
                <div class="text-sm font-medium text-surface-900 dark:text-surface-0">
                  <Skeleton v-if="loading" width="100px" class="mb-1" />
                  <span v-else>{{ $t(`classes.${npc.classes}`) }}</span>
                </div>
                <div class="text-sm font-medium text-surface-900 dark:text-surface-0">
                  <Skeleton v-if="loading" width="100px" />
                  <span v-else>{{ npc.job ? $t(`jobs.${npc.job}`) : '-' }}</span>
                </div>
              </div>
            </section>
            <div class="flex flex-row flex-wrap justify-start mb-2 gap-2">
              <section class="w-auto flex flex-row gap-2 mb-1">
                <div v-for="attr in npc.attr" class="ability_card h-[95px] w-[81px]">
                  <div class="px-3 py-1">
                    <div class="flex items-center justify-center my-1">
                      <span v-tooltip.top="attr.short" class="uppercase text-[9px] font-semibold text-gray-500">{{ $t(attr.title) }}</span>
                    </div>
                    <div class="flex items-center justify-center w-full rounded border border-gray-400 dark:border-gray-300 mb-1 h-8">
                      <Skeleton v-if="loading" width="25px" />
                      <span v-else class="text-xl">{{ attr.bonus }}</span>
                    </div>
                    <div class="flex items-center justify-center pt-1">
                      <Skeleton v-if="loading" width="15px" class="mt-1" />
                      <span v-else>{{ attr.value }}</span>
                    </div>
                  </div>
                </div>
              </section>
              <section class="h-[95px] w-[81px] armor_class_card p-2 flex flex-col justify-center items-center uppercase">
                <span class="text-[8px] relative top-1 -mt-2 font-semibold text-gray-500">{{ $t('common.armor_i') }}</span>
                <div class="text-2xl">
                  <Skeleton v-if="loading" height="25px" width="25px" class="my-1" />
                  <span v-else>{{ npc.armourClass }}</span>
                </div>
                <span class="text-[8px] relative -mt-1 font-semibold text-gray-500">{{ $t('common.class_i') }}</span>
              </section>
              <section class="h-[89px] w-[94px] proeficiency_card p-2 flex flex-col justify-center items-center uppercase">
                <span class="text-[10px] font-semibold">{{ $t('common.proeficiency') }}</span>
                <div class="my-1 text-2xl">
                  <Skeleton v-if="loading" height="30px" width="30px" />
                  <div v-else>
                    <span class="text-gray-500">+</span>{{ proeficiency(npc.level) }}
                  </div>
                </div>
                <span class="font-semibold">{{ $t('common.bonus') }}</span>
              </section>
              <section class="h-[89px] w-[94px] walking_card p-2 flex flex-col justify-center items-center">
                <span class="text-[10px] font-light uppercase">{{ $t('common.walking') }}</span>
                <div class="my-2 text-sm">
                  <Skeleton v-if="loading" height="30px" width="30px" />
                  <span v-else>{{ npc.speed }}</span>
                </div>
                <span class="text-[10px] font-semibold uppercase">{{ $t('common.speed') }}</span>
              </section>
              <section class="flex flex-col content-start items-center gap-0">
                <span class="text-[10px] uppercase font-bold" style="text-shadow: 0.0625rem 0.0625rem 0 #ececec, -0.0625rem -0.0625rem 0 #ececec, -0.0625rem 0.0625rem 0 #ececec, 0.0625rem -0.0625rem 0 #ececec;">{{ $t('common.initiative') }}</span>
                <div class="h-[60px] w-[80px] initiative_card p-2 flex flex-col justify-center items-center">
                  <div class="my-2 text-3xl border border-gray-400 dark:border-gray-300 rounded w-[80%] text-center">
                    <Skeleton v-if="loading" height="30px" width="30px" />
                    <span v-else>{{ npc.initiative }}</span>
                  </div>
                </div>
              </section>
              <section class="h-[89px] w-[300px] hp_card py-2 px-4">
                <div class="flex flex-row justify-between items-center">
                  <span class="text-[10px] font-light">{{ $t('common.hit_points') }}</span>
                  <span class="text-[10px] font-light">{{ $t('common.hit_dice') }}</span>
                </div>
                <div class="flex flex-row justify-between items-center">
                  <Skeleton v-if="loading" height="25px" width="50px" />
                  <span v-else class="text-2xl font-semibold">{{ npc.hitPoints }}</span>
                  <Skeleton v-if="loading" height="25px" width="75px" />
                  <span v-else class="text-2xl font-semibold">{{ npc.hitDice }}</span>
                </div>
              </section>
            </div>
            <div class="flex flex-row justify-start gap-4 overflow-scroll">
              <section class="basic_info_card w-[475px] h-[500px] flex flex-col justify-start items-stretch gap-2 py-2 px-4">
                <div class="mb-6 text-justify">
                  <h2 class="text-2xl mb-2">{{ $t('common.description') }}</h2>
                  <Skeleton v-if="loading" height="150px" width="100%" />
                  <p v-else class="font-light">{{ npc.description }}</p>
                </div>
                <div class="text-jusitfy">
                  <h2 class="text-2xl mb-2">{{ $t('appearances.title') }}</h2>
                  <Skeleton v-if="loading" height="150px" width="100%" />
                  <p v-else class="font-light">{{ npc.appearance_ }}</p>
                </div>
              </section>
              <section class="basic_info_card w-[475px] h-[500px] flex flex-col justify-start items-stretch gap-2 py-2 px-4">
                ...
              </section>
            </div>
          </div>
          <div class="flex justify-center items-center inset-shadow-sm w-full lg:w-1/2 h-auto rounded-r inset-shadow-gray-500 striped-bg">
            <div v-if="loading" class="bg-white dark:bg-gray-900 p-6 shadow rounded mt-4">
              <div class="flex flex-col items-center justify-center">
                <ProgressSpinner />
                <div class="text-lg font-medium text-surface-900 dark:text-surface-0 mt-2">{{ $t('common.loading') }}</div>
              </div>
            </div>
            <div v-else class="grid grid-cols-1 w-full lg:w-[450px] h-auto lg:h-[750px] bg-white shadow rounded overflow-hidden content-between">
              <div class="header bg-gray-800 p-4 flex flex-row justify-between items-center">
                <div>
                  <h2 class="text-3xl text-gray-50 mb-0">{{ npc.name }} <i class="text-xs">nv. {{ npc.level }}</i></h2>
                  <small class="text-gray-50 relative -t-2">{{ `${npc.age} ${$t('common.years')} / ${$t(`sex_orientation.${npc.sexOrientation}`)}` }}</small>
                </div>
                <div class="flex flex-col">
                  <small class="text-gray-50">{{ $t(`races.${npc.race}`) }}</small>
                  <small class="text-gray-50">{{ $t(`classes.${npc.classes}`) }}</small>
                  <small class="text-gray-50">{{ npc.job ? $t(`jobs.${npc.job}`) : '-' }}</small>
                </div>
              </div>
              <div class="body px-4">
                <table class="table-auto w-full border-separate mb-2">
                  <tbody>
                    <tr class="border-b border-gray-300">
                      <td class="bg-gray-200 p-1 rounded-tl w-[40%] text-right alegreya">{{ `${$t('common.armor_i')} ${$t('common.class_i')}` }}</td>
                      <td class="bg-gray-100 p-1 rounded-tr">{{ npc.armourClass }}</td>
                    </tr>
                    <tr class="border-b border-gray-300">
                      <td class="bg-gray-200 p-1 text-right alegreya">{{ $t('common.hit_points') }}</td>
                      <td class="bg-gray-100 p-1">{{ npc.hitPoints }} <small class="text-xs">{{ npc.hitDice }}</small></td>
                    </tr>
                    <tr class="">
                      <td class="bg-gray-200 p-1 rounded-bl text-right alegreya">{{ $t('common.speed') }}</td>
                      <td class="bg-gray-100 p-1 rounded-br">{{ npc.speed }}</td>
                    </tr>
                  </tbody>
                </table>
                <div class="attrs flex fles-row justify-between gap-1 mb-2">
                  <div v-for="attr in npc.attr" class="flex items-center justify-center flex-col bg-gray-100 rounded p-2 w-[65px]">
                    <div><h2 class="text-sm font-semibold">{{ attr.short }}</h2></div>
                    <div>
                      <div class="flex flex-row items-center justify-center gap-1">
                        <span class="font-light">{{ attr.value }}</span>
                        <span class="font-semibold text-gray-500"> ({{ attr.bonus }})</span>
                      </div>
                    </div>
                  </div>
                </div>
                <table class="w-full border-separate mb-2">
                  <tbody>
                    <tr class="border-b border-gray-300">
                      <td class="bg-gray-200 p-1 text-right rounded-tl w-[40%]">{{ $t('common.saving_throws') }}</td>
                      <td class="bg-gray-100 p-1 rounded-tr">{{ npc.savingThrows }}</td>
                    </tr>
                    <tr class="border-b border-gray-300">
                      <td class="bg-gray-200 p-1 text-right">{{ $t('common.languages') }}</td>
                      <td class="bg-gray-100 p-1">{{ npc.languages }}</td>
                    </tr>
                    <tr>
                      <td class="bg-gray-200 p-1 rounded-bl text-right">{{ $t('common.initiative') }}</td>
                      <td class="bg-gray-100 p-1 rounded-br">{{ npc.initiative }}</td>
                    </tr>
                  </tbody>
                </table>
                <div class="rounded bg-gray-100 overflow-hidden mb-2">
                  <div class="bg-gray-200 py-1 px-2 rounded-tl">
                    <h2 class="font-semibold text-base">{{ $t('common.description') }}</h2>
                  </div>
                  <div class="text-justify text-xs p-2">
                    <p>{{ npc.description }}</p>
                  </div>
                </div>
                <div class="rounded bg-gray-100 overflow-hidden mb-2">
                  <div class="bg-gray-200 py-1 px-2 rounded-tl">
                    <h2 class="font-semibold text-base">{{ $t('appearances.title') }}</h2>
                  </div>
                  <div class="text-justify text-xs p-2">
                    <p>{{ npc.appearance_ }}</p>
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
