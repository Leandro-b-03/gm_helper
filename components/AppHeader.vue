<script setup lang="ts">
const router = useRouter();

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => {
      router.push({ path: '/' });
    }
  }
]);
</script>

<template>
  <div class="fixed top-0 left-0 right-0 z-10 bg-surface shadow-md">
    <Menubar :model="items" class="!rounded-none">
      <template #start>
        <img src="@/assets/images/logo.svg" alt="GM" class="h-10" />
      </template>
      <template #item="{ item, props, hasSubmenu, root }">
        <a v-ripple class="flex items-center" v-bind="props.action">
          <span>{{ item.label }}</span>
          <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
          <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
          <i v-if="hasSubmenu" :class="['pi pi-angle-down ml-auto', { 'pi-angle-down': root, 'pi-angle-right': !root }]"></i>
        </a>
      </template>
      <template #end>
      </template>
    </Menubar>
  </div>
</template>