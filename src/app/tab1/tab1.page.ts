import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  selectedService:string = '';
  serviceProviders: any;
  originalServiceProviders: any;
  constructor(private router: Router,private http:HttpClient) { }

  ngOnInit(): void {
    const user = localStorage.getItem('User')
    if(user == null){
      this.router.navigateByUrl('/login',{replaceUrl:true})
    }else{
      this.http.get('http://localhost:3000/users/').subscribe(res =>{
        this.serviceProviders = res
        this.originalServiceProviders = res
      },error =>{
        console.log(error)
      })
    }
  }


  onServiceSelect(e: any) {
    this.serviceProviders = this.originalServiceProviders;
    this.selectedService = e.detail.value;
    if (this.selectedService === '') {
      return; // Se 'All' for selecionado, não aplicar filtro e retornar todos os provedores de serviço
    }
    this.serviceProviders = this.serviceProviders.filter((serviceProv: any) => {
      return serviceProv.service.includes(this.selectedService);
    });
  }


}


