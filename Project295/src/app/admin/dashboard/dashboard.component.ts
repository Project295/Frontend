import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    constructor(public admin: AdminService
    ) { }
  ngOnInit(): void {
    this.admin.getAllUsers();
    this.admin.getAllComplain();
  }
}
