<template>
  <ion-page class="stats-page events-none">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start" class="events-auto">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>{{ statsStore.selectedStats.title }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding events-auto">
      <ion-list>
        <ion-card
          class="flex flex-col"
          v-for="(item, idx) in statsStore.getSortedItems.slice(
            0,
            showItemsCount
          )"
          :key="idx"
        >
          <ion-card-title class="auto-truncate"
            >{{ idx + 1 }}. {{ item.title }}</ion-card-title
          >
          <ion-card-title class="auto-truncate mt-10 text-right w-full">{{
            item.value
          }}</ion-card-title>
          <gradient-progressbar
            :options="{
              value: item.value,
              maxValue: statsStore.getSortedItems[0].value,
            }"
          />
        </ion-card>
      </ion-list>
      <ion-infinite-scroll @ionInfinite="ionInfinite">
        <ion-infinite-scroll-content></ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList,
  IonItem,
  IonAvatar,
  IonImg,
  IonLabel,
  InfiniteScrollCustomEvent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton,
  IonBackButton,
} from "@ionic/vue";
import { reactive, ref } from "vue";
import { useStatsStore } from "@/entities/stats";

import { GradientProgressbar } from "@/components/progressbar";

const statsStore = useStatsStore();

const showItemsCount = ref(50);

const ionInfinite = (ev: InfiniteScrollCustomEvent) => {
  showItemsCount.value += 50;
  ev.target.complete();
};
</script>

<style lang="scss">
.stats-page {
  background: #28333f;

  ion-toolbar,
  ion-content,
  ion-menu {
    --background: #28333f;
    --color: #fff;
  }

  ion-toolbar {
    --background: radial-gradient(
      132.58% 190.6% at 25.33% -21.93%,
      #7b61ff 0%,
      rgba(123, 97, 255, 0) 96.36%
    );
  }

  ion-content {
    --background: #28333f;
  }

  ion-list {
    border-radius: 10px;
    background: transparent;
  }

  ion-card {
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.17);
    background: rgba(47, 60, 80, 0.4);
    box-shadow: 0px 4px 12px 0px rgba(28, 37, 44, 0.05);
    padding: 16px;
    transition: 0.3s;

    &:hover {
      padding: 16px 10px 16px 16px;
    }
  }

  ion-card-title {
    --color: var(--ion-color-step-850, #ffffff);
    font-size: 1.25rem;
    font-weight: 500;
    user-select: none;
  }
}
</style>
