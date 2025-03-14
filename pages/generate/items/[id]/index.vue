<script setup lang="ts">
const { database, ID } = useAppwrite();
const config = useRuntimeConfig();

const panelColapsed = ref(false);
const loading = ref(false);
const item = reactive({
  show: true,
  type: '',
});

const type = ref([
  { label: "common.random", value: "random" },
  { label: 'type.item', value: 'item' },
  { label: 'type.weapon', value: 'weapon' },
  { label: 'type.armor', value: 'armor' },
  { label: 'type.potion', value: 'potion' },
  { label: 'type.scroll', value: 'scroll' },
  { label: 'type.ring', value: 'ring' },
  { label: 'type.wand', value: 'wand' },
  { label: 'type.rod', value: 'rod' },
  { label: 'type.staff', value: 'staff' },
  { label: 'type.misc', value: 'misc' },
]);

const initialValues = reactive({
  type: type.value[0],
});

const resolver = ({ values }) => {
  const errors = {};

  if (!values.type) {
    errors.type = [{ message: 'Type is required.' }];
  }

  return {
    values, // (Optional) Used to pass current form values to submit event.
    errors
  };
}

const onFormSubmit = async ({ values }) => {
  console.log(values);
}
</script>

<template>
  <Panel :header="$t('generate.items.header')" class="w-full shadow-sm" toggleable :collapsed="panelColapsed">
    <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-2">
        <div class="flex flex-col gap-1">
          <label for="type" class="text-sm font-medium text-surface-500 dark:text-surface-300 mb-2">{{ $t('type.title') }}</label>
          <Select :options="type" optionLabel="label" name="type" type="text" placeholder="type" fluid>
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
          <Message v-if="$form.type?.invalid" severity="error" size="small" variant="simple">{{ $form.type.error?.message }}</Message>
        </div>
      </div>
    </Form>
  </Panel>

  <TransitionGroup name="fade">
    <div v-if="item.show" class="bg-surface-50 dark:bg-surface-950 mt-4 rounded" key="item">
      <div class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded">
        <div class="text-3xl font-medium text-surface-900 dark:text-surface-0 mb-2">
          <Skeleton v-if="loading" height="25px" width="150px" />
          <span v-else>{{ $t('generate.items.title') }}</span>
        </div>
        <div class="font-medium text-surface-500 dark:text-surface-300 mb-4">
          <Skeleton v-if="loading" width="100px" />
          <span v-else>{{ $t('generate.items.description') }}</span>
        </div>
        <div class="flex flex-col lg:flex-row">
          <div class="flex justify-center items-center inset-shadow-sm w-full h-auto rounded inset-shadow-gray-500 striped-bg">
            <div class="grid grid-cols-1 w-full lg:w-[900px] h-auto lg:h-auto bg-white shadow rounded overflow-hidden content-between">
              <div class="header bg-gray-800 p-4 flex flex-row justify-between items-center mb-1">
                <div>
                  <Skeleton v-if="loading" width="150px" height="35px" />
                  <h2 v-else class="text-3xl text-gray-50 mb-0">{{ item.name }} <i class="text-xs">nv. {{ item.level }}</i></h2>
                  <Skeleton v-if="loading" width="100px" height="15px" class="mt-1" />
                  <small v-else class="text-gray-50 relative -t-2">{{ (item.age === -1) ? $t('age.unknown') : `${item.age} ${$t('common.years')}` }} {{ `/ ${$t(`sex_orientation.${item.sexOrientation}`)}` }}</small>
                </div>
                <div class="flex flex-col">
                  <Skeleton v-if="loading" width="100px" height="15px" class="mb-1" />
                  <small v-else class="text-gray-50">{{ $t(`races.${item.race}`) }}</small>
                  <Skeleton v-if="loading" width="100px" height="15px" class="mb-1" />
                  <small v-else class="text-gray-50">{{ $t(`classes.${item.class_}`) }}</small>
                  <Skeleton v-if="loading" width="100px" height="15px" />
                  <small v-else class="text-gray-50">{{ item.job ? $t(`jobs.${item.job}`) : '-' }}</small>
                </div>
              </div>
              <div class="body px-2">

              </div>
              <div class="footer">

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </TransitionGroup>
</template>