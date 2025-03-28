<script setup lang="ts">
const props = defineProps<{
  items: Object[];
  loading: boolean;
}>();
</script>

<template>
  <div class="flex flex-row flex-wrap gap-2">
    <TransitionFade group appear class="flex flex-row flex-wrap gap-2">
      <Card v-if="items" v-for="item in items" class="w-[355px] h-[500px] mt-2 shadow-2xl overflow-hidden" :key="item.$id">
        <template #header>
          <div class="header bg-gray-800 p-4 flex flex-row justify-between items-center mb-1">
            <div>
              <Skeleton v-if="loading" width="150px" height="35px" />
              <NuxtLink v-else :to="`/generate/item/${item.$id}`">
                <h2 class="text-3xl text-gray-50 mb-0" v-tooltip.top="item.name">{{ textEllipsis(item.name, 15) }}</h2>
              </NuxtLink>
              <Skeleton v-if="loading" width="100px" height="15px" class="mt-1" />
              <small v-else class="text-gray-50 relative -t-2">{{ $t(`rarities.${item.rarity}`) }}</small>
            </div>
          </div>
        </template>
        <template #content>
          <div class="h-[400px] relative">
            <div class="mb-1 w-full flex flex-row justify-start">
              <Skeleton v-if="loading" width="100px" height="15px" class="mb-1" />
              <h2 v-else class="text-gray-950 mr-2 text-lg">{{ $t(`type.${item.type}`) }}</h2>
              <Skeleton v-if="loading" width="100px" height="15px" />
              <h2 v-else class="text-gray-950 text-lg">{{ $t(`classes.${item.class}`) }}</h2>
            </div>
            <div class="mb-4">
              <Skeleton v-if="loading" width="100px" height="15px" class="mb-1" />
              <h4 v-else class="!text-[12px]">{{ item.weapon_type ? $t(`weapons.${item.weapon_type}`) : item.wondrous_item ? $t(`wondrous_item.${item.wondrous_item}`) : '-' }}</h4>
            </div>
            <div>
              <div class="mb-4 text-justify bg-gray-100 p-1 rounded border border-gray-200">
                <Skeleton v-if="loading" width="100%" height="60px" />
                <p v-else class="text-gray-700 text-sm">{{ textEllipsis(item.description, 300) }}</p>
              </div>
            </div>
            <div class="absolute bottom-6 w-full">
              <table class="table-auto w-full border-separate mb-2">
                <tbody>
                  <tr class="border-b border-gray-300">
                    <td class="bg-gray-200 p-1 rounded-tl w-[40%] text-right font-semibold text-xs">{{ $t('common.damage') }}</td>
                    <td class="bg-gray-100 p-1 rounded-tr text-xs">
                      <Skeleton v-if="loading" width="15px" height="15px" />
                      <span v-else>
                          <span v-if="JSON.parse(item.damage)">
                            {{ JSON.parse(item.damage)?.base }}
                            <template v-if="JSON.parse(item.damage)?.versatile">, {{ textEllipsis(JSON.parse(item.damage)?.versatile, 15) }}</template>
                          </span>
                          <span v-else>-</span>
                      </span>
                    </td>
                  </tr>
                  <tr class="">
                    <td class="bg-gray-200 p-1 rounded-bl text-right font-semibold text-xs">{{ $t('common.requirements') }}</td>
                    <td class="bg-gray-100 p-1 rounded-br">
                      <Skeleton v-if="loading" width="80px" height="15px" />
                      <span v-else class="text-xs text-justify">{{ textEllipsis(item.requirements, 45) }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </template>
      </Card>
      <Card v-else class="w-[355px] h-[500px] mt-2 shadow-2xl overflow-hidden">
        <template #content>
          <div class="h-[400px] w-full flex items-center justify-center">
            {{ $t('common.item_empty') }}
          </div>
        </template>
      </Card>
    </TransitionFade>
  </div>
</template>