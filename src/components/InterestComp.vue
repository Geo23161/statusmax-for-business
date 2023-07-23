<template>
  <ion-modal mode="ios" :is-open="isOpen">
    <ion-header>
      <ion-toolbar>
        <ion-title>Categories</ion-title>
        <ion-buttons slot="start">
          <ion-button color="danger" @click="close()">Fermer</ion-button>
        </ion-buttons>
        <ion-buttons v-if="inters.length" slot="end">
          <ion-button color="secondary" @click="done(inters)">Valider</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div v-if="interests.length" style="margin-right: 0.6rem;">
          <ion-button @click="boxs = ''">
            <ion-icon :icon="arrowBack"></ion-icon>
            Retour
          </ion-button>
        </div>
        <div style="color: rgb(41, 41, 41); padding-bottom: 1rem; text-align: right;">
          {{ !interests.length ? 'Choisissez le type de produit ou service' : 'Selectionnez les catégories possibles' }}
        </div>
      </div>
      <div v-if="interests.length">
        <div v-if="interests.length" style="padding-top: 1rem">
          <ion-item  v-for="q in interests" :key="`${q.name}:${q.id}`" @click.prevent="includes_inter(q)">
            <ion-checkbox :checked="in_inter(q)" slot="start"></ion-checkbox>
            <ion-label class="ion-text-wrap">{{ q.name }}</ion-label>
          </ion-item>
        </div>
        <div v-if="inters.length" style="padding: 1rem;">
          <ion-button @click="done(inters)" mode="md" expand="full">Valider</ion-button>
        </div>
      </div>
      <div v-else>
        <ion-item :button="true" :detail="true" v-for="q in boxl" :key="`${q.name}:${q.id}`" @click.prevent="boxs = q.id">
          <ion-label class="ion-text-wrap">{{ q.name }}</ion-label>
        </ion-item>
      </div>
    </ion-content>
  </ion-modal>
</template>

<script >
import { defineComponent, defineProps, ref, defineEmits, watch, computed } from "vue";
import {
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonModal,
  IonIcon,
  IonAvatar,
  IonCheckbox,
  IonSearchbar
} from "@ionic/vue";
import { location, arrowBack } from "ionicons/icons";
import { show_alert, showLoading, access_tok } from "@/global/utils";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  props: {
    isOpen: Boolean
  },
  components: {
    IonCheckbox,
    IonList,
    IonItem,
    IonLabel,
  },
  setup(prop, { emit }) {
    const emits = defineEmits(["close", "done"]);
    const close = () => {
      emit("close");
    };
    const done = (inter) => {
      emit("done", inter);
    };
    const interests = computed(() => {
      return !boxs.value ? [] : restd.value['inter:' + boxs.value]
    });
    const inters = ref([]);
    const router = useRouter();
    const boxl = ref([]);
    const boxs = ref(0)
    const restd = ref();


    const includes_inter = (q) => {
      if ((inters.value.filter(e => e.id == q.id).length > 0)) {
        inters.value = inters.value.filter(e => e.id != q.id)
      } else {
        inters.value.push(q)
      }
    }

    const in_inter = (q) => {
      if ((inters.value.filter(e => e.id == q.id).length > 0)) {
        return true
      } else {
        false
      }
    }

    const get_list = async () => {
      const resp = await axios.get('api/get_interests/', {
        headers: {
          Authorization: `Bearer ${await access_tok(router, undefined)}`
        }
      });
      if (resp.data['done']) {
        boxl.value = resp.data.boxl;
        restd.value = resp.data.restd;
      }
    }

    const get_interests = async () => {
      const resp = await axios.get("api/get_interests/", {
        headers: {
          Authorization: `Bearer ${await access_tok(router, undefined)}`
        }
      })
      if (resp.data['done']) interests.value = [{ id: 0, name: "Tous les centres d'interêts" }].concat((resp.data['result']))
    };

    get_list()

    return {
      close,
      done,
      interests,
      inters,
      includes_inter,
      in_inter,
      boxl,
      restd,
      arrowBack,
      boxs
    };
  },
});
</script>