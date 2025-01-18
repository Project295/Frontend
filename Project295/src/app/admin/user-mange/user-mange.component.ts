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
  fData: any[] = [];
  ngOnInit(): void {
    this.admin.getAllUsers();
  }


  pData: any = {};

  filter: string = ""
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
  dateFilter() {
    if (this.fData.length === 0) {
      this.fData = this.admin.Users;
    }

    if (this.filter !== "") {
      this.admin.Users = this.fData.filter((x: any) => {
        const fullName = `${x.firstName ?? ""} ${x.lastName ?? ""}`.toLowerCase();
        return (
          fullName.includes(this.filter.toLowerCase()) ||
          x.userName?.toLowerCase().includes(this.filter.toLowerCase()) ||
          x.phoneNumber?.toLowerCase().includes(this.filter.toLowerCase()) ||
          x.roleName?.toLowerCase().includes(this.filter.toLowerCase()) ||
          x.isBlocked?.toString().toLowerCase().includes(this.filter.toLowerCase())
        );
      });
    }
    else {
      this.admin.Users = this.fData;
    }


  }
}
