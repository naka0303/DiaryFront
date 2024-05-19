import { Router, RouterOutlet } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject, NgModule, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, NgFor, NgIf, isPlatformBrowser } from '@angular/common';
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

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void { 
    this.title = "日記アプリ";
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
      if (localStorage.getItem("loginUsername") !== null
          && localStorage.getItem("loginIsEnabled") !== null) {
        this.router.navigate(['']);
      } else {
        this.router.navigate(['/login']);
      }
    }
  }
}
