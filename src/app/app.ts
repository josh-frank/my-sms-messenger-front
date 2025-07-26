import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { v4 as uuidv4 } from 'uuid';

import { Messages } from './messages/messages';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Messages,
  ],
  providers: [
    CookieService,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
  protected readonly title = signal('my-sms-messenger');
  private getSessionIdFromCookies;
  private cookieService = inject(CookieService);

  constructor() {
    this.getSessionIdFromCookies = this.cookieService.get( 'session_id' );
    if ( !this.getSessionIdFromCookies ) {
      const uuid = uuidv4();
      this.cookieService.set( 'session_id', uuid );
      this.getSessionIdFromCookies = uuid;
    }
  }

}
