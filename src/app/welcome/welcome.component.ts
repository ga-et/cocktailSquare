import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppComponent } from '../app.component';
import { DocumentReference, Firestore, collection } from '@angular/fire/firestore';
import { QuizzFirebaseServiceService } from '../quizz-firebase-service.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  appComponent = inject(AppComponent);
  quizzFireBaseService = inject(QuizzFirebaseServiceService)

  startNewDocument(): void {
    this.quizzFireBaseService.saveNewDoc().then((docRef: DocumentReference) => {
      this.appComponent.documentId = docRef.id;
    })
  }


}
