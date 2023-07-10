<template>
    <ion-modal :is-open="isOpen">
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button fill="clear" @click="close()">
                    <ion-icon :icon="arrowBack" />
                </ion-button>
            </ion-buttons>
            <ion-title>
                Creez votre audience
            </ion-title>
        </ion-toolbar>
        <ion-content>
            <div class="separator">

            </div>
            <div>
                <div class="header">
                    Personnalisez votre audience
                </div>
                <div class="body_i">
                    <img :src="'../../img/audi.svg'" style="width: 60%;" class="img_b" />
                </div>
                <div style="text-align: center; padding: 0.6rem 1rem;">
                    Choisissez les criteres qui caractérisent le mieux vos potentiels clients.
                </div>
            </div>
            <div class="">
                <ion-list v-if="!niv" mode="ios">
                    <ion-list-header>
                        <ion-label>Critères généraux</ion-label>
                    </ion-list-header>
                    <ion-item>
                        <ion-input label="Nom de l'audience" required @ionInput="(e: any) => name = e.target.value"
                            :value="name" placeholder="ex: Audience N°1"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label class="ion-text-wrap">
                            <h2>Intervalle d'âges</h2>
                            <p>
                                <ion-range :pin="true" :pinFormatter="format_age" @ionChange="handle_ages"
                                    aria-label="Dual Knobs Range" :dual-knobs="true" :value="ages"></ion-range>
                            </p>
                            <p style="font-size : 0.8rem;">Les clients que vous visez sont dans quel
                                intervalle d'âges.</p>
                        </ion-label>
                    </ion-item>

                    <ion-item>
                        <ion-select @ion-change="e => genre = e.detail.value" :value="genre" label="Genre"
                            label-placement="floating" fill="outline">
                            <ion-select-option value="all" >Hommes et Femmes</ion-select-option>
                            <ion-select-option value="homme" >Hommes</ion-select-option>
                            <ion-select-option value="femme" >Femmes</ion-select-option>
                        </ion-select>
                    </ion-item>

                </ion-list>

                <ion-list v-else-if="niv == 1" :inset="true" mode="ios">
                    <ion-list-header>
                        <ion-label>Lieu a inclure </ion-label>
                    </ion-list-header>

                    <div style="padding-left: 1rem; padding-right: 1rem;">
                        <div> Quels lieux ciblez-vous pour cette campagne? </div>
                        <div style="padding-top: 0.9rem; padding-bottom: 0.3rem;">
                            <ion-item v-for="inter in lieux" :key="inter.id">
                                <ion-label> {{ inter.name }} </ion-label>
                                <ion-icon slot="start" :icon="location"></ion-icon>
                            </ion-item>
                        </div>
                        <div style="padding-bottom: 0.7rem;">
                            <ion-button @click="lOpen = true" mode="ios" color="primary" expand="full"
                                shape="round">Ajouter</ion-button>
                        </div>
                    </div>

                </ion-list>

                <ion-list v-else-if="niv == 2" :inset="true" mode="ios">
                    <ion-list-header>
                        <ion-label>Centre d'Interêts </ion-label>
                    </ion-list-header>

                    <div style="padding-left: 1rem; padding-right: 1rem;">
                        <div> Quels pourraient être les centres d'interêt de vos clients? </div>
                        <div style="padding-top: 0.9rem; padding-bottom: 0.3rem;">
                            <ion-item v-for="inter in my_interest" :key="inter.id">
                                <ion-label> {{ inter.name }} </ion-label>
                                <ion-icon slot="start" :icon="aperture"></ion-icon>
                            </ion-item>
                        </div>
                        <div style="padding-bottom: 0.7rem;">
                            <ion-button @click="iOpen = true" mode="ios" color="primary" expand="full"
                                shape="round">Choisir</ion-button>
                        </div>
                    </div>

                </ion-list>
                <ion-list v-else-if="niv == 3" :inset="true" mode="ios">
                    <ion-list-header>
                        <ion-label>Professions </ion-label>
                    </ion-list-header>

                    <div style="padding-left: 1rem; padding-right: 1rem;">
                        <div> Quels pourraient être les professions de vos clients? </div>
                        <div style="padding-top: 0.9rem; padding-bottom: 0.3rem;">
                            <ion-item v-for="inter in my_profs" :key="inter.id">
                                <ion-label> {{ inter.name }} </ion-label>
                                <ion-icon slot="start" :icon="aperture"></ion-icon>
                            </ion-item>
                        </div>
                        <div style="padding-bottom: 0.7rem;">
                            <ion-button @click="pOpen = true" mode="ios" color="secondary" expand="full"
                                shape="round">Choisir</ion-button>
                        </div>
                    </div>

                </ion-list>
                <ion-list v-else-if="niv == 4" :inset="true" mode="ios">
                    <ion-list-header>
                        <ion-label>Vue globale</ion-label>
                    </ion-list-header>

                    <div style="padding-left: 1rem; padding-right: 1rem;">
                        <div> Decouvrez le nombre de personne que vous pouvez atteindre </div>
                        <div style="padding-top: 0.9rem; padding-bottom: 0.3rem;">
                            <ion-item >
                                <ion-label >
                                    {{ result.name }}
                                </ion-label>
                                <ion-icon :icon="receipt" slot="start" />
                            </ion-item>
                            <ion-item >
                                <ion-label >
                                    {{ result.taille }} personnes à atteindre
                                </ion-label>
                                <ion-icon :icon="people" slot="start" />
                            </ion-item>
                        </div>
                    </div>

                </ion-list>
                <div
                    style="padding-top: 0.3rem; padding-left: 1rem; padding-right: 1rem; display: flex; justify-content: space-between; align-items: center">
                    <ion-button @click="niv--" v-if="niv" mode="ios" color="dark">Retour <ion-icon slot="start"
                            :icon="arrowBack"></ion-icon>
                    </ion-button>
                    <ion-button mode="ios" v-if="niv < 4" @click="niv++" color="primary">Suivant <ion-icon slot="end"
                            :icon="arrowForward"></ion-icon>
                    </ion-button>
                    <ion-button mode="ios" :disabled="!result.id" v-else @click="set_campaign()" color="success">Terminer <ion-icon slot="end"
                            :icon="arrowForward"></ion-icon>
                    </ion-button>
                </div>
            </div>
            <interest-comp :isOpen="iOpen" @close="iOpen = false"
                @done="(lis: any) => { my_interest = lis, iOpen = false }" />
            <prof-comp :isOpen="pOpen" @close="pOpen = false" @done="(lis: any) => { my_profs = lis, pOpen = false }" />
            <location-picker :isOpen="lOpen" :add_audi="true" @close="lOpen = false" @done="al"></location-picker>
        </ion-content>
    </ion-modal>
</template>

<style>
.img_b {
    width: 90%;
    padding: 1rem;
}

.body_i {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-bottom: 0.4rem;
}

.header {
    text-align: center;
    font-size: 1.2rem;
    font-weight: 600;
    padding-top: 1.5rem;
    padding-bottom: 1rem;
}
</style>

<script lang="ts" setup>

import { aperture, arrowBack, arrowForward, location, people, receipt } from "ionicons/icons";
import { IonModal, IonContent, IonIcon, IonToolbar, IonTitle, IonButtons, IonButton, IonSelect, IonSelectOption, IonList, IonListHeader, IonItem, IonLabel, IonRange, IonInput } from "@ionic/vue";
import { ref, watch } from "vue"
import InterestComp from "@/components/InterestComp.vue"
import ProfComp from "@/components/ProfComp.vue"
import LocationPicker from "@/components/LocationPicker.vue"
import { access_tok, showLoading, show_alert } from "@/global/utils";
import axios from "axios";
import { useRouter } from "vue-router";

defineProps({
    isOpen: Boolean
})


const niv = ref(0)
watch(niv, (newn, oldn) => {
    if(newn == 4) create_campaign()
})

const emit = defineEmits(['close', 'done'])
const iOpen = ref(false)
const pOpen = ref(false)
const lOpen = ref(false)


const close = () => {
    emit("close")
}

const ages = ref({ lower: 25, upper: 40 })
const genre = ref('Hommes et Femmes')
const name = ref("")
const result = ref({
    id : 0,
    name : "",
    taille : 0
})

const handle_ages = (e: any) => {
    ages.value = e.detail.value
}

const my_interest = ref<any[]>([])
const my_profs = ref<any[]>([])
const lieux = ref<any[]>([])

const format_age = (value: number) => {
    return `${10 + Math.round(value / 100 * 60)} ans`
}

const al = (str : string) => {
  lieux.value.push(JSON.parse(str))
  lOpen.value = false;
};
const router = useRouter()

const create_campaign = async () => {
    if(my_interest.value.length == 0) my_interest.value.push({
        id : 0,
        name : "Tous les centres d'interêt"
    })
    if(my_profs.value.length == 0) my_profs.value.push({
        id : 0,
        name : "Toutes les professions"
    })
    const load = await showLoading("Creation. Ca prendra un moment...")
    const resp = await axios.post("api/create_campaign/", {
        ages : JSON.stringify(ages.value),
        genre : genre.value,
        name : name.value,
        lieux : JSON.stringify(lieux.value),
        interests : my_interest.value.filter(e => e.id == 0).length ? "all" : JSON.stringify(my_interest.value),
        professions : my_profs.value.filter(e => e.id ==0).length ? "all" : JSON.stringify(my_profs.value)
    }, {
        headers : {
            Authorization : `Bearer ${await access_tok(router, load)}`
        }
    })
    if(resp.data['done']) result.value = resp.data['result'], load.dismiss()
    
    setTimeout(() => {
        load.dismiss()
    }, 9000)

}

const set_campaign = async () => {
    const load = await showLoading('Sauvegarde...');
    const resp = await axios.post("api/set_campaign/", {
        id : result.value.id
    }, {
        headers : {
            Authorization : `Bearer ${await access_tok(router, load)}`
        }
    })
    if(resp.data['done']) {
        load.dismiss()
        emit('done', resp.data['result'])
    }
}

</script>