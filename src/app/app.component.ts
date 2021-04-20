import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [

    { title: 'Debugger', url: '/home', icon: 'bug' },
    { title: 'Servers', url: '/edit-servers', icon: 'server' },

  ];
  constructor() {}
}
