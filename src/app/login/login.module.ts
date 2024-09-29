import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';

// นำเข้า AngularFirestoreModule
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    AngularFirestoreModule, // นำเข้าโมดูลนี้เพื่อให้ Firestore ใช้งานได้
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
