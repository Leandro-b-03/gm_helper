<script setup lang="ts">
  const props = defineProps<{
    npcs: Object[];
    loading: boolean;
  }>();
</script>

<template>
  <div class="flex flex-row flex-wrap gap-2">
    <TransitionFade group appear class="flex flex-row flex-wrap gap-2">
      <Card v-if="npcs" v-for="npc in npcs" class="w-[355px] h-[500px] mt-2 shadow-2xl overflow-hidden" :key="npc.$id">
        <template #header>
          <div class="header bg-gray-800 p-4 flex flex-row justify-between items-center mb-1">
            <div>
              <Skeleton v-if="loading" width="150px" height="35px" />
              <NuxtLink v-else :to="`/generate/npc/${npc.$id}`">
                <h2 class="text-3xl text-gray-50 mb-0" v-tooltip.top="npc.name">{{ textEllipsis(npc.name, 15) }}</h2>
              </NuxtLink>
              <Skeleton v-if="loading" width="100px" height="15px" class="mt-1" />
              <small v-else class="text-gray-50 relative -t-2">{{ (npc.age === -1) ? $t('age.unknown') : `${npc.age} ${$t('common.years')}` }} {{ `/ ${$t(`sex_orientation.${npc.sex_orientation}`)}` }} / <i class="text-xs">nv. {{ npc.level }}</i></small>
            </div>
          </div>
        </template>
        <template #content>
          <div class="h-[400px] relative">
            <div class="mb-1 w-full flex flex-row justify-start">
              <Skeleton v-if="loading" width="100px" height="15px" class="mb-1" />
              <h2 v-else class="text-gray-950 mr-2 text-lg">{{ $t(`classes.${npc.class}`) }}</h2>
              <Skeleton v-if="loading" width="100px" height="15px" />
              <h2 v-else class="text-gray-950 text-lg">{{ npc.job ? $t(`jobs.${npc.job}`) : '-' }}</h2>
            </div>
            <div class="mb-4">
              <Skeleton v-if="loading" width="100px" height="15px" class="mb-1" />
              <h4 v-else class="!text-[12px]">{{ $t(`races.${npc.race}`) }}</h4>
            </div>
            <div>
              <div class="mb-4 text-justify">
                <Skeleton v-if="loading" width="100%" height="60px" />
                <p v-else class="text-gray-700 text-sm">{{ textEllipsis(npc.description, 350) }}</p>
              </div>
            </div>
            <div class="absolute bottom-6 w-full">
              <div class="attrs flex flex-row flex-wrap gap-1 mb-2 w-full">
                <div v-for="attr in JSON.parse(npc.attr[0])" class="flex items-center justify-center flex-col bg-gray-100 rounded px-2 py-1 w-[75px]">
                  <div><h2 class="text-sm font-semibold">{{ attr.short }}</h2></div>
                  <div>
                    <div class="flex flex-row items-center justify-center gap-1">
                      <Skeleton v-if="loading" width="35px" height="20px" />
                      <div v-else>
                        <span class="font-light">{{ attr.value }}</span>
                        <span class="font-semibold text-gray-500"> ({{ attr.bonus }})</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Card>
      <div v-else>{{ $t('common.npc_empty') }}</div>
    </TransitionFade>
  </div>
</template>