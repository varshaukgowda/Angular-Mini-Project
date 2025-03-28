import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userName: string | null = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.userName = sessionStorage.getItem('username'); 
    // console.log('Retrieved userName:', this.userName);
  }

  logout() {
    sessionStorage.clear(); 
    this.router.navigate(['/member-registration']); 
  }
}


