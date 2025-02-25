<template>
  <div class="app">
    <AppHeader />
    <div class="flex flex-row mt-16">
      <AppSidebar />
      <section class="layout-content flex-1 p-2 mb-10 ml-64">
        <slot />
      </section>
    </div>
    <AppFooter />
  </div>
</template>