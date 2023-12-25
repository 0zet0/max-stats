<template>
  <div class="scrollbar-list" ref="scrollcontainer" :style="{ height }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

defineProps({
  height: { type: String, default: "auto" },
});

const scrollcontainer = ref();
const rect = ref({ height: 0 });
const stopPropagation = ref(false);

onMounted(() => {
  scrollcontainer.value.ontouchstart = (e: Event) => {
    rect.value = scrollcontainer.value.getBoundingClientRect();
    stopPropagation.value = false;

    setTimeout(() => {
      stopPropagation.value = true;
    }, 100);
  };

  scrollcontainer.value.ontouchend = () => {
    stopPropagation.value = true;
  };

  scrollcontainer.value.ontouchmove = (e: Event) => {
    const { scrollTop, scrollHeight } = scrollcontainer.value;

    const bottomOfList = scrollTop + rect.value.height + 1 >= scrollHeight;
    if ((scrollTop === 0 || bottomOfList) && stopPropagation.value) return;

    e.stopPropagation();
    stopPropagation.value = false;
  };
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/lib/global.scss";

.scrollbar-list {
  position: relative;
  width: 100%;

  @include scrollbarY(0);
}
</style>
