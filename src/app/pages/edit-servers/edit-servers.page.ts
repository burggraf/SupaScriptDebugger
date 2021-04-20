import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-servers',
  templateUrl: './edit-servers.page.html',
  styleUrls: ['./edit-servers.page.scss'],
})
export class EditServersPage implements OnInit {
  public servers = [];
  public server = {
    name: '',
    url: '',
    key: ''
  };
  public selectedIndex = 0;
  constructor() { }

  ngOnInit() {
    const strServers = localStorage.getItem('servers');
    const storedIndex = localStorage.getItem('selectedIndex');
    if (storedIndex) {
      this.selectedIndex = parseInt(storedIndex, 10);
    }
    if (strServers) {
      this.servers = JSON.parse(strServers);
      if (this.servers.length < this.selectedIndex) {
        this.selectedIndex = 0;
      }
      if (this.servers.length > this.selectedIndex) {
        this.server = this.servers[this.selectedIndex];
      }
    } else {
      console.log('add server here');
    }
  }

  save() {
    const index = this.servers.map(e => e.name).indexOf(this.server.name);
    if (index > -1) {
      this.servers[index] = this.server; // replace server
    } else {
      this.servers.push(this.server); // add new server
    }
    localStorage.setItem('servers', JSON.stringify(this.servers));
  }
  add() {
    this.servers.push({
      name: '',
      url: '',
      key: ''
    });
    this.selectedIndex = this.servers.length - 1;
    this.server = this.servers[this.selectedIndex];
  }
  delete() {
    this.servers.splice(this.selectedIndex, 1);
    this.selectedIndex = this.selectedIndex - 1;
    if (this.selectedIndex < 0) {
      this.selectedIndex = 0;
    }
    if (this.servers.length > 0) {
      this.server = this.servers[this.selectedIndex];
    }
    localStorage.setItem('servers', JSON.stringify(this.servers));
  }
  selectServer(index) {
    this.selectedIndex = index;
    this.server = this.servers[index];
    localStorage.setItem('selectedIndex', index.toString());
  }

  serverValid() {
    if (this.server.name.length > 0 && this.server.url.length > 0 && this.server.key.length > 0) {
      return true;
    } else {
      return false;
    }
  }

}
