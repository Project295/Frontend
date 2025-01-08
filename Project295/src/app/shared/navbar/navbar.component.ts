import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) { }

  isDropdownVisible: boolean = false;

  // Toggle dropdown visibility
  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }
}
