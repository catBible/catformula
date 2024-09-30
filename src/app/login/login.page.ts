import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user_code: string = '';
  user_password: string = '';

  constructor(private userService: UserService, private alertController: AlertController) {}

  onSubmit() {
    this.userService.getUserByCodeAndPassword(this.user_code, this.user_password).subscribe((users: any[]) => {
      console.log('this.userService', users);
      if (users.length === 0) {
        this.showAlert('Error', 'User not found or incorrect password');
        return;
      }

      const user = users[0];  // สมมุติว่ามีเพียง 1 ผู้ใช้ที่ตรงกับ user_code และ user_password
      console.log('user33', user);
      this.showAlert('Success', 'Login successful!');
    });
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
