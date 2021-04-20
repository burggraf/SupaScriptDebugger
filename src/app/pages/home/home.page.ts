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
      console.log('payload.new.content', payload.new.content);
      const itemArr = [payload.new.log_type];
      for (let i=0; i < payload.new.content.length; i++) {
        const item = payload.new.content[i];
        if (typeof item === 'object') {
          itemArr.push(JSON.stringify(item));
        } else {
          itemArr.push(item);
        }
      };
      console.log('itemArr', itemArr);
      this.items.unshift(itemArr);
    })
    .subscribe();
    

  }

  async login(email, password) {
    const { user, session, error } = await this.supabase.auth.signIn({
      email: email,
      password: password,
    });
    if (error) {
      console.error('login error', error);
    } else {
      console.log('login successful', user);
    }
  }

}
