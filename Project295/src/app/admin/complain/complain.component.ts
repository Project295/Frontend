import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-complain',
  templateUrl: './complain.component.html',
  styleUrls: ['./complain.component.css']
})
export class ComplainComponent {
   constructor(public admin: AdminService) { }
   
   ngOnInit(): void {
    this.admin.getAllComplain();
  }

  selectedComplaint: any;

  viewDetails(complaint: any) {
    this.selectedComplaint = { ...complaint };
  }

  acceptComplaint(postId: number,isBlocked:boolean) {
    const complaint= {
      postId:postId,
      isBlocked:isBlocked? false : true
    }
    console.log(complaint);
    
    this.admin.UpdateComplainStatus(complaint)
  }

  rejectComplaint(complaintId: number) {
   this.admin.DeleteComplain(complaintId);
   }
}
