import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './Components/navbar/navbar';
import { Footer } from './Components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class App {}
