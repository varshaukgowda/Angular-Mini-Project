// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.scss']
// })
// export class HomeComponent {
//   constructor(private router:Router){}
//   logout(){
//     sessionStorage.clear();
//     this.router.navigate(['/Login']);
//   }

// }

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  userName: string | null = '';

  constructor(private router: Router) {
    this.userName = sessionStorage.getItem('loggedInUser') ; // Retrieve username
    console.log('Retrieved userName:', this.userName);
  }

  logout() {
    sessionStorage.clear(); // Clear session data
    this.router.navigate(['/login']); // Redirect to login page
  }
}

