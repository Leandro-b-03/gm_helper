<script setup lang="ts">
import { panel } from '@primeuix/themes/aura/accordion';

const config = useRuntimeConfig();

const npc = reactive({
  "name": 'Eldrathorn',
  "age": '22',
  "race": 'Humano',
  "gender": 'Masculino',
  "alignment": 'Neutro Bom',
  "level": '1',
  "classes": 'Lutador',
  "job": 'Taverneiro',
  "background": 'Nobre',
  "sexOrientation": 'Heterossexual',
  "appearance": 'Tatuado',
  "personality": 'Amigavel',
  "affiliations": 'Xanathar',
  "goals": 'Liberdade',
  "backstory": 'Criação nobre'
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
  classes: classesData.value[0],
  job: jobs.value[0],
  background: backgrounds.value[0],
  sexOrientation: sexOrientations.value[0],
  appearance: appearances.value[0],
  personality: personalities.value[0],
  affiliations: affiliations.value[0],
  goals: goals.value[0],
  backstory: backstories.value[0]
});
const panelColapsed = ref(false);

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

    if (!values.class) {
      errors.class = [{ message: 'Class is required.' }];
    }

    if (!values.jobs) {
      errors.jobs = [{ message: 'Jobs is required.' }];
    }

    if (!values.background) {
      errors.background = [{ message: 'Background is required.' }];
    }

    if (!values.sexOrientation) {
      errors.sexOrientation = [{ message: 'Sex orientation is required' }];
    }

    if (!values.appearance) {
      errors.appearance = [{ message: 'Appearance is required.' }];
    }

    if (!values.personality) {
      errors.personality = [{ message: 'Personality is required.' }];
    }

    if (!values.affiliations) {
      errors.affiliations = [{ message: 'Affiliations is required.' }];
    }

    if (!values.goals) {
      errors.goals = [{ message: 'Goals is required.' }];
    }

    if (!values.backstory) {
      errors.backstory = [{ message: 'Backstory is required.' }];
    }

    return {
        values, // (Optional) Used to pass current form values to submit event.
        errors
    };
};

const onFormSubmit = ({ valid }) => {
  panelColapsed.value = true;
  if (valid) {
    console.log('Form submitted');
  }
};
</script>

<template>
  <Panel header="Generate NPC" class="w-full shadow-sm" toggleable :collapsed="panelColapsed">
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
          <label for="classes" class="text-sm font-medium text-surface-500 dark:text-surface-300 mb-2">{{ $t('classes.title') }}</label>
          <Select :options="classesData" optionLabel="label" name="classes" type="text" placeholder="class" fluid>
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
          <label for="sexOrientation" class="text-sm font-medium text-surface-500 dark:text-surface-300 mb-2">{{ $t('sex_orientation.title') }}</label>
          <Select :options="sexOrientations" optionLabel="label" name="sexOrientation" type="text" placeholder="sexOrientation" fluid>
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
          <label for="affiliations" class="text-sm font-medium text-surface-500 dark:text-surface-300 mb-2">{{ $t('affiliations.title') }}</label>
          <Select :options="affiliations" optionLabel="label" name="affiliations" type="text" placeholder="affiliations" fluid>
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
          <Message v-if="$form.affiliations?.invalid" severity="error" size="small" variant="simple">{{ $form.affiliations.error?.message }}</Message>
        </div>
        <div class="flex flex-col gap-1">
          <label for="goals" class="text-sm font-medium text-surface-500 dark:text-surface-300 mb-2">{{ $t('goals.title') }}</label>
          <Select :options="goals" optionLabel="label" name="goals" type="text" placeholder="goals" fluid>
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
          <Message v-if="$form.goals?.invalid" severity="error" size="small" variant="simple">{{ $form.goals.error?.message }}</Message>
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

  <div class="bg-surface-50 dark:bg-surface-950 mt-4 rounded">
    <div class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded">
      <div class="text-3xl font-medium text-surface-900 dark:text-surface-0 mb-2">{{ $t('generate.npcs.title') }}</div>
      <div class="font-medium text-surface-500 dark:text-surface-300 mb-4">{{ $t('generate.npcs.description') }}</div>
      <section class="info mb-2 w-full lg:w-[340px] h-20 px-4 py-2 flex flex-row justify-between">
        <div class="w-auto">
          <div class="text-xs font-medium text-surface-500 dark:text-surface-300">{{ $t('common.name') }}</div>
          <div class="text-base font-semibold text-surface-900 dark:text-surface-0">{{ npc.name }}</div>
          <div class="text-xs font-light text-surface-900 dark:text-surface-0">{{ `${npc.age} ${$t('common.years')}` }}</div>
        </div>
        <div class="">
          <div class="text-sm font-light text-surface-900 dark:text-surface-0">{{ npc.race }}</div>
          <div class="text-sm font-medium text-surface-900 dark:text-surface-0">{{ npc.classes }}</div>
          <div class="text-sm font-medium text-surface-900 dark:text-surface-0">{{ npc.job ? npc.job : '-' }}</div>
        </div>
      </section>
      <div class="flex flex-row justify-start mb-2 gap-2">
        <section class="w-auto flex flex-row gap-2 mb-1">
          <div v-for="index in 6" class="ability_card h-[95px] w-[81px]">
            <div class="px-3 py-1">
              <div class="flex items-center justify-center my-1">
                <span v-tooltip.top="'STR'" class="uppercase text-[10px] font-semibold text-gray-500">Strength</span>
              </div>
              <div class="flex items-center justify-center w-full rounded border border-gray-400 dark:border-gray-300 mb-1 h-8">
                <span class="text-xl">+3</span>
              </div>
              <div class="flex items-center justify-center pt-1">16</div>
            </div>
          </div>
        </section>
        <section class="h-[89px] w-[94px] proeficiency_card p-2 flex flex-col justify-center items-center uppercase">
          <span class="text-[10px] font-semibold">{{ $t('common.proeficiency') }}</span>
          <div class="my-1 text-2xl"><span class="text-gray-500">+</span>2</div>
          <span class="font-semibold">{{ $t('common.bonus') }}</span>
        </section>
        <section class="h-[89px] w-[94px] walking_card p-2 flex flex-col justify-center items-center uppercase">
          <span class="text-[10px] font-light">{{ $t('common.walking') }}</span>
          <div class="my-1 text-2xl">30 <span class="text-gray-500 lowercase">m.</span></div>
          <span class="text-[10px] font-semibold">{{ $t('common.speed') }}</span>
        </section>
        <section class="h-[89px] w-[300px] hp_card py-2 px-4">
          <div class="flex flex-row justify-between items-center">
            <span class="text-[10px] font-light">{{ $t('common.hit_points') }}</span>
            <span class="text-[10px] font-light">{{ $t('common.hit_dice') }}</span>
          </div>
          <div class="flex flex-row justify-between items-center">
            <span class="text-2xl font-semibold">12</span>
            <span class="text-2xl font-semibold">1d10</span>
          </div>
        </section>
      </div>
      <div class="flex flex-row justify-start">
        <section class="basic_info_card w-[475px] h-[500px] flex flex-col justify-start items-stretch gap-2 py-2 px-4">
          <div class="mb-6">
            <h2 class="text-2xl mb-2">{{ $t('common.description') }}</h2>
            <p class="font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur lorem condimentum, vestibulum leo non, fermentum enim. Nam at accumsan justo, quis consequat justo.</p>
            <p class="font-light">Nullam cursus velit at eleifend sodales. Ut vehicula malesuada neque, sed gravida libero euismod id.</p>
            <p class="font-light">Sed mattis lacus sit amet ligula vehicula consequat</p>
            <p class="font-light">Nunc sit amet consectetur nisi</p>
            <p class="font-light">Integer ultricies nunc ante, eget interdum sem maximus ut</p>
          </div>
          <div>
            <h2 class="text-2xl mb-2">{{ $t('common.appearance') }}</h2>
            <p class="font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur lorem condimentum, vestibulum leo non, fermentum enim. Nam at accumsan justo, quis consequat justo.</p>
            <p class="font-light">Nullam cursus velit at eleifend sodales. Ut vehicula malesuada neque, sed gravida libero euismod id.</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>