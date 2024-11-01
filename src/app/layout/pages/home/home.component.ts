import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../shared/services/products.service';
import { Product } from '../../../shared/interfaces/product';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  allProducts:any[]=[]

  constructor(private _ProductsService: ProductsService) {
    console.log("const:Runnn")
  }

  ngOnInit(): void {
    console.log("OnInit :Run")


    this._ProductsService.getAllProductsAPI().subscribe({
      next : (res)=>{
        this._ProductsService=res.data
        console.log(res);
        
      },
      error:(err)=> {
        console.log(err);
        
      },
    })

  }



}
