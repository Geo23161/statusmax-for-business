<template>
    <ion-page v-if="statObj">
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-back-button default-href="#"></ion-back-button>
            </ion-buttons>
            <ion-title>Mes Statistiques</ion-title>
        </ion-toolbar>
        <ion-content :fullscreen="true">
            <div class="separator">

            </div>
            <div class="body_all">
                <div class="ban">
                    <div class="myico yellow_bg">
                        <ion-icon :icon="cash" />
                    </div>
                    <div class="ban_cont">
                        <div class="title_b">Dépense</div>
                        <div class="contentb">{{ statObj['depense'] }} FCFA</div>
                    </div>
                </div>
                <div class="ban">
                    <div class="myico green_bg">
                        <ion-icon :icon="eye" />
                    </div>
                    <div class="ban_cont">
                        <div class="title_b">Vues globales</div>
                        <div class="contentb">{{ statObj['views'] }} vues</div>
                    </div>
                </div>
                <div class="ban">
                    <div class="myico orange_bg">
                        <ion-icon :icon="checkmarkDoneCircle" />
                    </div>
                    <div class="ban_cont">
                        <div class="title_b">Clics</div>
                        <div class="contentb">{{ statObj['clicks'] }} clics</div>
                    </div>
                </div>
                <div class="ban">
                    <div class="myico blue_bg">
                        <ion-icon :icon="magnetSharp" />
                    </div>
                    <div class="ban_cont">
                        <div class="title_b">Campagnes démarrées</div>
                        <div class="contentb">{{ statObj['post_start'] }} </div>
                    </div>
                </div>
                <div class="ban">
                    <div class="myico orange_bg">
                        <ion-icon :icon="people" />
                    </div>
                    <div class="ban_cont">
                        <div class="title_b">Campagnes postées </div>
                        <div class="contentb">{{ statObj['posts'] }} fois</div>
                    </div>
                </div>
                <div class="ban">
                    <div class="myico orange_bg">
                        <ion-icon :icon="barChart" />
                    </div>
                    <div class="ban_cont">
                        <div class="title_b">Campagnes terminées</div>
                        <div class="contentb">{{ statObj['post_ended'] }} </div>
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
.my_svg {
    display: flex;
    justify-content: space-around;
    padding-top: 1rem;
}

.global_spinner {
    padding-top: 40vh;
    display: flex;
    justify-content: space-around;
}

.title_b {
    font-size: 0.9rem;
    font-weight: 500;
    color: #575757;
    padding-bottom: 0.2rem;
}



.blue_bg{
    background-color: rgba(0, 0, 255, 0.246);
    color: blue;
}
.yellow_bg {
    background: rgba(234, 0, 255, 0.261);
    color: rgb(234, 0, 255);
}

.orange_bg {
    background: rgba(255, 166, 0, 0.219);
    color: orange;
}

.green_bg {
    background: rgba(0, 128, 0, 0.213);
    color: green;
}

.myico {
    margin-right: 0.9rem;
    border-radius: 100%;
    padding-bottom: 0.5rem;
    padding-left: 0.7rem;
    padding-right: 0.7rem;
    padding-top: 0.7rem;
}

.ban {
    margin-left: 1rem;
    margin-right: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 1rem;
    display: flex;
    align-items: center;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    border-radius: 15px;
    background: white;
}

.card_label {
    font-size: 1.5rem;
    font-weight: bolder;
}

.stat_text {
    font-size: 1rem;
    font-weight: 600;
    padding: 0.3rem 0.6rem;
}

.show_p {
    width: 15px;
    height: 15px;
    min-width: 15px;
    min-height: 15px;
    border-radius: 100%;
    margin-right: 0.1rem;
}

.stat_ {
    display: flex;
    align-items: center;
}

.card_name {
    font-size: 1.1rem;
}

.card {
    width: 100%;
    padding: 0.6rem 0.9rem;
    background: white;
    border-radius: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;

}

.card_cont {
    padding-top: 1rem;
}

.t_title {
    font-size: 1.2rem;
    text-align: center;
    font-weight: bold;
}

.body_c {
    padding: 1rem 0.9rem;
}

.body_all {
    width: 100vw;
    min-height: 100%;
    background: white;
    padding-left: 0rem;
    padding-right: 0rem;
    padding-top: 0.5rem;
    padding-bottom: 2rem;
    background: rgb(254, 252, 255);
    font-family: 'PT Serif', serif;
}
</style>
  
<script setup lang="ts">
import { access_tok, showLoading } from '@/global/utils';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, } from '@ionic/vue';
import axios from 'axios';
import { barChart, cash, checkmarkDone, checkmarkDoneCircle, eye, magnetSharp, people } from 'ionicons/icons';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const statObj = ref()
const router = useRouter()

const get_stats = async() => {
    const load = await showLoading("Chargement...")
    const resp = await axios.get('api/get_stats/', {
        headers : {
            Authorization : `Bearer ${await access_tok(router, load)}`
        }
    })
    if(resp.data['done']) statObj.value = resp.data['result']
    load.dismiss()
}

get_stats()
</script>
  