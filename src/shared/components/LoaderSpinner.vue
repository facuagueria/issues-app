<script setup lang="ts">

interface Props {
  color?: string,
  size?: string,
  thickness?: number
  showText?: boolean
}

withDefaults(defineProps<Props>(), {
  color: 'primary',
  size: '3rem',
  thickness: 2,
  showText: false
})
</script>

<template>
  <div class="column items-center">
    <q-spinner :color="color" :size="size" :thickness="thickness" />
    <span v-if="showText" class="q-mt-sm">Loading</span>
  </div>

</template>

<style scoped>

</style>
