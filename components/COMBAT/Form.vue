<script setup lang="ts">
const route = useRoute();

const props = withDefaults(defineProps<{
  monsters: any;
  initialValues: any;
  resolver: any;
  onFormSubmit: any;
  panelColapsed: any;
  loading: any;
}>(), {
  monsters: []
});

const panelColapsed = ref(props.panelColapsed);
const search = ref(route.params.id ? false : true);
const header = ref(!search.value ? 'generate.items.header' : 'search.items.header');
const button = ref(!search.value ? 'common.generate' : 'search.title');
const panel = ref(null);

watch(() => props.panelColapsed, () => {
  if (props.panelColapsed === true) {
    console.log('Panel is collapsed');
    panel.value.toggle();
  }
});
</script>

<template>
  <transition-fade group>
    <Panel :header="$t(header)" class="w-full shadow-sm" toggleable :collapsed="panelColapsed" ref="panel">
      <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-2">
          <div class="grid grid-cols-2 gap-1">
            <div class="flex flex-col gap-1" key="monster">
              <label for="monster" class="text-sm font-medium text-surface-500 dark:text-surface-300 mb-2">{{ $t('monsters.title') }}</label>
              <Select :options="monsters" optionLabel="label" name="monster" type="text" placeholder="monster" fluid>
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
            <div class="flex flex-col gap-1" key="monster-qtd">
              <label for="monster-qtd" class="text-sm font-medium text-surface-500 dark:text-surface-300 mb-2">{{ $t('common.quantity_short') }}</label>
              <InputText name="monster-qtd" type="number" placeholder="qtd" class="w-20 h-[2.45rem]" />
              <Message v-if="$form.type?.invalid" severity="error" size="small" variant="simple">{{ $form.type.error?.message }}</Message>
            </div>
          </div>
        </div>
      </Form>
    </Panel>
  </transition-fade>
</template>