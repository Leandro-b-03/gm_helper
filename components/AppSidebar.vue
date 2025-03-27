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
        shortcut: 'Ctrl+Shift+1',
        command: () => router.push('/generate/npc')
      },
      {
        key: 'npcs-create',
        label: 'generate.npcs.create',
        icon: 'pi pi-plus',
        shortcut: 'Ctrl+Shift+Alt+1',
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
        shortcut: 'Ctrl+Shift+2',
        command: () => router.push('/generate/item')
      },
      {
        key: 'items-create',
        label: 'generate.items.create',
        icon: 'pi pi-plus',
        shortcut: 'Ctrl+Shift+Alt+2',
        command: () => router.push('/generate/item/new')
      }
    ]
  },
  {
    key: 'combat',
    label: 'combat.title',
    icon: 'pi pi-shield',
    items: [
      {
        key: 'combat-list',
        label: 'combat.initiative.list',
        icon: 'pi pi-list',
        shortcut: 'Ctrl+Shift+3',
        command: () => router.push('/combat')
      },
      {
        key: 'combat-list',
        label: 'combat.initiative.title',
        icon: 'pi pi-cog',
        shortcut: 'Ctrl+Shift+Alt+3',
        command: () => router.push('/combat/new')
      }
    ]
  }
]);

function handleShortcut(event: KeyboardEvent) {
  const shortcutMap: Record<string, string> = {
    'Ctrl+Shift+1': '/generate/npc',
    'Ctrl+Shift+!': '/generate/npc',
    'Ctrl+Shift+Alt+1': '/generate/npc/new',
    'Shift+¹': '/generate/npc/new',
    'Ctrl+Shift+2': '/generate/item',
    'Ctrl+Shift+@': '/generate/item',
    'Ctrl+Shift+Alt+2': '/generate/item/new',
    'Ctrl+Shift+Alt+@': '/generate/item/new',
    'Ctrl+Shift+3': '/combat',
    'Ctrl+Shift+#': '/combat',
    'Ctrl+Shift+Alt+3': '/combat/new',
    'Ctrl+Shift+Alt+#': '/combat/new',
  };

  const pressedKeys = [
    event.ctrlKey ? 'Ctrl' : '',
    event.shiftKey ? 'Shift' : '',
    event.altKey ? 'Alt' : '',
    event.key.toUpperCase(),
  ]
    .filter(Boolean)
    .join('+');

  console.log('Pressed keys:', pressedKeys);

  if (shortcutMap[pressedKeys]) {
    event.preventDefault();
    event.stopPropagation();
    // Check if the pressed key is a valid shortcut
    // and navigate to the corresponding route
    // You can also use the command property of the item
    // to navigate if you want to keep the command logic
    // in the items array
    // Example: items.value.find(item => item.shortcut === pressedKeys)?.command();
    // or
    // Example: items.value.find(item => item.key === shortcutMap[pressedKeys])?.command();
    // or
    // Example: items.value.find(item => item.key === shortcutMap[pressedKeys])?.command();
    router.push(shortcutMap[pressedKeys]);
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleShortcut);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleShortcut);
});
</script>

<template>
  <aside class="layout-sidebar m-2 w-full md:w-60 fixed">
    <PanelMenu v-model:expandedKeys="expandedKeys" :model="items" class="w-full">
      <template #item="{ item }">
        <NuxtLink v-ripple class="flex items-center justify-between px-4 py-2 cursor-pointer group">
          <div class="flex items-center">
            <span :class="[item.icon, 'text-primary group-hover:text-inherit']" />
            <span :class="['ml-2', { 'font-semibold': item.items }]">{{ $t(item.label) }}</span>
          </div>
          <span v-if="item.shortcut" class="ml-1 border border-gray-200 rounded bg-gray-100 text-muted-color text-[8px] p-1">{{ item.shortcut }}</span>
        </NuxtLink>
      </template>
      
    </PanelMenu>
  </aside>
</template>