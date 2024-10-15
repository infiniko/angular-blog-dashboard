import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  if(authService.isLogggedInGuard){
    return true;
  }
  else{
    toastr.error('Access Denied..');
    router.navigate(['/login']);
    return false;
  }
};
 