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
          @click="showInfo(item)"
        >
          <div class="flex justify-between flex-end gap-20">
            <ion-card-title class="auto-truncate w-full font-500-16"
              >{{ idx + 1 }}. {{ item.title }}</ion-card-title
            >
            <ion-card-title class="text-nowrap font-400-13">{{
              item.value
            }}</ion-card-title>
          </div>
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
    <ion-modal
      class="stats-page__modal"
      ref="modal"
      :initial-breakpoint="0.5"
      :breakpoints="[0, 0.5, 0.9]"
      :backdrop-breakpoint="0"
    >
      <ion-card-title
        class="stats-page__modal-header auto-truncate text-center"
      >
        Характеристики
      </ion-card-title>
      <ion-content>
        <scrollbar-list class="scrollbar-list" height="calc(90% - 25px)">
          <ion-card class="flex flex-col">
            <ion-card-title class="auto-truncate">{{
              selectedStats.title
            }}</ion-card-title>
            <ion-card-title class="auto-truncate text-right w-full">{{
              selectedStats.value
            }}</ion-card-title>
            <gradient-progressbar
              :options="{
                value: selectedStats.value,
                maxValue: statsStore.getSortedItems[0].value,
              }"
            />
          </ion-card>
          <p class="mt-20">{{ selectedStats.description }}</p>
        </scrollbar-list>
      </ion-content>
    </ion-modal>
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
  IonModal,
  onIonViewWillLeave,
} from "@ionic/vue";
import { reactive, ref } from "vue";
import { useStatsStore } from "@/entities/stats";

import { GradientProgressbar } from "@/components/progressbar";
import { ScrollbarList } from "@/components/scrollbar-list";

const statsStore = useStatsStore();

const showItemsCount = ref(25);
const selectedStats = ref({}) as any;
const modal = ref();
const modalKey = ref(false);
const ionInfinite = (ev: InfiniteScrollCustomEvent) => {
  showItemsCount.value += 25;
  ev.target.complete();
};

const showInfo = (stats: any) => {
  selectedStats.value = stats;
  modal.value?.$el.present();
};

onIonViewWillLeave(() => {
  modal.value?.$el.dismiss();
});
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
    position: relative;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.17);
    background: rgba(47, 60, 80, 0.4);
    box-shadow: 0px 4px 12px 0px rgba(28, 37, 44, 0.05);
    padding: 10px;
    transition: 0.3s;

    &:hover {
      padding: 10px 16px;
    }
  }

  ion-card-title {
    --color: #ffffff;
  }
}
</style>

<style lang="scss">
.stats-page__modal {
  // --height: auto;
  --background: #28333f;
  --border-radius: 20px 20px 0 0;

  ion-card {
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.17);
    background: rgba(47, 60, 80, 0.4);
    box-shadow: 0px 4px 12px 0px rgba(28, 37, 44, 0.05);
    padding: 16px;
  }

  ion-card-title {
    --color: #ffffff;
    font-size: 1.25rem;
    font-weight: 500;
    user-select: none;
  }

  ion-content {
    --background: transparent;
    --color: #fff;
  }

  p {
    color: #eeeeee;
  }

  .scrollbar-list {
    padding: 0 20px;
  }

  &-header {
    padding: 20px 0;
    height: fit-content;
    width: 100%;
    box-shadow: 0px 4px 23px 0px rgba(0, 0, 0, 0.349);
    border-bottom: 1px solid rgba(255, 255, 255, 0.17);
    z-index: 2;
  }
}
</style>
