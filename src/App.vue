<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { addListerners, registerNotifications } from './global/utils';

setTimeout(async () => {
  await registerNotifications();
  addListerners()
}, 2000);

</script>
