import { Storage } from "@ionic/storage"
import { alertController, isPlatform, loadingController, toastController } from "@ionic/vue";
import axios from "axios";
import { Router, useRouter } from "vue-router";
import { PushNotifications } from "@capacitor/push-notifications";

export const check_connect = async () => {
    const storage = new Storage({
        name: "x_info",
    });
    storage.create();
    const token: string | undefined = await storage.get('tokens')
    if (!token) return false
    else {
        const json_tok = JSON.parse(token)
        try {
            const resp = await axios({
                url: 'api/ping',
                method: 'HEAD',
                headers: {
                    Authorization: `Bearer ${json_tok.access}`
                },
            })
            return true
        } catch (err: any) {
            if (err.response.status == 401) {
                const form = new FormData()
                form.append('refresh', json_tok.refresh)
                try {
                    const refresh_res = await axios({
                        url: 'token/refresh/',
                        method: 'POST',
                        data: form
                    })
                    json_tok.access = refresh_res.data['access']
                    storage.set('tokens', JSON.stringify(json_tok))
                    return true
                } catch (err: any) {
                    if (err.response.status == 401) return false
                }
            }
        }
    }
}

export const showLoading = async (mess: string) => {
    const loading = await loadingController.create({
        message: mess,
    });
    loading.present();
    return loading
};

export const show_alert = async (title: string, mess: string) => {
    const alert = await alertController.create({
        header: title,
        message: mess,
        buttons: ["OK"],
    });

    await alert.present();
};

export const access_tok = async (router: Router, load: HTMLIonLoadingElement | undefined) => {
    const storage = new Storage({
        name: "x_info",
    });
    storage.create();
    const token: string | undefined = await storage.get('tokens')
    if (!token) {
        if (load) load.dismiss();
        return router.push(`/login`)
    }
    else {
        const json_tok = JSON.parse(token)
        try {
            const resp = await axios({
                url: 'api/ping',
                method: 'HEAD',
                headers: {
                    Authorization: `Bearer ${json_tok.access}`
                },
            })
            return json_tok.access as string
        } catch (err: any) {
            if (err.response.status == 401) {
                const form = new FormData()
                form.append('refresh', json_tok.refresh)
                try {
                    const refresh_res = await axios({
                        url: 'token/refresh/',
                        method: 'POST',
                        data: form
                    })
                    json_tok.access = refresh_res.data['access']
                    storage.set('tokens', JSON.stringify(json_tok))
                    return refresh_res.data['access'] as string
                } catch (err: any) {
                    if (err.response.status == 401) {
                        load?.dismiss()
                        return router.push(`/login`)
                    }
                }
            }
        }
    }
}

export const show_warn = async (title: string, mess: string, but1: string, handler1: () => Promise<void>) => {
    const alert = await alertController.create({
        header: title,
        message: mess,
        buttons: [
            {
                text: 'Fermer',
                role: 'cancel'
            },
            {
                text: but1,
                role: 'confirm',
                handler: () => {
                    handler1()
                },
            },
        ],
    });

    await alert.present();
};

export const get_my_company = async () => {
    const resp = await axios.get('api/get_my_company/', {
        headers: {
            Authorization: `Bearer ${await access_tok(useRouter(), undefined)}`,
        }
    })
    return resp.data['result']
}

export const my_company = async () => {
    const storage = new Storage({
        name: "x_info",
    });
    storage.create();
    const company: string | undefined = await storage.get('company');
    if (company) return company;
    return await get_my_company()
}

export const extract_frames = (vid: any, callback: (b: Blob | null) => void, index: number, is_url = false) => {
    const video = document.createElement("video");
    const file = vid;
    const fileURL = is_url ? vid : URL.createObjectURL(file);
    video.src = fileURL;

    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth * 3 / 4;
    video.addEventListener('loadeddata', function () {
        reloadRandomFrame();
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight
    }, false);

    video.addEventListener('seeked', function () {
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(callback);
    }, false);


    function reloadRandomFrame() {
        if (!isNaN(video.duration)) {
            const rand = Math.round(Math.random() * video.duration * 1000) + 1;
            video.currentTime = rand / 1000;
        }
    }
}

export const registerNotifications = async () => {
    let permStatus = await PushNotifications.checkPermissions();

    if (permStatus.receive === "prompt") {
        permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== "granted") {
        show_alert('Permission non accordée', "Veuillez accorder la permission à StatusMax Business de recevoir les notifications")
        return false
    }

    await PushNotifications.register();
    return true
};

export const addListerners = async () => {
    let platform = "android";
    const setPlatform = () => {
        if (isPlatform("ios")) platform = "ios";
        if (isPlatform("mobileweb")) platform = "web";
    };
    setPlatform();
    await PushNotifications.addListener("registration", async (token) => {
        const load = await showLoading('Permission accordée...')
        axios({
            url: "api/devices/",
            method: "GET",
            data: {
                registration_id: token,
                type: platform,
            },
            headers: {
                Authorization: `Bearer ${await access_tok(useRouter(), load)}`,
            },
        })
            .then((resp) => {
                console.log(JSON.stringify(resp.data));
                load.dismiss()
                
            })
            .catch((err) => {
                console.log(err);
                load.dismiss()
            });
    });
    await PushNotifications.addListener("registrationError", (err) => {
        console.error("Registration error: ", err.error);
    });

};

export const presentToast = async (position: 'top' | 'middle' | 'bottom', text: string, color = 'primary', duration = 3500) => {
    const toast = await toastController.create({
        mode: 'ios',
        message: text,
        position: position,
        duration: duration,
        color: color,
    });
    await toast.present();
}