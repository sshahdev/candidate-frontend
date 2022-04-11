import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { CandidateDialogComponent } from "./candidate-dialog/candidate-dialog.component";

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent {

  constructor(
    private dialog: MatDialog,
  ) { }

  // ngOnInit(): void {
  //   // this.onCreate();
  // }

  onCreate(): void {
    let dialogRef = this.dialog.open(CandidateDialogComponent, {
      width: '800px',
    });
  }
}
