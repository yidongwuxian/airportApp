import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Passenger} from './addpassenger.interface';
import { PasValidate } from './addpassenger.validate';
@IonicPage()
@Component({
  selector: 'page-addpassenger',
  templateUrl: 'addpassenger.html',
})
export class AddpassengerPage implements OnInit{
  telTx: string;
  isShow: boolean = false;
  isInland: boolean = true;
  certTx: string;
  typeBtn: boolean = false;
  sex: any;
  sexVal: number;
  chineseName: string;
  sureName: string;
  givenName: string;
  nationality: string;
  birthDate: string;
  passenger: string;
  certificate: number;
  docExpireDate: any;
  docId: any;
  mobile: number;
  Passenger:FormGroup;
  formErrors = {
     chineseName: ''
   };

   validationMessage = {
     'chineseName': {
       'required': '请填写用户名'
     }
   };
  constructor(public navCtrl: NavController, 
  	          public navParams: NavParams,
              private fb: FormBuilder) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddpassengerPage');
  }

  ngOnInit(){
  	const countryType = sessionStorage.getItem('countryType'); 
  	if(countryType === 'inland'){
  		
  	}else{
  		
  	}

  	if(this.typeBtn === true){
      console.log(this.typeBtn);
      this.telTx =  '大陆手机';
  		this.isShow = false;
  	}else{
      console.log(this.typeBtn);
      this.telTx =  '手机号码';
		  this.isShow = true; 
  	}

  	if(this.sex == '男'){
  		this.sexVal = 1;
  	}else{
  		this.sexVal = 2;
  	}

    this.buildForm();
  }


  buildForm(): void{
    this.Passenger = this.fb.group({   
      chineseName:   ['', [
        Validators.required
      ]],
      sureName:      ['', Validators.required],
      givenName:     ['', Validators.required],
      typeBtn:       [false, Validators.required],
      sex:           ['', Validators.required],
      nationality:   ['', Validators.required],
      birthDate:     ['', Validators.required],
      passenger:     ['', Validators.required],
      certificate:   ['', Validators.required],
      docExpireDate: ['', Validators.required],
      docId:         ['', Validators.required],
      mobile:        ['', Validators.required]
    })

     this.Passenger.valueChanges
       .subscribe(data => this.onValueChanged(data));

     this.onValueChanged();

  }


  onValueChanged(data?: any) {
     if (!this.Passenger) return;
     const form = this.Passenger;
     for (const field in this.formErrors) {
       this.formErrors[field] = '';
       const control = form.get(field);
       if (control && control.dirty && !control.valid) {
         const messages = this.validationMessage[field];
         console.log(messages);
         for (const key in control.errors) {
           this.formErrors[field] += messages[key] + '\n';
         }
       }
     }
   }


  createPas({value,valid}: {value:Passenger, valid:boolean}){
  	console.log(value);
    console.log('yan:'+valid)
  }

}
