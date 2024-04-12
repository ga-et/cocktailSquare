import { Component, OnInit, inject } from '@angular/core';
import { QUESTIONS } from './mock-question';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { QuizzFirebaseServiceService } from '../quizz-firebase-service.service';
import { DocumentReference } from '@angular/fire/firestore';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-quiz-box',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './quiz-box.component.html',
  styleUrl: './quiz-box.component.css'
})
export class QuizBoxComponent {
  questions: any[] | undefined;
  route: ActivatedRoute = inject(ActivatedRoute);
  quizzId = -1;
  response: String = '';
  docId: string = '';

  quizzFireBaseService = inject(QuizzFirebaseServiceService)
  appComponent = inject(AppComponent)

  constructor() {
    this.quizzId = Number(this.route.snapshot.params['id']);
    this.questions = QUESTIONS.get(this.quizzId);
    this.route.params.subscribe( val => {
      this.quizzId =Number(this.route.snapshot.params['id']);
      this.questions = QUESTIONS.get(this.quizzId);
    }

    )
  }

  addResponseDoc(reponse: string): void {
    this.quizzFireBaseService.saveStringInDoc(this.appComponent.documentId, this.quizzId, reponse);
  }

  addResponse(reponse: string): void {
    this.quizzFireBaseService.saveString(reponse).then((docRef: DocumentReference) => {
      this.docId = docRef.id;
    })
  }

}
