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

  async onSubmit() {
    if (!this.user_code || !this.user_password) {
      this.showAlert('Error', 'Please fill in both fields.');
      return;
    }

    // ดึงข้อมูลผู้ใช้ตาม user_code
    this.userService.getUserByCode(this.user_code).subscribe(users => {
      if (users.length === 0) {
        this.showAlert('Error', 'User not found');
        return;
      }

      const user = users[0];  // สมมุติว่ามีเพียง 1 ผู้ใช้ที่ตรงกับ user_code
      if (user['user_password'] === this.user_password) {
        this.showAlert('Success', 'Login successful!');
      } else {
        this.showAlert('Error', 'Incorrect password');
      }
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
