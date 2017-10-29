import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { MsgIconComponentModule } from '../../components/msgicon/msgicon.module';
import { MsgTipComponentModule } from '../../components/msgtip/msgtip.module';
import { MsgTipBdComponentModule } from '../../components/msgtipbd/msgtipbd.module';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    MsgIconComponentModule,
    MsgTipComponentModule,
    MsgTipBdComponentModule,
    IonicPageModule.forChild(LoginPage),
  ],
})
export class LoginPageModule {}
