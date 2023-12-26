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
const startY = ref(-1);
const moveType = ref("none");

onMounted(() => {
  scrollcontainer.value.ontouchstart = (e: any) => {
    rect.value = scrollcontainer.value.getBoundingClientRect();
    const { scrollHeight } = scrollcontainer.value;
    if (rect.value.height + 1 >= scrollHeight) {
      moveType.value = "stop";
    }

    startY.value = e.touches[0]?.clientY || -1;
  };
  scrollcontainer.value.ontouchend = () => {
    startY.value = -1;

    moveType.value = "none";
  };
  scrollcontainer.value.ontouchmove = (e: any) => {
    if (moveType.value === "stop") {
      return;
    }

    if (startY.value === -1) {
      e.stopPropagation();

      return;
    }
    const currentY = e.touches[0]?.clientY || -1;
    if (currentY === -1) {
      e.stopPropagation();

      return;
    }

    const { scrollTop, scrollHeight } = scrollcontainer.value;
    const bottomOfList = scrollTop + rect.value.height + 1 >= scrollHeight;

    if (bottomOfList && startY.value < currentY) {
      e.stopPropagation();
      moveType.value = "locked";
      return;
    }

    if (startY.value < currentY) {
      if (moveType.value === "down") {
        startY.value = currentY;
        return;
      }

      moveType.value = "up";
    }

    if (startY.value > currentY) {
      if (moveType.value === "up") {
        startY.value = currentY;
        return;
      }

      moveType.value = "down";
    }

    if (scrollTop === 0 && startY.value < currentY) {
      startY.value = currentY;
      return;
    }

    if (bottomOfList && startY.value > currentY) {
      startY.value = currentY;
      return;
    }

    startY.value = currentY;

    e.stopPropagation();
  };
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/lib/global.scss";

.scrollbar-list {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  backface-visibility: hidden;
  width: 100%;

  @include scrollbarY(0);
}
</style>
