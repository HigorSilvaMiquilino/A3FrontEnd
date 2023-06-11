import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  firstName:string
  lastName:string
  email:string
  password: string
  isServiceProvider: boolean =false
  service: string = 'none'
  pic: string
  bio: string
  constructor(private http: HttpClient,
    private alertController: AlertController, private router: Router) {
    this.firstName = ''
    this.lastName = ''
    this.email = ''
    this.password =''
    this.pic = ''
    this.bio = ''
  }

  ngOnInit() {
  }

  onServiceSelect(e: any){
      let response = (e.detail.value)
      if(response == 'no'){
        this.isServiceProvider = false
      }else{
        this.isServiceProvider = true
      }
  }

  register(){
    let user = {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password,
      service: this.service,
      bio: this.bio,
      pic: this.pic,
      isServiceProvider: this.isServiceProvider

    }
    this.http.post('http://localhost:3000/users/register',user)
    .subscribe(res=>{
      localStorage.setItem('User',JSON.stringify(res))
      this.router.navigateByUrl('tab',{replaceUrl: true})
    },error=>{
      console.error(error)
      this.presentAlert('Registration Failed',error.error.error);

    })
  }

  async presentAlert(header: string, message: string){
    const alert  = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      message: message,
      buttons: ['OK']
    });


    await alert.present();

    const { role } = await alert.onDidDismiss();

  }
}
