import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageForm } from './message-form/message-form';
import { MessageDisplay } from './message-display/message-display';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MessageForm,
    MessageDisplay,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-sms-messenger');
}
