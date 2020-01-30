import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
// PROVIDERS
import { EventProvider } from '../../providers/event';
// NATIVE
import { Camera, CameraOptions } from '@ionic-native/camera';


@IonicPage()
@Component({
    selector: 'page-modal-create-event',
    templateUrl: 'modal-create-event.html',
})
export class ModalCreateEventPage {

    event: {building: number, name: string, date: string, dateFinish: string, images: any} = {
        building: 0,
        name: '',
        date: '',
        dateFinish: '',
        images: []
    };
    today = new Date().toISOString();

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public viewCtrl: ViewController,
                public eventProvider: EventProvider,
                public camera: Camera) {
                    this.event.building = this.navParams.data.idBuilding;
    }

    createEvent() {
        //const d = new Date(this.event.date);
        const dfinish = new Date(this.event.dateFinish);
        // this.event.date =   d.getFullYear() + "-" + 
        //                     ("00" + (d.getMonth() + 1)).slice(-2) + "-" + 
        //                     ("00" + d.getDate()).slice(-2) + " " + 
        //                     ("00" + d.getHours()).slice(-2) + ":" + 
        //                     ("00" + d.getMinutes()).slice(-2) + ":" + 
        //                     ("00" + d.getSeconds()).slice(-2);
        // this.event.dateFinish = dfinish.getFullYear() + "-" + 
        //                         ("00" + (d.getMonth() + 1)).slice(-2) + "-" + 
        //                         ("00" + d.getDate()).slice(-2) + " " + 
        //                         ("00" + d.getHours()).slice(-2) + ":" + 
        //                         ("00" + d.getMinutes()).slice(-2) + ":" + 
        //                         ("00" + d.getSeconds()).slice(-2);
        // TANTO date como finishDate tienen la misma fecha límite por el pageable sin adaptar
        this.event.date =   dfinish.getFullYear() + "-" + 
                            ("00" + (dfinish.getMonth() + 1)).slice(-2) + "-" + 
                            ("00" + dfinish.getDate()).slice(-2) + " " + 
                            ("00" + dfinish.getHours()).slice(-2) + ":" + 
                            ("00" + dfinish.getMinutes()).slice(-2) + ":" + 
                            ("00" + dfinish.getSeconds()).slice(-2);
        this.event.dateFinish = dfinish.getFullYear() + "-" + 
                                ("00" + (dfinish.getMonth() + 1)).slice(-2) + "-" + 
                                ("00" + dfinish.getDate()).slice(-2) + " " + 
                                ("00" + dfinish.getHours()).slice(-2) + ":" + 
                                ("00" + dfinish.getMinutes()).slice(-2) + ":" + 
                                ("00" + dfinish.getSeconds()).slice(-2);
        
        this.eventProvider.createEvent(this.event).subscribe((message: string) => {
            this.viewCtrl.dismiss(message);
        });
    }

    cancelCreateEvent() {
        this.viewCtrl.dismiss();
    }

    takePhoto() {
        let options: CameraOptions = {
            targetWidth: 640, // max width 640px
            targetHeight: 640, // max height 640px
            allowEdit: true,
            destinationType: this.camera.DestinationType.DATA_URL, // Base64
        }
        this.getPicture(options);
    }

    pickFromGallery() {
        let options: CameraOptions = {
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
          targetWidth: 640,
          targetHeight: 640,
          allowEdit: true,
          destinationType: this.camera.DestinationType.DATA_URL
        }
        this.getPicture(options);
    }

    private getPicture(options: CameraOptions) {
        this.camera.getPicture(options).then((imageData) => {
            // If it's base64:
            this.event.images.push('data:image/jpeg;base64,' + imageData);
            console.log(this.event);
        }).catch((err) => {
            // Handle error
        });
    }

}
