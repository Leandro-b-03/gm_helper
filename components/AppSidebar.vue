<script setup lang="ts">
const router = useRouter();

const items = ref([
{
  separator: true
},
{
  label: 'generate.title',
  items: [
    {
      label: 'generate.npcs.title',
      icon: 'pi pi-user',
      command: () => router.push('/generate/npcs')
    },
    {
      label: 'generate.items.title',
      icon: 'pi pi-box',
      command: () => router.push('/generate/items')
    },
    {
      label: 'generate.enemies.title',
      icon: 'pi pi-user-minus',
      command: () => router.push('/generate/enemies')
    }
  ]
},
{
  separator: true
},
{
  label: 'combat.title',
  items: [
    {
      label: 'combat.initiative.title',
      icon: 'pi pi-cog',
      command: () => router.push('/combat/initiative')
    }
  ]
}
]);
</script>

<template>
  <aside class="layout-sidebar m-2 w-full md:w-60 fixed">
    <Menu :model="items" class="w-full shadow">
    <template #start>
      <span class="flex justify-center items-center gap-1 px-2 py-2">
        <img src="@/assets/images/logo.svg" alt="PrimeVue Logo" class="h-6" />
        <span class="text-xl font-semibold">{{ $t('gm.title') }} <span class="text-primary">{{ $t('app') }}</span></span>
      </span>
    </template>
    <template #submenulabel="{ item }">
      <span class="text-primary font-bold">{{ $t(item.label) }}</span>
    </template>
    <template #item="{ item, props }">
      <a v-ripple class="flex items-center" v-bind="props.action">
        <span :class="item.icon" />
        <span>{{ $t(item.label) }}</span>
        <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
        <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
      </a>
    </template>
    <template #end>
    </template>
</Menu>
  </aside>
</template>