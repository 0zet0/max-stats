<template>
  <div class="scrollbar-list" :style="{ height }">
    <ion-content style="--background: transparent">
      <ion-list style="--background: transparent" ref="scrollcontainer">
        <slot></slot>
      </ion-list>
    </ion-content>
  </div>
</template>

<script setup lang="ts">
import { IonContent, IonList } from "@ionic/vue";
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
  width: 100%;

  ion-content,
  ion-list {
    background: #28333f;
  }
}
</style>
