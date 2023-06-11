import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.page.html',
  styleUrls: ['./delete.page.scss'],
})
export class DeletePage {
  firstName: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertController: AlertController
  ) {
    this.firstName = '';
  }

  deleteUser() {
    const user = { firstName: this.firstName };

    this.http
    .delete(`http://localhost:3000/users/delete/${this.firstName}`, { body: user })
      .subscribe(() => {
          localStorage.setItem('User', '')
          this.presentAlert('Delete Successful', 'User Deleted successfully');
          this.router.navigateByUrl('tab',{replaceUrl: true})
        },
        (error) => {
          console.error(error);
          this.presentAlert('Delete Failed', error.error.error);
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
