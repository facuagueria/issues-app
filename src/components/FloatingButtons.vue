<script setup lang="ts">
interface FabButton {
  icon: string;
  color?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  action: () => void;
}
interface Props {
  buttons: FabButton[];
}

const props = defineProps<Props>();
</script>

<template>
  <div class="fab">
    <q-btn
      v-for="button in props.buttons"
      :key="button.icon"
      class="q-mr-sm"
      round
      :color="button.color || 'primary'"
      :icon="button.icon"
      :size="button.size || 'md'"
      @click="button.action"
    />
  </div>
</template>

<style scoped>
.fab {
  position: fixed;
  bottom: 30px;
  right: 30px;
}
</style>
