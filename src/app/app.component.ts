import { Router, RouterOutlet } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, Component, NgModule, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, NgFor, NgIf, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DiaryFront';

  constructor() { }

  ngOnInit() {
    this.title = "日記アプリ";
  }
}
