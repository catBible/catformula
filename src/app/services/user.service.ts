import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  // เพื่อให้สามารถเรียกใช้งานได้ทั่วโปรเจกต์
})
export class UserService {
  private userCollection = 'user_login';  // กำหนดชื่อคอลเลกชันใน Firestore

  constructor(private firestore: AngularFirestore) {}

  // ดึงข้อมูลผู้ใช้ทั้งหมด
  getUsers(): Observable<any[]> {
    return this.firestore.collection(this.userCollection).valueChanges();
  }

  // ดึงข้อมูลผู้ใช้ตาม user_code
  getUserByCode(user_code: string): Observable<any[]> {
    return this.firestore.collection(this.userCollection, ref => ref.where('user_code', '==', user_code)).valueChanges();
  }

  // เพิ่มผู้ใช้ใหม่
  addUser(userData: any): Promise<void> {
    const id = this.firestore.createId();  // สร้าง ID ใหม่สำหรับเอกสาร
    return this.firestore.collection(this.userCollection).doc(id).set(userData);
  }

  // อัปเดตข้อมูลผู้ใช้
  updateUser(id: string, userData: any): Promise<void> {
    return this.firestore.collection(this.userCollection).doc(id).update(userData);
  }

  // ลบผู้ใช้
  deleteUser(id: string): Promise<void> {
    return this.firestore.collection(this.userCollection).doc(id).delete();
  }
}
