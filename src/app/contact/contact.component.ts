import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ConfirmDialogModel, ConfirmdialogComponent } from '../confirmdialog/confirmdialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public searchfilter: any = '';
  editform: boolean = false;
  data: any[] = [];
  registerForm: FormGroup;
  formGroup: FormGroup;
  dialogData: any;
  addform: boolean = false;
  result: any;
  dialogRef: any;
  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.data = [
      { id: 1, firstname: "mallikarjuna", lastname: "Talluri", company: "Mycompany", email: "arjun@gmail.com", primary: "8297497341", alternate: "9381579991" },
      { id: 2, firstname: "bhanu", lastname: "P", company: "Mycompany", email: "Bhanu@gmail.com", primary: "34563456", alternate: "9381579991" },
      { id: 3, firstname: "chandu", lastname: "D", company: "Mycompany", email: "Chandu@gmail.com", primary: "956875678", alternate: "9381579991" },
      { id: 4, firstname: "ramana", lastname: "K", company: "Mycompany", email: "Ramana@gmail.com", primary: "353456346", alternate: "9381579991" },
      { id: 5, firstname: "sekhar", lastname: "P", company: "Mycompany", email: "Sekhar@gmail.com", primary: "78586787", alternate: "9381579991" },
    ]

    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      company: ['', Validators.required],
      email: ['', Validators.required],
      primary: ['', Validators.required],
      alternate: ['', Validators.required]
    })
  }

  filterfn(key) {
    console.log(key)
    if (key == "") {
      this.data = [
        { id: 1, firstname: "mallikarjuna", lastname: "Talluri", company: "Mycompany", email: "arjun@gmail.com", primary: "8297497341", alternate: "9381579991" },
        { id: 2, firstname: "bhanu", lastname: "P", company: "Mycompany", email: "arjun@gmail.com", primary: "8297497341", alternate: "9381579991" },
        { id: 3, firstname: "chandu", lastname: "D", company: "Mycompany", email: "arjun@gmail.com", primary: "8297497341", alternate: "9381579991" },
        { id: 4, firstname: "ramana", lastname: "K", company: "Mycompany", email: "arjun@gmail.com", primary: "8297497341", alternate: "9381579991" },
        { id: 5, firstname: "sekhar", lastname: "P", company: "Mycompany", email: "arjun@gmail.com", primary: "8297497341", alternate: "9381579991" },

      ]
    }
    const result = this.data.filter(s => s.firstname.includes(key));
    this.data = result;
  }
  add() {
    this.registerForm.reset();
    if (this.addform == false) {
      this.addform = true;
      this.editform = false;
    }
  }

  onSubmit() {
    debugger

    let addArray = [{
      "firstname": this.registerForm.controls.firstname.value,
      "lastname": this.registerForm.controls.lastname.value,
      "company": this.registerForm.controls.company.value,
      "email": this.registerForm.controls.email.value,
      "primary": this.registerForm.controls.primary.value,
      "alternate": this.registerForm.controls.alternate.value
    }]
    if (this.registerForm.controls.firstname.value == null || "") {
      alert('Please Enter Valid data');
      return false;
    }
    else {
      addArray.forEach(element => {
        this.data.push(element);
      });
    }
  }

  edit(data) {
    debugger;
    this.addform = false;
    this.editform = true;
    this.registerForm.patchValue({
      firstname: data.firstname,
      lastname: data.lastname,
      company: data.company,
      email: data.email,
      primary: data.primary,
      alternate: data.alternate
    })
  }



  confirmDialog(): void {
    debugger;
    const message = `Are you sure you want to do this?`;

    this.dialogData = new ConfirmDialogModel("Confirm Action", message);

    this.dialogRef = this.dialog.open(ConfirmdialogComponent, {
      maxWidth: "400px",
      data: this.dialogData
    });

    this.dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
    });
  }

  delete(data) {
    localStorage.setItem('deleteItem', JSON.stringify(data));
  }
  confirmation() {
    let value = JSON.parse(localStorage.getItem('deleteItem'));
    this.data = this.data.filter(function (obj) {
      return obj.firstname !== value.firstname;
    });
    this.editform = false;
  }
  cancel() {
    this.editform = false;
  }
}

