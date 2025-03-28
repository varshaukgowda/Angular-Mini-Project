// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuardService {

//   constructor(private router:Router) { }

//   canActivate(): boolen{
//     const isLoggedIn = sessionStorage.getItem(isLoggedIn);
//   }
// }
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    
    if (isLoggedIn) {
      return true; // Allow access
    } else {
      
      this.router.navigate(['/login']); // Redirect to login if not authenticated
      return false;
    }
  }
}
