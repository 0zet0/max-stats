<template>
  <div class="progressbar-view flex">
    <div
      class="progressbar-view__roll"
      :style="{
        width: isMounted ? `${(options.value / options.maxValue) * 100}%` : 0,
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

defineProps({
  options: {
    type: Object,
    default: () => ({
      value: 0,
      maxValue: 0,
    }),
  },
});

const isMounted = ref(false);

onMounted(() => setTimeout(() => (isMounted.value = true), 100));
</script>

<style lang="scss" scoped>
.progressbar-view {
  position: relative;
  height: 12px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.17);
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;

  &__roll {
    height: 100%;
    width: 0;
    border-radius: 5px;
    background: linear-gradient(90deg, #b96fff -1.52%, #55cb74 100%);
    box-shadow: 4px 0px 4px 0px rgba(0, 0, 0, 0.25);
    transition: 0.5s ease;
  }
}
</style>
