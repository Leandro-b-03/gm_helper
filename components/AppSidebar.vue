<script setup lang="ts">
const router = useRouter();

const expandedKeys = ref([]);
const items = ref([
  {
  key: 'npcs',
  label: 'generate.npcs.title',
  icon: 'pi pi-user',
  items: [
    {
      key: 'npcs-list',
      label: 'generate.npcs.list',
      icon: 'pi pi-list',
      command: () => router.push('/generate/npc')
    },
    {
      key: 'npcs-create',
      label: 'generate.npcs.create',
      icon: 'pi pi-plus',
      command: () => router.push('/generate/npc/new')
    }
  ]
},
{
  key: 'items',
  label: 'generate.items.title',
  icon: 'pi pi-box',
  items: [
    {
      key: 'items-list',
      label: 'generate.items.list',
      icon: 'pi pi-list',
      command: () => router.push('/generate/item')
    },
    {
      key: 'items-create',
      label: 'generate.items.create',
      icon: 'pi pi-plus',
      command: () => router.push('/generate/item/new')
    }
  ]
},
  {
  key: 'combat',
  label: 'combat.title',
  items: [
    {
      key: 'combat-list',
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
    <PanelMenu v-model:expandedKeys="expandedKeys" :model="items" class="w-full" />
  </aside>
</template>