import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuizBoxComponent } from './quiz-box/quiz-box.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    QuizBoxComponent,
    WelcomeComponent,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cocktail-personality';
  documentId = '';
}
