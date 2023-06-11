import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage {
  firstName: string;
  user: any;
  isServiceProvider: boolean;
  service: string;

  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private router: Router
  ) {
    this.firstName = '';
    this.user = null;
    this.isServiceProvider = false;
    this.service = '';
  }

  getUser() {
    this.http.get(`http://localhost:3000/users/get/${this.firstName}`).subscribe(
      (response: any) => {
        this.user = response;
      },
      (error) => {
        console.error(error);
        this.presentAlert('User Not Found', error.error.error);
      }
    );
  }

  updateUser() {
    this.http.put(`http://localhost:3000/users/put/${this.user.firstName}`, this.user).subscribe(
      (response: any) => {
        console.log(response);
        this.presentAlert('Update Successful', 'User updated successfully');
        this.router.navigateByUrl('tab',{replaceUrl: true})
      },
      (error) => {
        console.error(error);
        this.presentAlert('Update Failed', 'Failed to update user');
      }
    );
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
}
