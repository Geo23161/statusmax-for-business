<template>
  <ion-page v-if="paramObj">
    <ion-toolbar>
      <ion-title>Paramètres</ion-title>
    </ion-toolbar>
    <ion-content :fullscreen="true">
      <div class="separator">

      </div>
      <ion-list mode="ios">
        <ion-list-header>
          <ion-label>Compte </ion-label>
        </ion-list-header>
        <ion-item>
          <ion-label>
            <h2>{{ paramObj['name'] }}</h2>
            <p>
            <div class="stats">
              <div :style="{ 'background-color': paramObj['status'][1] }" class="indic"></div>
              <div class="stat_title">{{ paramObj['status'][0] }}</div>
            </div>
            </p>
          </ion-label>
        </ion-item>
      </ion-list>
      <ion-list mode="ios">
        <ion-list-header>
          <ion-label>Paiements</ion-label>
        </ion-list-header>
        <ion-item>
          <ion-label class="ion-text-wrap" >
            <h2 style="font-weight: 500;" >Montant disponible</h2>
            <h1 style="font-weight: bold; font-size: 1.6rem;" >{{ paramObj['dispo'] }} FCFA</h1>
            <p  >Rechargez votre compte afin d'eviter l'interruption fréquente de vos campagnes pour raison de non paiement
            </p>
            <p>
              <ion-button size="default" shape="round" expand="full" @click="cOpen = true">Rechargez</ion-button>
            </p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label class="ion-text-wrap" >
            <h2 style="font-weight: 500;" >Sole a payer</h2>
            <h1 style="font-weight: bold; font-size: 1.6rem;" >{{ paramObj['debt'] }} FCFA</h1>
            <p>Cela represente les impayés totaux de vos campagnes publicitaire. Veuillez regler le paiement afin d'eviter
              une interruption future</p>
            <p>
              <ion-button size="default" shape="round" expand="full" @click="yOpen = true">Payer</ion-button>
            </p>
          </ion-label>
        </ion-item>
        <ion-item @click.prevent="hOpen = true" :detail="true" button>
          <ion-label>
            Historique de paiements
          </ion-label>
        </ion-item>
      </ion-list>
      <ion-list mode="ios">
        <ion-list-header>
          <ion-label>A propos</ion-label>
        </ion-list-header>
        <ion-item @click="open_norm_lnk('https://wa.me/' + paramObj['admin'])" button>
          <ion-icon :icon="megaphone" slot="start" />
          <ion-label>Ecrivez-nous ici</ion-label>
        </ion-item>
        <ion-item button>
          <ion-icon @click="open_norm_lnk(paramObj['privacy'])" :icon="handLeftOutline" slot="start" />
          <ion-label>Politique de confidentialité</ion-label>
        </ion-item>
        <ion-item>
          <ion-label class="ion-text-wrap">
            <div style="font-weight: bolder"> StatusMax Buisness v1.0 </div>
            <div style="padding-top: 0.3rem">
              L'application ainsi que le logo sont des marques déposées par ELife Global.
            </div>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
    <charg-comp :is-open="cOpen" @close="cOpen = false" @done="cOpen = false, get_params()" />
    <pay-comp :is-open="yOpen" @close="yOpen = false" @done="yOpen = false, get_params()" />
    <pay-history :is-open="hOpen" @close="hOpen = false" />
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
.stat_title {
  color: rgb(48, 48, 48);
}

.indic {
  width: 8px;
  height: 8px;
  border-radius: 100%;
  margin-right: 0.3rem;
}

.stats {
  display: flex;
  align-items: center;
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
</style>

<script setup lang="ts">
import ChargComp from '@/components/ChargComp.vue';
import PayComp from '@/components/PayComp.vue';
import PayHistory from '@/components/PayHistory.vue';
import { access_tok } from '@/global/utils';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSpinner, IonList, IonListHeader, IonItem, IonLabel, IonButton, onIonViewDidEnter } from '@ionic/vue';
import axios from 'axios';
import { handLeftOutline, megaphone } from 'ionicons/icons';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const open_norm_lnk = (lnk: string) => {
  window.location.href = lnk;
};

const cOpen = ref(false)
const yOpen = ref(false)
const hOpen = ref(false)
const paramObj = ref()
const router = useRouter()

const get_params = async () => {
  const resp = await axios.get('api/get_cparams/', {
    headers: {
      Authorization: `Bearer ${await access_tok(router, undefined)}`
    }
  })
  if (resp.data['done']) paramObj.value = resp.data['result']
}

onIonViewDidEnter(() => {
  get_params();
})
</script>
