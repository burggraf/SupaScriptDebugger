import { Component, OnInit } from '@angular/core';
import { createClient } from '@supabase/supabase-js'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private supabase = null;
  public server = null;
  public items = [];
  constructor() { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const servers = localStorage.getItem('servers');
    if (servers) {
      try {
        const selectedIndex = parseInt(localStorage.getItem('selectedIndex'), 10);
        this.server = JSON.parse(servers)[selectedIndex];
        this.connect(this.server.url, this.server.key);
      } catch (err) {
        console.error('error loading server', err);
      }
    }
  }
  connect(url, key) {
    this.supabase = createClient(url, key);
    console.log('connect', this.supabase);
    const mySubscription = this.supabase
    .from('supascript_log')
    .on('INSERT', payload => {
      console.log('Change received!', payload)
      this.items.unshift(payload.new);
    })
    .subscribe();
    

  }

}
