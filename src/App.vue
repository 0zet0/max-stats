<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { initializeAdMob, banner } from "@/ads";

async function initialize() {
  await initializeAdMob();
  await banner();
}

initialize();
</script>
<style lang="scss">
.footer {
  width: 100%;
}

@media only screen and (min-width: 1168px) {
  ion-router-outlet {
    width: 600px;
    margin: 0 auto;
    overflow: hidden;
  }
}

@media only screen and (min-width: 768px) {
  .footer {
    width: 600px;
  }
}
</style>
