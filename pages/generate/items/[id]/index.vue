<script setup lang="ts">
const { database, ID } = useAppwrite();
const config = useRuntimeConfig();

const panelColapsed = ref(false);
const loading = ref(false);
const type = ref('');
// const item = reactive({
//   show: true,
//   class_: '',
//   name: '',
//   description: '',
//   weapon_type: '',
//   damage: '',
//   requirements: '',
//   type: '',
//   wondrousItems: '',
//   rarity: '',
//   itemTier: '',
//   evolutionLevel: [],
//   notes: [],
// });

const item = reactive({
  "show": true,
  "class_": "paladin",
  "name": "Lâmina da Justiça Divina",
  "description": "Uma espada longa brilhante, com runas sagradas gravadas na lâmina. Ela emana uma leve aura dourada quando empunhada por alguém de coração justo. A Lâmina da Justiça Divina cresce em poder conforme o portador demonstra sua habilidade em combate.",
  "weaponType": "longsword",
  "damage": "1d8 cortante (versátil 1d10)",
  "requirements": "Qualquer personagem que utilize espadas longas",
  "type": "weapon",
  "wondrousItems": "",
  "rarity": "rare",
  "itemTier": "tier_1",
  "totalLevels": 3,
  "evolutionLevel": [
    {
      "level": 1,
      "playerLevel": "1_to_7",
      "bonus": {
        "extra_attack": "Ao acertar um ataque, role um dado adicional da categoria da arma (1d8 ou 1d10 se empunhada com as duas mãos)."
      },
      "appearance": "As runas brilham suavemente ao acertar um golpe, como se absorvessem a força do impacto.",
      "evolutionRequirement": "Acertar 3 ataques com rolagem 17 ou mais."
    },
    {
      "level": 2,
      "playerLevel": "8_to_14",
      "bonus": {
        "divine_smite": "Ao acertar uma rolagem 17 ou mais, o portador pode conjurar Divine Smite sem gastar um espaço de magia.",
        "additional_damage": "2d8 de dano radiante (como na habilidade do Paladino).",
        "stacks_with": "Dado adicional do Nível 1."
      },
      "appearance": "A lâmina brilha intensamente com uma luz dourada divina quando ativa o Divine Smite.",
      "evolutionRequirement": "Destruir um inimigo maligno poderoso usando Divine Smite 3 vezes."
    },
    {
      "level": 3,
      "playerLevel": "15_to_20",
      "bonus": {
        "attributes": "+1 em todos os atributos enquanto empunhando a arma.",
        "special_effect": "Enquanto empunhando a Lâmina da Justiça Divina, o usuário é considerado sob o efeito contínuo de Proteção contra o Mal e o Bem."
      },
      "appearance": "A espada fica envolta em uma aura dourada constante e as runas emitem um brilho ofuscante durante o combate."
    }
  ],
  "notes": [
    "O efeito de Divine Smite não consome espaços de magia, mas só pode ser ativado uma vez por turno.",
    "Se o personagem for um Paladino, o dano Divine Smite desta arma é adicionado ao dano do Divine Smite normal."
  ]
});

const { data: classesData, status: statusClasses, error: errorClasses, refresh: refreshClasses, clear: clearClasses } = await useAsyncData(
  'classes',
  () => $fetch(`${config.public.url}tables/classes.json`)
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
const { data: itemTiers, status: statusItemTiers, error: errorItemTiers, refresh: refreshItemTiers, clear: clearItemTiers } = await useAsyncData(
  'itemTiers',
  () => $fetch(`${config.public.url}tables/item_tiers.json`)
);
const { data: weapons, status: statusWeapons, error: errorWeapons, refresh: refreshWeapons, clear: clearWeapons } = await useAsyncData(
  'weapons',
  () => $fetch(`${config.public.url}tables/weapons.json`)
);

const initialValues = reactive({
  class_: classesData.value[0],
  type: types.value[0],
  wondrousItems: wondrousItems.value[0],
  rarity: rarities.value[0],
  itemTier: itemTiers.value[0],
  weapons: weapons.value[0],
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

const changeType = (type_: Event) => {
  type.value = type_.value;
}

const onFormSubmit = async ({ values }) => {
  console.log(values);
}
</script>

<template>
  <transition-fade group>
    <Panel :header="$t('generate.items.header')" class="w-full shadow-sm" toggleable :collapsed="panelColapsed">
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
          <div class="flex flex-col gap-1" key="itemTier">
            <label for="itemTier" class="text-sm font-medium text-surface-500 dark:text-surface-300 mb-2">{{ $t('item_tier.title') }}</label>
            <Select :options="itemTiers" optionLabel="label" name="itemTier" type="text" placeholder="itemTier" fluid>
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
            <Message v-if="$form.itemTier?.invalid" severity="error" size="small" variant="simple">{{ $form.itemTier.error?.message }}</Message>
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
            <label for="wondrousItems" class="text-sm font-medium text-surface-500 dark:text-surface-300 mb-2">{{ $t('wondrous_items.title') }}</label>
            <Select :options="wondrousItems" optionLabel="label" name="wondrousItems" type="text" placeholder="wondrousItems" fluid>
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
            <div class="grid grid-cols-1 w-full lg:w-[900px] h-[1000px] bg-white shadow rounded overflow-hidden content-between">
              <div class="header bg-gray-800 p-4 flex flex-row justify-between items-center mb-1">
                <div>
                  <Skeleton v-if="loading" width="150px" height="35px" />
                  <h2 v-else class="text-3xl text-gray-50 mb-0">{{ item.name }} <i class="text-xs">Total nv. {{ item.totalLevels }}</i></h2>
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
                    <img src="/assets/images/items/weapons/holy_longsword.webp" :alt="item.name" class="w-full h-auto mb-2" />
                    <div class="rounded bg-gray-100 overflow-hidden mb-2">
                      <div class="bg-gray-200 py-1 px-2 rounded-tl">
                        <h2 class="font-semibold text-base">{{ $t('common.description') }}</h2>
                      </div>
                      <div class="text-justify text-xs p-2">
                        <Skeleton v-if="loading" width="100%" height="100px" />
                        <p v-else>{{ item.description }}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <table class="table-auto w-full border-separate mb-2">
                      <tbody>
                        <tr class="border-b border-gray-300">
                          <td class="bg-gray-200 p-1 rounded-tl w-[40%] text-right alegreya">{{ $t('common.damage') }}</td>
                          <td class="bg-gray-100 p-1 rounded-tr">
                            <Skeleton v-if="loading" width="15px" height="15px" />
                            <span v-else>{{ item.damage }}</span>
                          </td>
                        </tr>
                        <tr class="">
                          <td class="bg-gray-200 p-1 rounded-bl text-right alegreya">{{ $t('common.requirements') }}</td>
                          <td class="bg-gray-100 p-1 rounded-br">
                            <Skeleton v-if="loading" width="80px" height="15px" />
                            <span v-else>{{ item.requirements }}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
                            <td class="bg-gray-200 p-1 text-right">{{ $t('common.player_level') }}</td>
                            <td class="bg-gray-100 p-1 ">
                              <p class="text-xs">{{ $t(`common.level.${nivel.playerLevel}`) }}</p>
                            </td>
                          </tr>
                          <tr class="border-b border-gray-300" v-for="(bonus, index) in nivel.bonus" :key="levelKey">
                            <td class="bg-gray-200 p-1 rounded-bl text-right">{{ $t(`bonus.${index}`) }}</td>
                            <td class="bg-gray-100 p-1" :class="{ 'rounded-br': isLastLevel(nivel.bonus, index) }">
                              {{ bonus }}
                            </td>
                          </tr>
                          <tr v-if="nivel.evolutionRequirement != '' && nivel.evolutionRequirement != undefined">
                            <td class="bg-gray-200 p-1 rounded-bl text-right">{{ $t('common.evolution_requirement') }}</td>
                            <td class="bg-gray-100 p-1 rounded-br">
                              <p class="text-xs">{{ nivel.evolutionRequirement }}</p>
                            </td>
                          </tr>
                        </template>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <div class="rounded bg-gray-100 overflow-hidden mb-2">
                    <div class="bg-gray-200 py-1 px-2 rounded-tl">
                      <h2 class="font-semibold text-base">{{ $t('common.notes') }}</h2>
                    </div>
                    <div class="text-justify text-xs p-2">
                      <Skeleton v-if="loading" width="100%" height="100px" />
                      <p v-else v-for="note in item.notes">{{ note }}</p>
                    </div>
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