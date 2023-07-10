<template>
  <ion-page v-if="!loading">
    <ion-toolbar>
      <ion-title>Notifications</ion-title>
    </ion-toolbar>
    <ion-content :fullscreen="true">
      <div class="separator">

      </div>
      
      <div class="dems_cont" >
        <ion-item v-for="notif in notifs" :key="notif.id" @click="router.push(notif.action_url)" button>
          <ion-avatar slot="start">
            <img :src="notif.image" style="margin-right: 0.6rem;" />
          </ion-avatar>
          <ion-label class="ion-text-wrap">
            {{ notif.text }}
          </ion-label>
        </ion-item>
      </div>
      <div class="no_campaign" v-if="!can_notif && !is_web">
        <div>
          <div style="display: flex; justify-content: space-around;">
            <img :src="'../../img/notif.svg'" style="width: 50vw;" />
          </div>
          <div style="padding: 0.9rem 1rem; text-align: center;">
            <div style="font-size: 1rem; font-weight: bold;">
              Notification non active
            </div>
            <div style="font-size: 0.9rem; padding-top: 1rem; ">
              Veuillez autorisez StatusMax Business a vous envoyer les notifications.
            </div>
            <div style="display: flex; justify-content: space-around; padding-top: 0.9rem;">
              <ion-button @click="register_notif()" mode="ios">
                <ion-icon slot="start" :icon="notifications"></ion-icon>
                Autoriser
              </ion-button>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
  <ion-page v-else>
    <ion-content>
      <div class="body_all">
        <div class="global_spinner">
          <div>
            <ion-spinner color="primary" name="circles"></ion-spinner>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped >
.dems_cont {
  padding-bottom: 0rem;
  padding-left: 0rem;
  padding-right: 1rem;
  padding-top: 1rem;
}

.global_spinner {
  padding-top: 40vh;
  display: flex;
  justify-content: space-around;
}

.body_all {
  width: 100vw;
  min-height: 100%;
  background: white;
}

.no_campaign {
  padding-top: 3rem;
}

.is_add {
  padding-top: 4.5px;
  font-size: 1.7rem !important;
  background: rgb(209, 209, 209) !important;
  color: rgb(88, 88, 88);
  margin-right: 0.8rem;

}

.custom_but {
  width: 45px;
  height: 45px;
  min-height: 40px;
  min-width: 40px;
  background: rgb(225, 225, 225);
  font-size: 1.2rem;
  border-radius: 100%;
}
</style>

<script setup lang="ts">
import { access_tok, registerNotifications } from '@/global/utils';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonSpinner, IonItem, IonAvatar, IonLabel, onIonViewDidEnter, isPlatform } from '@ionic/vue';
import axios from 'axios';
import { checkbox, checkmark, notifications, settings } from 'ionicons/icons';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const notifs = ref([] as any[])
const is_web = ref(false)

if(isPlatform("mobileweb")) is_web.value = true

const can_notif = ref(false)
const loading = ref(true)

const register_notif = async () => {
  const success = await registerNotifications()
  if(success) get_notifs()
}

const get_notifs = async () => {
  loading.value = true
  const resp = await axios.get('api/get_notifs/', {
    headers: {
      Authorization: `Bearer ${await access_tok(router, undefined)}`
    }
  })
  if (resp.data['done']) {
    notifs.value = resp.data['result']['notifs']
    can_notif.value = resp.data['result']['can_notif']
    loading.value =false
  }
}

onIonViewDidEnter(() => {
  get_notifs()
})

</script>
