import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule ,Validators} from '@angular/forms';
import { error } from 'console';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  isLoading:boolean=false

  errMessage : string =""

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    phone: new FormControl(null ,[Validators.required,Validators.pattern(/^(010|011|012)[0-9]{8}$/)]),
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][0-9]{6}/)]),
    rePassword: new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][0-9]{6}/)]),
  },this.confirmPassword)


  constructor(private _AuthService:AuthService,private _Router:Router){}


  
  confirmPassword(g:any){
    if(g.get('password').value === g.get('rePassword').value){
      return null
    }
    else  {
      return {'Password mismatched':true}
    }
  }

 

  registerSubmit(){
    
    this.isLoading=true

    this._AuthService.sendRegister(this.registerForm.value).subscribe({
      next : (res)=>{
        console.log(res)
        this.isLoading=false
        this._Router.navigate(['login'])

      },  
      error : (err)=>{
       this.errMessage= err.error.message
       this.isLoading=false

      }
    })
    console.log(this.registerForm.value);

    
  }
}
