import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <app-splash-screen></app-splash-screen>
  <app-navbar></app-navbar>
  <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'my-blog';
}
