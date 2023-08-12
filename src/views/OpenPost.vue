<template >
    <ion-page v-if="post">
        <ion-toolbar>
            <ion-title>
                Campagne
            </ion-title>
            <ion-buttons slot="start">
                <ion-back-button default-href="/">

                </ion-back-button>
            </ion-buttons>
        </ion-toolbar>
        <ion-content>
            <div class="separator">

            </div>
            <ion-item
                @click="post.get_media_typ == 'video' ? (vOpen = true, cUrl = post.get_vid_url) : click_img(post.id + ':img')"
                :detail="true" :detail-icon="eye" button>
                <ion-thumbnail>
                    <img alt="campagne image" :src="post.get_image" style="border-radius: 15px; " />
                </ion-thumbnail>
                <ion-label class="ion-text-wrap">
                    <div style="padding-left: 0.6rem;">
                        <h3>{{ post.name }}</h3>
                        <p v-html="post.text">

                        </p>
                    </div>
                </ion-label>
            </ion-item>
            <ion-list>
                <ion-list-header>
                    <ion-label>
                        Résultat
                    </ion-label>

                </ion-list-header>
                <ion-item>
                    <ion-label>
                        <div style="display: flex; justify-content: space-between;">
                            <div style="margin-right: 0.6rem;">
                                Nombre de vues obtenues
                            </div>
                            <div style="font-size: 1.1rem; font-weight: bolder;">
                                {{ post.get_seen }}
                            </div>
                        </div>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <div style="display: flex; justify-content: space-between;">
                            <div style="margin-right: 0.6rem;">
                                Vues apres 24h
                            </div>
                            <div style="font-size: 1.1rem; font-weight: bolder;">
                                {{ post.get_predicted }}
                            </div>
                        </div>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <div style="display: flex; justify-content: space-between;">
                            <div style="margin-right: 0.6rem;">
                                Clics sur le lien
                            </div>
                            <div style="font-size: 1.1rem; font-weight: bolder;">
                                {{ post.clicks }}
                            </div>
                        </div>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <div style="display: flex; justify-content: space-between;">
                            <div style="margin-right: 0.6rem;">
                                Prospects
                            </div>
                            <div style="font-size: 1.1rem; font-weight: bolder;">
                                {{ post.get_prospects.length }}
                            </div>
                        </div>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <div style="display: flex; justify-content: space-between;">
                            <div style="margin-right: 0.6rem;">
                                Depense apres 24h
                            </div>
                            <div style="font-size: 1.1rem; font-weight: bolder;">
                                {{ post.already_used }} F
                            </div>
                        </div>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <div style="display: flex; justify-content: space-between;">
                            <div style="margin-right: 0.6rem;">
                                Nombre de statut
                            </div>
                            <div style="font-size: 1.1rem; font-weight: bolder;">
                                {{ post.status_number }}
                            </div>
                        </div>
                    </ion-label>
                </ion-item>
            </ion-list>
            <ion-list v-show="!modifying" mode="ios">
                <ion-list-header>
                    <ion-label>Budget alloué</ion-label>
                </ion-list-header>

                <div style="padding-left: 1rem; padding-right: 1rem;">
                    <div> Vous pouvez modifier le budget que vous allouez pour la publication de ce post </div>

                    <div style="padding-top: 0.9rem; padding-bottom: 0.3rem;">
                        <ion-item>
                            <ion-label>
                                {{ post.total_invest }} F
                            </ion-label>
                            <ion-icon slot="start" :icon="cash"></ion-icon>
                        </ion-item>
                    </div>
                    <div style="padding-bottom: 0.7rem;">
                        <ion-button @click="modifying = true" mode="ios" expand="full" shape="round">Modifier
                            le
                            budget</ion-button>
                    </div>
                </div>

            </ion-list>
            <ion-list v-show="modifying">
                <ion-list-header>
                    <ion-label>
                        <div
                            style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem;">
                            <button @click="modifying = false" style="margin-right: 0.3rem;" class="custom_but">
                                <ion-icon :icon="arrowBack" />
                            </button>
                        </div>
                    </ion-label>
                </ion-list-header>

                <div style="padding-left: 1.8rem; padding-right: 1.8rem;">
                    <div> Entrez le nouveau budget à allouer à ce post </div>

                    <div style="padding-top: 0.9rem; padding-bottom: 0.3rem;">
                        <ion-item fill="outline" mode="md" color="primary">
                            <ion-input id="new_bud" type="number" placeholder="Nouveau budget"
                                @ionInput="(e: any) => (new_invest = parseInt(e.target.value))"></ion-input>
                        </ion-item>
                    </div>
                    <div style="padding-bottom: 0.7rem;">
                        <ion-button @click="change_budget()" mode="ios" expand="full" shape="round">Mettre à
                            jour</ion-button>
                    </div>
                </div>
            </ion-list>
            <ion-list mode="ios">
                <ion-list-header>
                    <ion-label>Audience</ion-label>
                </ion-list-header>

                <div style="padding-left: 1rem; padding-right: 1rem;">
                    <div> Vous pouvez dupliquer ce post pour une autre audience </div>

                    <div style="padding-top: 0.9rem; padding-bottom: 0.3rem;">
                        <ion-item>
                            <ion-label>
                                <h3>
                                    Audience choisi
                                </h3>
                                <h2>{{ post.campaign.name ? post.campaign.name : post.campaign.default_name }}</h2>
                            </ion-label>
                            <ion-icon slot="start" :icon="people"></ion-icon>
                        </ion-item>
                    </div>
                    <div style="padding-bottom: 0.7rem;">
                        <ion-button mode="ios" @click="$router.push('/create?duplic=' + id)" expand="full"
                            shape="round">Dupliquer maintenant</ion-button>
                    </div>
                </div>

            </ion-list>
            <ion-list mode="ios">
                <ion-list-header>
                    <ion-label>Prospects</ion-label>
                </ion-list-header>
                <div style="padding-left: 1rem; padding-right: 1rem;">
                    <div> Decouvrez le numero whatsapp des utilisateurs ayant été interessés par votre produit ou service
                    </div>
                    <div v-if="post.get_prospects.length" style="padding-top: 0.9rem; ">
                        <ion-item v-for="prospect in propects" :key="prospect">
                            <ion-avatar slot="start">
                                <img alt="Silhouette of a person's head"
                                    src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                            </ion-avatar>
                            <ion-label> {{ prospect }} </ion-label>
                        </ion-item>
                    </div>
                    <div class="no_photos" v-else>
                        <div style="display: flex; justify-content: space-around; padding: 0.8rem;">
                            <img :src="'../../img/no_data.svg'" style="width: 60%;" />
                        </div>
                    </div>
                </div>
                <div v-if="res_prospects && (post.get_prospects.length > 3)" @click="res_prospects = false"
                    style="padding-bottom: 0.7rem;">

                    <ion-button fill="outline" mode="ios" expand="full" shape="round">
                        <ion-icon :icon="eye" slot="start" /> Voir plus
                    </ion-button>
                </div>
            </ion-list>
            <ion-list mode="ios">
                <ion-list-header>
                    <ion-label>Preuve des status</ion-label>
                </ion-list-header>

                <div style="padding-left: 1rem; padding-right: 1rem;">
                    <div> Les captures d'ecrans suivants vous montre la preuve des données de vues affichées. </div>
                    <div style="padding-top: 0.9rem; ">
                        <div>
                            <div v-if="post.get_preuve.length" class="photos">
                                <div @click="click_img(p + ':img')" v-for="p in post.get_preuve" :style="{
                                    'background-size': 'cover',
                                    'background-position': 'top center',
                                    'background-image': `url('${p}')`,
                                }" class="photo">
                                </div>

                            </div>
                            <div class="no_photos" v-else>
                                <div style="display: flex; justify-content: space-around; padding: 0.8rem;">
                                    <img :src="'../../img/no_data.svg'" style="width: 60%;" />
                                </div>
                            </div>
                        </div>
                        <div style="padding-top: 0.6rem;">
                            <ion-item>
                                <ion-label>
                                    <div style="display: flex; justify-content: space-between">
                                        <div>Nombre total</div>
                                        <div class="money">{{ post.get_preuve.length }}</div>
                                    </div>
                                </ion-label>
                                <ion-icon slot="start" :icon="statsChart"></ion-icon>
                            </ion-item>
                        </div>
                    </div>
                </div>
            </ion-list>
            <div v-show="false">
                <photo-provider>
                    <photo-consumer :intro="post.name" :src="post.get_image">
                        <img :src="post.get_image" :id="post.id + ':img'" style="width: 40vw:" class="view-box" />
                    </photo-consumer>
                    <photo-consumer v-for="p in post.get_preuve" :key="p" :intro="'Preuve de vues'" :src="p">
                        <img :src="p" :id="p + ':img'" style="width: 40vw:" class="view-box" />
                    </photo-consumer>
                </photo-provider>
            </div>
        </ion-content>
        <vid-player :is-open="vOpen" :url-p="cUrl" @close="vOpen = false" />
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
.custom_but {
    width: 40px;
    height: 40px;
    min-height: 40px;
    min-width: 40px;
    background: #3880ff;
    font-size: 1.2rem;
    color: white;
    border-radius: 100%;
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

.separator {
    width: 100vw;
    height: 1px;
    background-color: rgb(225, 225, 225);
}

.photo:hover {
    width: 140px;
    height: 150px;
    min-width: 120px;
}

.photo {
    margin-right: 0.7rem;
    width: 120px;
    min-width: 120px;
    height: 120px;
    border-radius: 15px;
    transition: all 0.5s ease-in-out;
    position: relative;
}

.photos {
    width: 100%;
    display: flex;
    align-items: center;
    overflow-x: scroll;
}
</style>

<script lang="ts" setup >
import VidPlayer from '@/components/VidPlayer.vue';
import { access_tok, showLoading, show_alert } from '@/global/utils';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonItem, IonThumbnail, IonLabel, IonList, IonListHeader, IonButton, onIonViewDidEnter, onIonViewDidLeave, IonIcon, IonInput } from '@ionic/vue';
import axios from 'axios';
import { arrowBack, cash, eye, people, statsChart } from 'ionicons/icons';
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const vOpen = ref(false)
const cUrl = ref('')
const router = useRouter()
const post = ref()
const id = ref(0)
const route = useRoute()

watch(post, (newm, oldm) => {
    if (post) new_invest.value = post.value.already_used
}, { deep: true })

const new_invest = ref(0)
const modifying = ref(false)
watch(modifying, (newm, oldm) => {
    if (newm) {
        setTimeout(() => {
            const inp = document.getElementById('new_bud') as HTMLIonInputElement
            inp.setFocus()
        }, 400)
    }
})

const click_img = (id: string) => {
    document.getElementById(id)?.click()
}

const get_my_post = async () => {
    const resp = await axios.post('api/get_my_post/', {
        post: id.value
    }, {
        headers: {
            Authorization: `Bearer ${await access_tok(router, undefined)}`
        }
    })
    if (resp.data['done']) {
        post.value = resp.data['result']

        new_invest.value = post.value.already_used + 200
    }
}

const change_budget = async () => {
    if (new_invest.value < post.value.already_used + 200) return show_alert("Budget invalide", "Désolé! Vous ne pouvez allouer un budget inferieur a " + parseInt(post.value.already_used + 200) + " FCFA.")
    const load = await showLoading('Sauvegarde...');
    const resp = await axios.post('api/set_budget/', {
        post: post.value.id,
        new_b: new_invest.value
    }, {
        headers: {
            Authorization: `Bearer ${await access_tok(router, load)}`
        }
    })
    if (resp.data['done']) {
        post.value = resp.data['result']
        load.dismiss()
        show_alert('Budget mis a jour', "Votre budget a été mis a jour avec succes.")
        modifying.value = false
    }
}



let interval: any = 0;

const res_prospects = ref(true)

const propects = computed(() => {
    return res_prospects.value ? (post.value.get_prospects as string[]).slice(0, 3) : post.value.get_prospects
})

const initView = () => {
    id.value = parseInt(route.params.id as string);
    get_my_post()
    interval = setInterval(() => {
        get_my_post()
    }, 15000)
}

onIonViewDidEnter(() => {
    initView()
})


onIonViewDidLeave(() => {
    clearInterval(interval)
})

</script>