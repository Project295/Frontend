import { Component, ViewChild, TemplateRef } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-user-mange',
  templateUrl: './user-mange.component.html',
  styleUrls: ['./user-mange.component.css']
})
export class UserMangeComponent {
  constructor(public admin: AdminService, public dialog: MatDialog) { }

  @ViewChild('callBlockedDailog') BlockedDailog !: TemplateRef<any>;

  ngOnInit(): void {
    this.admin.getAllUsers();
  }


  pData: any = {};
  openBlockedDailog(obj: any) {
    this.pData = obj;
    const dialogRef = this.dialog.open(this.BlockedDailog).afterClosed().subscribe((result) => {
      if (result !== undefined) {
        if (result === 'yes') {
          // Toggle the blocked status
          obj.isBlocked = !obj.isBlocked;
          this.admin.blockedUser(obj); 
        }
      }
    });
  }
}
