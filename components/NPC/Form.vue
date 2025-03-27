<script setup lang="ts">
const route = useRoute();

const props = withDefaults(defineProps<{
  age: any,
  races: any,
  gender: any,
  alignments: any,
  levels: any,
  classesData: any,
  jobs: any,
  backgrounds: any,
  sexOrientations: any,
  appearances: any,
  personalities: any,
  affiliations: any,
  goals: any,
  backstories: any,
  enemy: any,
  difficulty: any,
  onFormSubmit: any,
  panelColapsed: boolean,
  loading: boolean,
  resolver: any,
  initialValues: any,
}>(), {
  panelColapsed: false,
});

const panelColapsed = ref(props.panelColapsed);

const search = ref(route.query.id ? false : true);

const header = ref(!search.value ? 'generate.npcs.header' : 'search.npcs.header');
const button = ref(!search.value ? 'common.generate' : 'search.title');
const panel = ref(null);

watch(() => props.panelColapsed, () => {
  if (panel.value) {
    panel.value.toggle();
  }
});
</script>

<template>
  <Panel :header="$t(header)" class="w-full shadow-sm" toggleable :collapsed="props.panelColapsed" ref="panel" @toggle="panelColapsed = !panelColapsed">
    <Form v-slot="$form" :initialValues :resolver @submit="props.onFormSubmit" class="flex flex-col gap-4 w-full">
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
      <Button type="submit" severity="secondary" :label="$t(button)" :disabled="panelColapsed" :loading="props.loading" />
    </Form>
  </Panel>
</template>