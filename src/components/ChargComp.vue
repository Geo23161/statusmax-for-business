<template>
    <ion-modal :is-open="isOpen">
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button fill="clear" @click="close()">
                    <ion-icon :icon="arrowBack" />
                </ion-button>
            </ion-buttons>
            <ion-title>
                Paiement
            </ion-title>
        </ion-toolbar>
        <ion-content>
            <div class="separator">

            </div>
            <div>
                <div class="header">
                    Rechargez votre compte
                </div>
                <div class="body_i">
                    <img :src="'../../img/nopay.svg'" style="width: 100%;" class="img_b" />
                </div>
            </div>
            <form @submit.prevent="open_kkia()" class="inputs" >
                <div>
                    <div >
                        
                        <div >
                            <ion-item fill="outline" mode="md" color="primary">
                                <ion-input required type="number" placeholder="Montant a payer"
                                    @ionInput="(e : any) => (montant = parseInt(e.target.value))"></ion-input>
                            </ion-item>
                        </div>
                    </div>
                    <div style="padding-top: 0.4rem">
                        <ion-button  type="submit" color="primary" mode="ios" expand="full">Rechargez</ion-button>
                    </div>
                </div>
            </form>
        </ion-content>
    </ion-modal>
</template>
  
<style scoped>
.inputs {
	padding: 1.8rem 1rem;
}
</style>
  
<script lang="ts">
import { defineComponent, defineEmits, ref, Ref, toRef, watch } from "vue";
import { arrowBack } from "ionicons/icons";
import { IonModal, IonContent, IonIcon, IonToolbar, IonTitle, IonButtons, IonButton } from "@ionic/vue";
import Plyr from "plyr";
import { access_tok, show_alert, showLoading } from "@/global/utils";
import axios from "axios";
import { useRouter } from "vue-router";
import { openKkiapayWidget, addKkiapayListener } from "kkiapay"

export default defineComponent({
    props: {
        isOpen: Boolean,
    },
    components: {
        IonContent,
        IonModal,
        IonIcon, IonToolbar, IonTitle, IonButtons, IonButton
    },
    setup(props, ctx) {

        const emits = defineEmits(['close', 'done']);
        const close = () => {
            ctx.emit('close')
        }
        
        const api_key = ref("")

        const montant = ref(1000)
        const min_pay = ref(500)
        const router = useRouter()
        

        const make_payment = async (transactionId : string | number) => {
            const load = await showLoading('Patientez...')
            const resp = await axios.post('api/make_payment/', {
                transactionId,
                amount : montant.value
            }, {
                headers : {
                    Authorization : `Bearer ${await access_tok(router, load)}`
                }
            })
            if(resp.data['done']) {
                load.dismiss()
                ctx.emit('done')
            }
        }
        
        const open_kkia = () => {
            if(montant.value < min_pay.value) return show_alert('Montant invalide', "Le montant ne peut pas être inferieur a " + min_pay.value + " F.")
            addKkiapayListener('success', (response) => {
                make_payment(response.transactionId)
            })

            openKkiapayWidget({
                amount : montant.value,
                api_key : api_key.value,
                sandbox : true, 
            })
        }

        

        return {
            arrowBack,
            close,
            montant,
            open_kkia
        }
    },
});
</script>