import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageForm } from './message-form/message-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MessageForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-sms-messenger');
}
