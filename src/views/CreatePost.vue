<template >
    <ion-page>
        <ion-toolbar color="primary">
            <ion-title>
                Creer
            </ion-title>
            <ion-buttons slot="start">
                <ion-back-button default-href="/">

                </ion-back-button>
            </ion-buttons>
        </ion-toolbar>
        <ion-content>
            <div class="separator">

            </div>
            <ion-list mode="ios">
                <ion-list-header>
                    <ion-label>Image ou Video</ion-label>
                </ion-list-header>

                <div style="padding-left: 0.6rem; padding-right: 0.6rem;">
                    <div> Ajoutez une image ou une video( d'au plus 30s) </div>

                    <div style="padding-top: 0.9rem; padding-bottom: 0.3rem;">
                        <ion-item @click="media.video != '' ? (vOpen = true, cUrl = media.video) : click_img('add:img')"
                            :detail="true" :detail-icon="eye" button>
                            <ion-thumbnail>
                                <img alt="campagne image" :src="media.image"
                                    style="margin-right: 0.6rem;" />
                            </ion-thumbnail>
                            <ion-label class="ion-text-wrap">
                                <h3 style="padding-left: 0.8rem;" >{{ media.image == '../../img/img_no.jpg' && media.video == '' ? 'Aucun media ajouté' : (media.video != ''
                                    ? 'Une video ajouté' : 'Une image ajouté') }}</h3>

                            </ion-label>
                        </ion-item>
                    </div>
                    <div style="padding-bottom: 0.7rem;">
                        <ion-button fill="outline" @click="click_img('file_add')" v-if="!is_submitting" mode="ios" expand="full"
                            shape="round">
                            <ion-icon :icon="image" slot="start" /> Choisir un fichier
                        </ion-button>
                        <ion-button fill="outline" v-else expand="full" shape="round">
                            <ion-spinner name="dots"></ion-spinner>
                        </ion-button>
                    </div>
                </div>

            </ion-list>
            <ion-list mode="ios">
                <ion-list-header>
                    <ion-label>Details</ion-label>
                </ion-list-header>
                <ion-item>
                    <ion-input label="Nom de la pub" required @ionInput="(e: any) => name = e.target.value" :value="name"
                        placeholder="entrez..."></ion-input>

                </ion-item>
                <ion-item >
                    <ion-textarea :counter="true" :maxlength="100" label="Slogan" placeholder="votre phrase captivante" @ion-input="e => rtext = (e.target.value as string)" ></ion-textarea>
                </ion-item>

                <!---
                <div style="padding-left: 0.6rem; padding-right: 0.6rem;">
                    <div @click="text == `Entrez une phrase d'accroche...` ? text = '' : 0" class="editable-div"
                        contenteditable @input="(e: any) => rtext = e.target.value">
                        {{ text }}
                    </div>
                </div>
                -->
                <ion-item>
                    <ion-input label="Lien" required @ionInput="(e: any) => lien = e.target.value" 
                        placeholder="site, application,whatsapp,formulaire..."></ion-input>
                </ion-item>
            </ion-list>
            <ion-list mode="ios">
                <ion-list-header>
                    <ion-label>Audiences ciblé</ion-label>
                </ion-list-header>

                <div style="padding-left: 1rem; padding-right: 1rem;">
                    <div> Veuillez selectionnez ou choisir l'audience que vous ciblez </div>
                    <div v-if="campaigns.length" style="padding-top: 0.9rem; padding-bottom: 0.3rem;">
                        <ion-item @click.prevent="actual_c = inter" v-for="inter in campaigns" :key="inter.id">

                            <ion-checkbox :checked="actual_c.id == inter.id" justify="space-between">{{ inter.name
                            }}</ion-checkbox>
                        </ion-item>
                    </div>
                    <div class="no_photos" v-else>
                        <div style="display: flex; justify-content: space-around; padding: 0.8rem;">
                            <img :src="'../../img/no_data.svg'" style="width: 50%;" />
                        </div>
                        <div style="padding: 0.6rem; font-size: 0.8rem; text-align: center;">Aucune audience trouvée</div>
                    </div>
                    <div style="padding-bottom: 0.7rem;">
                        <ion-button fill="outline" @click="aOpen = true" mode="ios" color="primary" expand="full" shape="round">Creer une
                            audience</ion-button>
                    </div>
                </div>
            </ion-list>
            <ion-list mode="ios">
                <ion-list-header>
                    <ion-label>Budget à allouer</ion-label>
                </ion-list-header>

                <div style="padding-left: 1rem; padding-right: 1rem;">
                    <div> Combien souhaitez-vous allouer a ce post? </div>
                    <div style="padding-top: 0.9rem; padding-bottom: 0.3rem;">
                        <ion-item>

                            <ion-input label="Budget(en FCFA)" required
                                @ionInput="(e: any) => montant = (e.target.value ? parseInt(e.target.value) : 0)" :value="montant"
                                placeholder="entrez un montant"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label>
                                <div >
                                    <div>Approximation</div>
                                    <h2 :style="{
                                        color: Math.floor(montant / price * 10) < 100 ? 'red' : 'green'
                                    }">{{ Math.floor(montant / price * 10) }} vues</h2>
                                </div>
                            </ion-label>
                            <ion-icon slot="start" :icon="eye"></ion-icon>
                        </ion-item>
                    </div>
                </div>

            </ion-list>
            <div style="padding-top: 0.6rem; padding-bottom: 0.6rem; padding-left: 1rem; padding-right: 1rem;">
                <ion-button expand="full" mode="ios"  @click="send_campaign()" color="success" shape="round" >Lancer la campagne <ion-icon slot="end"
                            :icon="rocket"></ion-icon>
                    </ion-button>
            </div>
        </ion-content>
        <audience-comp :is-open="aOpen" @close="aOpen = false"
            @done="(c) => (actual_c = c, campaigns.push(c), aOpen = false)" />
        <vid-player :is-open="vOpen" :url-p="cUrl" @close="vOpen = false" />
        <pay-comp :is-open="yOpen" @close="yOpen = false" @done="send_campaign()" />
        <div v-show="false">
            <photo-provider v-if="media.image">
                <photo-consumer :intro="'Images'" :src="media.image">
                    <img :src="media.image" :id="'add:img'" style="width: 40vw:" class="view-box" />
                </photo-consumer>
            </photo-provider>
            <input type="file" accept="video/*, image/*" id="file_add" @change="handle_file" />
        </div>
    </ion-page>
</template>

<style scoped >
.editable-div {
    width: 100%;
    min-height: 50px;
    padding: 10px;
    border-radius: 10px;
    border: 2px solid #ccc;
    outline: none;
    margin-top: 0.6rem;
    margin-bottom: 0.9rem;
    background-color: #f2f2f2;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>

<script lang="ts" setup >
import VidPlayer from '@/components/VidPlayer.vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonItem, IonThumbnail, IonLabel, IonList, IonListHeader, IonButton, IonIcon, IonSpinner, IonCheckbox, onIonViewWillEnter, IonTextarea, IonInput } from '@ionic/vue';
import { eye, image, link, rocket } from 'ionicons/icons';
import { ref, watch } from 'vue';
import { extract_frames, access_tok, showLoading, show_alert, presentToast } from "@/global/utils"
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import AudienceComp from '@/components/AudienceComp.vue';
import PayComp from '@/components/PayComp.vue';


const media = ref({
    image: "../../img/img_no.jpg",
    video: "",
    typ: 'img',
    id: 0
})
const vOpen = ref(false)
const cUrl = ref("")

const ready_image = ref<Blob>()
const ready_vid = ref<Blob>()
const is_submitting = ref(false)
const router = useRouter()
const aOpen = ref(false)

watch(ready_vid, (newv, oldv) => {
    if (newv) {
        const callback = (b: Blob | null) => {
            if (b) ready_image.value = b
        }
        extract_frames(newv, callback, 0);
    }
}, { deep: true })

watch(ready_image, async (newi, oldi) => {
    if (newi) {
        const form = new FormData()
        form.append('image', newi)
        if (ready_vid.value) form.append('video', ready_vid.value)
        form.append('id', media.value.id.toString())
        const resp = await axios.post('api/submit_media/', form, {
            headers: {
                Authorization: `Bearer ${await access_tok(router, undefined)}`,
                "Content-Type": "multipart/form-data"
            }
        })
        if (resp.data['done']) {
            media.value = resp.data['result']
            is_submitting.value = false
        }
    }
}, { deep: true })

const click_img = (id: string) => {
    document.getElementById(id)?.click()
}

const name = ref("")
const text = ref("Entrez une phrase d'accroche...")
const rtext = ref("")
const lien = ref("")
const price = ref(0)

const handle_file = (e: any) => {
    const file = e.target.files[0] as File;
    if(!file) return 0;
    is_submitting.value = true
    if (file.type.match('video.*')) ready_vid.value = file;
    else ready_image.value = file;
}

const campaigns = ref([] as any[])
const actual_c = ref({
    id: 0
})
const montant = ref(2000)

const get_campaigns = async () => {
    const load = await showLoading("Patientez...")
    const resp = await axios.get('api/get_campaigns/', {
        headers: {
            Authorization: `Bearer ${await access_tok(router, load)}`
        }
    })
    if (resp.data['done']) campaigns.value = resp.data['result']
    price.value = resp.data['price']
    load.dismiss()
}

const yOpen = ref(false)

const send_campaign = async () => {
    if(media.value.id == 0) return show_alert('Media vide', "Veuillez ajouter une image ou une video avant de continuer.")
    if(name.value == "") return show_alert('Nom vide', "Veuillez choisir un nom pour cette campagne")
    if(rtext.value == "") return show_alert("Slogan invalide", "Veuillez entrer une phrase d'accroche pouvant captover un potentiel client a cliquer.")
    if(rtext.value.length > 105) return show_alert("Slogan trop longue", "Votre phrase d'accroche doit cobtenir au plus 100 caractères.") 
    if(lien.value == "") return show_alert('Lien incorrect', "Veuillez fournir un lien afin de permettre aux clients interessés d'acceder a votre offre ou vous contacter.")
    if(actual_c.value.id == 0) return show_alert("Audience non valide", "Veuillez choisir ou creer une audience pour votre campagne")
    if((montant.value / price.value * 10) < 100) return show_alert("Budget invalide", "Votre budget est insuffisant pour lancer une campagne, veuillez l'augmenter.")

    const load = await showLoading('Lancement...')
    const resp = await axios.post("api/create_post/", {
        media : media.value.id,
        name : name.value,
        text : rtext.value,
        link : lien.value,
        campaign : actual_c.value.id,
        budget : montant.value,
    }, {
        headers : {
            Authorization : `Bearer ${await access_tok(router, load)}`
        }
    })
    if(!resp.data['done'] && resp.data['code'] == 350) yOpen.value = true;
    if(resp.data['done']) load.dismiss(), presentToast("top", "Votre campagne a été lancé avec succès", "success") ,router.push('/tabs/tab1?has_created');
    
}

const duplicate_data = async (id :string) => {
    const load = await showLoading('Clonage...')
    const resp = await axios.post('api/duplicate_data/', {
        id
    }, {
        headers : {
            Authorization : `Bearer ${await access_tok(router, load)}`
        }
    })
    if(resp.data['done']){
        const r = resp.data['result']
        media.value = r['media']
        name.value = r['name']
        text.value = r['text']
        rtext.value = r['text']
        lien.value = r['link']
    }
    load.dismiss()
}

const route = useRoute()

get_campaigns()

onIonViewWillEnter(() => {
    if('duplic' in route.query) duplicate_data(route.query.duplic as string)
})

</script>