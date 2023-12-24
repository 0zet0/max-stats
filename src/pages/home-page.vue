<template>
  <ion-page id="main-content" class="home-page events-none">
    <ion-header>
      <ion-toolbar>
        <ion-buttons class="events-auto" slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-searchbar
          class="events-auto"
          slot="end"
          placeholder="Поиск"
          :debounce="1000"
          @ionInput="search($event)"
        ></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding events-auto">
      <ion-list>
        <ion-card
          class="flex justify-between items-center gap-20"
          v-for="(item, idx) in searchedItems"
          :key="idx"
          @click="item.onClick(item)"
        >
          <ion-card-title>{{ item.title }}</ion-card-title>
          <div class="min-w-19">
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
          </div>
        </ion-card>
      </ion-list>
      <ion-infinite-scroll @ionInfinite="ionInfinite">
        <ion-infinite-scroll-content></ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
    <ion-menu content-id="main-content" class="events-auto">
      <ion-content class="ion-padding events-auto">
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-button class="events-auto" expand="block" fill="clear">
                <ion-icon slot="start" :icon="optionsOutline"></ion-icon>
                <div class="w-full text-left">Параметры</div>
              </ion-button>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-button class="events-auto" expand="block" fill="clear">
                <ion-icon slot="start" :icon="informationCircle"></ion-icon>
                <div class="w-full text-left">О приложении</div>
              </ion-button>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-button
                class="events-auto"
                expand="block"
                fill="clear"
                @click="App.exitApp()"
              >
                <ion-icon slot="start" :icon="exitOutline"></ion-icon>
                <div class="w-full text-left">Выйти</div>
              </ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-content>
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
  IonSearchbar,
  IonIcon,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";
import { informationCircle, optionsOutline, exitOutline } from "ionicons/icons";
import { App } from "@capacitor/app";
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStatsStore } from "@/entities/stats";
import {
  PhoneProssesors,
  ComputerProssesors,
  IntelProssesors,
} from "@/configs";

const router = useRouter();
const statsStore = useStatsStore();

const query = ref("");

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
      router.push("stats");
    },
  },
]);

const searchedItems = computed(() =>
  items.filter((d) => d.title.toLowerCase().indexOf(query.value) > -1)
);

const ionInfinite = (ev: InfiniteScrollCustomEvent) => {
  setTimeout(() => ev.target.complete(), 500);
};

const search = (event: any) => {
  query.value = event.target.value.toLowerCase();
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

  ion-searchbar {
    --color: #fff;
    --clear-button-color: #fff;
    --icon-color: #fff;
    text-align: left;
    max-width: 400px;

    input {
      --border-radius: 50vh;
      --background: rgba(47, 60, 80, 0.4);
    }
  }

  ion-button {
    --background: rgba(47, 60, 80, 0.4);
    --color: #fff;
  }
}
</style>
