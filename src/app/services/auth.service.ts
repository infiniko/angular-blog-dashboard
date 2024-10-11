import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLogggedInGuard: boolean = false;
  constructor(private auth: Auth, private toastr: ToastrService, private router: Router) { }

  login(email: string, password: string) {
    const authInstance = getAuth();
    signInWithEmailAndPassword(authInstance, email, password).then(ref => {
      localStorage.setItem('user', JSON.stringify(ref.user));
      this.toastr.success('Successful login');
      this.loggedIn.next(true);
      this.router.navigate(['/']);
      this.isLogggedInGuard = true;
    }).catch(e => {
      this.toastr.error(e.message);
    })
  }


  logout() {
    const authInstance = getAuth();
    signOut(authInstance).then( ref => {
      this.toastr.success('Logged out!!');
      localStorage.removeItem('user');
      this.loggedIn.next(false);
      this.router.navigate(['/login']);
      this.isLogggedInGuard = false;
    });
  }

  isLoggedIn(){
    return this.loggedIn.asObservable();
  }
}
