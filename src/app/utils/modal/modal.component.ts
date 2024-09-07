import { NgFor } from "@angular/common";
import { Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  imports: [NgFor, ReactiveFormsModule],
})
export class ModalComponent {
  title!: string;
  message!: string;

  close() {

  }
}