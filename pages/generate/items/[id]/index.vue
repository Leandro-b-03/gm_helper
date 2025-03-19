<script setup lang="ts">
const { locale } = useNuxtApp().$i18n;
const { database, ID } = useAppwrite();
const config = useRuntimeConfig();
const router = useRouter();
const route = useRoute();

const panelColapsed = ref(false);
const loading = ref(false);
const type = ref('');
const panel = ref(null);
const item = reactive({
  show: false,
  class_: '',
  name: '',
  description: '',
  weaponType: '',
  damage: '',
  requirements: '',
  type: '',
  wondrousItems: '',
  rarity: '',
  itemTier: '',
  evolutionLevel: [
    1, 2, 3, 4, 5
  ],
  notes: [],
});

const { data: classesData, status: statusClasses, error: errorClasses, refresh: refreshClasses, clear: clearClasses } = await useAsyncData(
  'classes',
  () => $fetch(`${config.public.url}tables/classes.json`)
);
const { data: damages, status: statusDamages, error: errorDamages, refresh: refreshDamages, clear: clearDamages } = await useAsyncData(
  'damages',
  () => $fetch(`${config.public.url}tables/damage_type.json`)
);
const { data: types, status: statusTypes, error: errorTypes, refresh: refreshTypes, clear: clearTypes } = await useAsyncData(
  'types',
  () => $fetch(`${config.public.url}tables/types.json`)
);
const { data: wondrousItems, status: statusWondrousItems, error: errorWondrousItems, refresh: refreshWondrousItems, clear: clearWondrousItems } = await useAsyncData(
  'wondrousItems',
  () => $fetch(`${config.public.url}tables/wondrous_items.json`)
);
const { data: rarities, status: statusRarities, error: errorRarities, refresh: refreshRarities, clear: clearRarities } = await useAsyncData(
  'rarities',
  () => $fetch(`${config.public.url}tables/rarities.json`)
);
const { data: weapons, status: statusWeapons, error: errorWeapons, refresh: refreshWeapons, clear: clearWeapons } = await useAsyncData(
  'weapons',
  () => $fetch(`${config.public.url}tables/weapons.json`)
);

const initialValues = reactive({
  class_: classesData.value[0],
  damage: damages.value[0],
  type: types.value[0],
  wondrous_items: wondrousItems.value[0],
  rarity: rarities.value[0],
  weapons: weapons.value[0],
});

const resolver = ({ values }) => {
  const errors = {};
  const requiredFields = [
    'type', 'class_', 'rarity', 'damage'
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = [{ message: `${field} is required.` }];
    }
  });
  return { values, errors };
};

const changeType = (type_: Event) => {
  type.value = type_.value;
}

const onFormSubmit = async ({ values, valid }) => {
  if (!valid) return;

  panel.value.toggle();
  loading.value = true;
  item.show = true;

  try {
    const formData = new FormData();
    formData.append('generate', 'ITEM');
    Object.entries(values).map(([key, value]) => {
      formData.append(key, value.value);
    });

    const ITEM = await $fetch('/api/core', { method: 'POST', body: formData });

    Object.assign(item, {
      ...ITEM,
      class_: ITEM.class,
      wondrousItems: ITEM.wondrous_items,
      weaponType: ITEM.weapon,
      evolutionLevel: ITEM.evolution_levels,
      evolutionNotes: ITEM.evolution_notes,
    });

    const response = await database.createDocument(
      config.public.databaseID,
      config.public.itemsCollectionID,
      ID.unique(),
      {
        name: ITEM.name,
        class: ITEM.class,
        description: ITEM.description,
        type: ITEM.type,
        damage: [JSON.stringify(ITEM.damage)],
        damage_type: ITEM.damage_type,
        requirements: ITEM.requirements,
        wondrous_item: ITEM.wondrous_items,
        rarity: ITEM.rarity,
        item_tier: ITEM.item_tier,
        weapon_type: ITEM.weapon,
        evolution_level: [JSON.stringify(ITEM.evolution_levels)],
        notes:ITEM.notes,
        evolution_notes: ITEM.evolution_notes
      }
    );

    router.push({
      name: `generate-items-id___${locale.value}`,
      params: { id: response.$id },
      reload: false,
    });
  } catch (error) {
    console.error('Error creating ITEM:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  const id = route.params.id;
  if (id !== 'new') {
    item.show = true;
    loading.value = true;
    try {
      const response = await database.getDocument(
        config.public.databaseID,
        config.public.itemsCollectionID,
        id
      );
      
      Object.assign(item, {
        ...response,
        class_: response.class,
        name: response.name,
        description: response.description,
        type: response.type,
        damage: JSON.parse(response.damage[0]),
        requirements: response.requirements,
        wondrousItems: response.wondrous_item,
        rarity: response.rarity,
        itemTier: response.item_tier,
        weaponType: response.weapon_type,
        evolutionLevel: JSON.parse(response.evolution_level[0]),
        notes: response.notes,
        evolutionNotes: response.evolution_notes,
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
  <router-view :key="$route.fullPath"></router-view>
  <transition-fade group>
    <Panel :header="$t('generate.items.header')" class="w-full shadow-sm" toggleable :collapsed="panelColapsed" ref="panel">
      <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-2">
          <div class="flex flex-col gap-1" key="type">
            <label for="type" class="text-sm font-medium text-surface-500 dark:text-surface-300 mb-2">{{ $t('type.title') }}</label>
            <Select :options="types" optionLabel="label" name="type" type="text" placeholder="type" fluid @change="changeType($event)">
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
          <div class="flex flex-col gap-1" key="classesData">
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
            <Message v-if="$form.class_?.invalid" severity="error" size="small" variant="simple">{{ $form.class_.error?.message }}</Message>
          </div>
          <div class="flex flex-col gap-1" key="rarity">
            <label for="rarity" class="text-sm font-medium text-surface-500 dark:text-surface-300 mb-2">{{ $t('rarities.title') }}</label>
            <Select :options="rarities" optionLabel="label" name="rarity" type="text" placeholder="rarity" fluid>
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
            <Message v-if="$form.rarity?.invalid" severity="error" size="small" variant="simple">{{ $form.rarity.error?.message }}</Message>
          </div>
          <div class="flex flex-col gap-1" key="damage">
            <label for="damage" class="text-sm font-medium text-surface-500 dark:text-surface-300 mb-2">{{ $t('damage.title') }}</label>
            <Select :options="damages" optionLabel="label" name="damage" type="text" placeholder="damage" fluid>
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
            <Message v-if="$form.rarity?.invalid" severity="error" size="small" variant="simple">{{ $form.rarity.error?.message }}</Message>
          </div>
          <div class="flex flex-col gap-1" key="weapon" v-if="type.value === 'weapon'">
            <label for="weapons" class="text-sm font-medium text-surface-500 dark:text-surface-300 mb-2">{{ $t('weapons.title') }}</label>
            <Select :options="weapons" optionLabel="label" name="weapons" type="text" placeholder="weapons" fluid>
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
            <Message v-if="$form.weapons?.invalid" severity="error" size="small" variant="simple">{{ $form.weapons.error?.message }}</Message>
          </div>
          <div class="flex flex-col gap-1" key="wondrousItems" v-if="type.value === 'wondrous_item'">
            <label for="wondrous_items" class="text-sm font-medium text-surface-500 dark:text-surface-300 mb-2">{{ $t('wondrous_items.title') }}</label>
            <Select :options="wondrousItems" optionLabel="label" name="wondrous_items" type="text" placeholder="wondrousItems" fluid>
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
            <Message v-if="$form.wondrousItems?.invalid" severity="error" size="small" variant="simple">{{ $form.wondrousItems.error?.message }}</Message>
          </div>
        </div>
        <Button type="submit" severity="secondary" :label="$t('common.generate_item')" :disabled="panelColapsed.value" :loading="loading" />
      </Form>
    </Panel>
  </transition-fade>

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
            <div class="grid grid-cols-1 w-full lg:w-[900px] h-auto bg-white shadow rounded overflow-hidden content-between">
              <div class="header bg-gray-800 p-4 flex flex-row justify-between items-center mb-1">
                <div>
                  <Skeleton v-if="loading" width="150px" height="35px" />
                  <h2 v-else class="text-3xl text-gray-50 mb-0">{{ item.name }} <i class="text-xs"></i></h2>
                  <Skeleton v-if="loading" width="100px" height="15px" class="mt-1" />
                  <small v-else class="text-gray-50 relative -t-2">{{ $t(`type.${item.type}`) }}</small>
                </div>
                <div class="flex flex-col">
                  <Skeleton v-if="loading" width="100px" height="15px" class="mb-1" />
                  <small v-else class="text-gray-50">{{ $t(`rarities.${item.rarity}`) }}</small>
                  <Skeleton v-if="loading" width="100px" height="15px" class="mb-1" />
                  <small v-else class="text-gray-50">{{ $t(`classes.${item.class_}`) }}</small>
                  <Skeleton v-if="loading" width="100px" height="15px" />
                  <small v-else class="text-gray-50">{{ item.weaponType ? $t(`weapons.${item.weaponType}`) : item.wondrousItem ? $t(`wondrous_item.${item.wondrousItem}`) : '-' }}</small>
                </div>
              </div>
              <div class="body px-2">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  <div>
                    <!-- <img src="/assets/images/items/weapons/holy_longsword.webp" :alt="item.name" class="w-full h-auto mb-2" /> -->
                    <!-- <img src="/assets/images/items/weapons/arcane_staff.webp" :alt="item.name" class="w-full h-auto mb-2" /> -->
                    <table class="table-auto w-full border-separate mb-2">
                      <tbody>
                        <tr class="border-b border-gray-300">
                          <td class="bg-gray-200 p-1 rounded-tl w-[40%] text-right font-semibold text-xs">{{ $t('common.damage') }}</td>
                          <td class="bg-gray-100 p-1 rounded-tr">
                            <Skeleton v-if="loading" width="15px" height="15px" />
                            <span v-else>
                              {{ item.damage?.base }}
                              <template v-if="item.damage?.versatile">, {{ item.damage?.versatile }}</template>
                            </span>
                          </td>
                        </tr>
                        <tr class="">
                          <td class="bg-gray-200 p-1 rounded-bl text-right font-semibold text-xs">{{ $t('common.requirements') }}</td>
                          <td class="bg-gray-100 p-1 rounded-br">
                            <Skeleton v-if="loading" width="80px" height="15px" />
                            <span v-else class="text-xs">{{ item.requirements }}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="rounded bg-gray-100 overflow-hidden mb-2">
                      <div class="bg-gray-200 py-1 px-2 rounded-tl">
                        <h2 class="font-semibold">{{ $t('common.description') }}</h2>
                      </div>
                      <div class="text-justify text-xs p-2">
                        <Skeleton v-if="loading" width="100%" height="100px" />
                        <p v-else>{{ item.description }}</p>
                      </div>
                    </div>
                    <div class="rounded bg-gray-100 overflow-hidden mb-2">
                      <div class="bg-gray-200 py-1 px-2 rounded-tl">
                        <h2 class="font-semibold">{{ $t('common.notes') }}</h2>
                      </div>
                      <div class="text-justify text-xs p-2">
                        <Skeleton v-if="loading" width="100%" height="100px" />
                        <p v-else v-for="note in item.notes">{{ note }}</p>
                      </div>
                    </div>
                    <div class="rounded bg-gray-100 overflow-hidden mb-2">
                      <div class="bg-gray-200 py-1 px-2 rounded-tl">
                        <h2 class="font-semibold">{{ $t('common.evolution_notes') }}</h2>
                      </div>
                      <div class="text-justify text-xs p-2">
                        <Skeleton v-if="loading" width="100%" height="100px" />
                        <p v-else v-for="evolutionNotes in item.evolutionNotes">{{ evolutionNotes }}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <!-- <div v-for="nivel in item.evolutionLevel" class="rounded bg-gray-100 overflow-hidden mb-2">
                      <div class="bg-gray-200 py-1 px-2 rounded-tl">
                        <h2 class="font-semibold text-base">{{ $t(`item_tier.tier_${nivel.level}`) }}</h2>
                      </div>
                      <div class="text-justify text-xs p-2">
                        <Skeleton v-if="loading" width="100%" height="100px" />
                        <div v-else>
                          <p>{{ nivel.playerLevel }}</p>
                          <p v-for="(bonus, index) in nivel.bonus" :key="index">{{ (bonus != undefined && bonus != '') ? bonus : '-' }}</p>
                          <p>{{ nivel.appearance }}</p>
                          <p>{{ nivel.evolutionRequirement }}</p>
                        </div>
                      </div>
                    </div> -->
                    <table v-for="nivel in item.evolutionLevel" class="w-full border-separate mb-2">
                      <thead>
                        <tr>
                          <th colspan="2" class="bg-gray-200 p-1 text-center rounded-t">{{ $t(`item_tier.tier_${nivel.level}`) }}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-if="loading" class="border-b border-gray-300">
                          <td class="bg-gray-100 p-1 rounded-br">
                            <Skeleton width="80px" height="15px" />
                          </td>
                        </tr>

                        <template v-else>
                          <tr>
                            <td class="bg-gray-200 p-1 text-right text-xs font-semibold">{{ $t('common.player_level') }}</td>
                            <td class="bg-gray-100 p-1 ">
                              <p class="text-xs">{{ $t(`common.level.${nivel.player_level}`) }}</p>
                            </td>
                          </tr>
                          <tr class="border-b border-gray-300">
                            <td class="bg-gray-200 p-1 text-right text-xs font-semibold">{{ $t(`bonus.title`) }}</td>
                            <td class="bg-gray-100 p-1">
                              <p v-for="bonus in nivel.bonus" class="text-xs">{{ bonus }}</p>
                            </td>
                          </tr>
                          <tr>
                            <td class="bg-gray-200 p-1 rounded-bl text-right text-xs font-semibold">{{ $t('common.evolution_requirement') }}</td>
                            <td class="bg-gray-100 p-1 rounded-br">
                              <p class="text-xs">{{ nivel.evolution_requirement ? nivel.evolution_requirement : '-' }}</p>
                            </td>
                          </tr>
                        </template>
                      </tbody>
                    </table>
                  </div>
                </div>
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