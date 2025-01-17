import { Component, ViewChild, TemplateRef } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
constructor(public admin: AdminService, public dialog: MatDialog, private router: Router,
  ) { }

  ngOnInit(): void {
    this.admin.getAllContactUs();
  }

  selectedContact: any = null; 
  viewDetails(contact: any) {
    this.selectedContact = contact;
   }

sendEmail(email: string | undefined) {
  if (email) {
    const subject = encodeURIComponent('Response to your message');
    const body = encodeURIComponent('Hello,\n\nThank you for your message. We will get back to you shortly.\n\nRegards,\nAdmin Team');
    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
    
    window.location.href = mailtoLink;
  }
}
}
