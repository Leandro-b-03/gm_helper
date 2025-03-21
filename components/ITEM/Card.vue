<script setup lang="ts">
const props = defineProps<{
  item: any;
  loading: boolean;
  onFileChange: any;
}>();

const showButtons = ref(false);
const op = ref(null);
const file = ref(null);
const pdfSection = ref<HTMLElement | null>(null);

const togglePopover = (event) => {
  op.value.toggle(event);
}

const openUpload = () => {
  file.value.click();
};

const generatePDF = () => {
  if (pdfSection.value) {
    const popupWindow = window.open('', '_blank', 'width=800,height=600');
    if (popupWindow) {
      popupWindow.document.open();
      popupWindow.document.write(`
        <html>
          <head>
            <title>PDF Preview</title>
            <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"><\/script>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
              }
            </style>
          </head>
          <body>
            ${pdfSection.value.outerHTML}
          </body>
        </html>
      `);
      popupWindow.document.close();
    } else {
      console.error('Failed to open popup window.');
    }
  } else {
    console.error('pdfSection is not available.');
  }
};
</script>

<template>
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
        <div class="relative">
          <div class="absolute left-2 top-2 w-full">
            <Button label="gerar PDF" @click="generatePDF" />
          </div>
          <div class="flex justify-center items-center inset-shadow-sm w-full h-auto rounded inset-shadow-gray-500 striped-bg">
            <div class="grid grid-cols-1 w-full lg:w-[900px] h-auto bg-white shadow rounded overflow-hidden content-between" id="card-pdf" ref="pdfSection">
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
                    <div class="relative w-full h-auto mb-2 bg-gray-100 rounded overflow-hidden"
                      @mouseover="showButtons = true"
                      @mouseleave="showButtons = false">
                    <transition name="fade">
                      <div v-show="showButtons" class="absolute flex flex-row justify-between w-full top-0 left-0 z-10 p-2">
                        <Button icon="pi pi-upload" severity="secondary" @click="openUpload" />
                        <Button icon="pi pi-question-circle" severity="secondary" @click="togglePopover" />
                        <input type="file" ref="file" class="hidden" @change="onFileChange" />
                      </div>
                    </transition>
                    <Popover ref="op">
                      <p
                        v-for="evolutionLevel in item.evolutionLevel"
                        :key="evolutionLevel.appearance"
                      >
                        {{
                          `${$t(`item_tier.tier_${evolutionLevel.level}`)} - ${
                            evolutionLevel.appearance
                          }`
                        }}
                      </p>
                    </Popover>
                    <Skeleton v-if="loading" width="100%" height="438px" />
                    <img v-else :src="item.image" :alt="item.name" class="w-full h-auto" />
                  </div>                  
                    <table class="table-auto w-full border-separate mb-2">
                      <tbody>
                        <tr class="border-b border-gray-300">
                          <td class="bg-gray-200 p-1 rounded-tl w-[40%] text-right font-semibold text-xs">{{ $t('common.damage') }}</td>
                          <td class="bg-gray-100 p-1 rounded-tr">
                            <Skeleton v-if="loading" width="15px" height="15px" />
                            <span v-else>
                                <span v-if="item.damage">
                                  {{ item.damage?.base }}
                                  <template v-if="item.damage?.versatile">, {{ item.damage?.versatile }}</template>
                                </span>
                                <span v-else>-</span>
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
              <div class="footer w-full h-7 bg-gray-200 py-1 px-2">
                <div class="flex flex-row justify-between items-center">
                  <div class="flex flex-row gap-2">
                    {{ $t('card.footer_left') }}
                  </div>
                  <div class="flex flex-row gap-2">
                    {{ $t('card.footer_right') }} {{ new Date().getFullYear() }}
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