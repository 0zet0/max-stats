<template>
  <div class="scrollbar-list" ref="scrollcontainer" :style="{ height }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";

defineProps({
  height: { type: String, default: "auto" },
});

const scrollcontainer = ref();

onMounted(() => {
  scrollcontainer.value.ontouchstart = (e: Event) => {
    const { scrollTop, scrollHeight } = scrollcontainer.value;
    const { height } = scrollcontainer.value.getBoundingClientRect();

    if (height + 1 > scrollHeight) return;

    const bottomOfList = scrollTop + height + 1 >= scrollHeight;
    if (scrollTop !== 0 && !bottomOfList) e.stopPropagation();
    if (scrollTop !== 0 && bottomOfList) return;
    if (scrollTop === 0 && !bottomOfList) return;

    e.stopPropagation();
  };
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/lib/global.scss";

.scrollbar-list {
  position: relative;
  backface-visibility: hidden;
  width: 100%;

  @include scrollbarY(0);
}
</style>
