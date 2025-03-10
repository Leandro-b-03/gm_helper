<script setup lang="ts">
const { database, ID } = useAppwrite();
const config = useRuntimeConfig();

const panelColapsed = ref(false);
const loading = ref(false);
const item = reactive({
  show: false,
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
</template>