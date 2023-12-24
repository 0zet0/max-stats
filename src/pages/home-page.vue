<template>
  <ion-page id="main-content" class="home-page events-none">
    <ion-header>
      <ion-toolbar>
        <ion-buttons class="events-auto" slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding events-auto">
      <ion-list>
        <ion-card
          class="flex justify-between items-center"
          v-for="(item, idx) in items"
          :key="idx"
          @click="item.onClick(item)"
        >
          <ion-card-title>{{ item.title }}</ion-card-title>
          <svg
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14.5858 10.0001H0V8.00008H14.5858L8.29289 1.70718L9.70711 0.292969L18.4142 9.00008L9.70711 17.7072L8.29289 16.293L14.5858 10.0001Z"
              fill="white"
            />
          </svg>
        </ion-card>
      </ion-list>
      <ion-infinite-scroll @ionInfinite="ionInfinite">
        <ion-infinite-scroll-content></ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
    <ion-menu content-id="main-content" class="events-auto">
      <ion-content class="ion-padding"></ion-content>
    </ion-menu>
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
} from "@ionic/vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useStatsStore } from "@/entities/stats";
import {
  PhoneProssesors,
  ComputerProssesors,
  IntelProssesors,
} from "@/configs";

const router = useRouter();
const statsStore = useStatsStore();

const items = reactive([
  {
    title: "Процессоры Телефонов",
    items: PhoneProssesors,
    onClick: (item: any) => {
      statsStore.selectStats(item);
      router.push("stats");
    },
  },
  {
    title: "Процессоры Компьютеров",
    items: ComputerProssesors,
    onClick: (item: any) => {
      statsStore.selectStats(item);
      router.push("stats");
    },
  },
  {
    title: "Процессоры",
    items: IntelProssesors,
    onClick: (item: any) => {
      statsStore.selectStats(item);
      router.push("stats-ml");
    },
  },
]);

const ionInfinite = (ev: InfiniteScrollCustomEvent) => {
  setTimeout(() => ev.target.complete(), 500);
};
</script>

<style lang="scss">
.home-page {
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
  }
}
</style>
