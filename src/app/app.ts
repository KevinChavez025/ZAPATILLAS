import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './Components/navbar/navbar';
import { Footer } from './Components/footer/footer';
import { SeoService } from './seo.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  template: `
    <a href="#main-content" class="skip-link">Saltar al contenido principal</a>
    <app-navbar></app-navbar>
    <main id="main-content">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styles: [`:host { display: block; }`]
})
export class App implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.init();
  }
}
