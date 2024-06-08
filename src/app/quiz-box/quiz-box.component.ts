import { Component, Inject, OnInit, inject } from '@angular/core';
import { QUESTIONS } from './mock-question';
import { ActivatedRoute } from '@angular/router';
import { RouterLink, Router } from '@angular/router';
import { QuizzFirebaseServiceService } from '../quizz-firebase-service.service';
import { DocumentReference } from '@angular/fire/firestore';
import { AppComponent } from '../app.component';
import { Resultat } from '../result/resultat';


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
  resultat: Resultat = new Resultat;
  cocktailResult!: Number;

  quizzFireBaseService = inject(QuizzFirebaseServiceService)
  appComponent = inject(AppComponent)
  router = inject(Router)

  constructor() {
    this.quizzId = Number(this.route.snapshot.params['id']);
    this.questions = QUESTIONS.get(this.quizzId);
    this.route.params.subscribe( val => {
      this.quizzId =Number(this.route.snapshot.params['id']);
      this.questions = QUESTIONS.get(this.quizzId);
    })
  }

  addResponseDoc(reponse: string): void {
    this.quizzFireBaseService.saveStringInDoc(this.appComponent.documentId, this.quizzId, reponse);
    if(this.isLastQuestion()) {
      //this.router.navigate(['result']);
      this.getResult().then((res: Resultat) => {
        this.cocktailResult = this.getCocktailMatch(res);
        this.getCocktailPage();
      })
    } else {
      this.router.navigate(['/question/', this.quizzId+1])
    }
  }

  getCocktailPage(): void {

    if(this.cocktailResult == 1) {
      window.location.href = "https://cocktailsquare.ch/2024/05/23/mojito/";
    }

    if(this.cocktailResult == 2) {
      window.location.href = "https://cocktailsquare.ch/2024/05/23/martini/";
    }

    if(this.cocktailResult == 3) {
      window.location.href = "https://cocktailsquare.ch/2024/05/23/old-fashioned/";
    }

    if(this.cocktailResult == 4) {
      window.location.href = "https://cocktailsquare.ch/2024/05/24/margarita-aux-fruits-exotiques/";
    }

    // window.location.href = "https://cocktailsquare.ch/produit/sirop-noisette/";
  }

  async getResult(): Promise<Resultat> {
    const res = await this.quizzFireBaseService.getResponsesByUSer(this.appComponent.documentId);
    console.log("GAetqbsad");
    this.resultat.q1 = res.q1;
    this.resultat.q2 = res.q2;
    this.resultat.q3 = res.q3;
    this.resultat.q4 = res.q4;
    return this.resultat;
  }

  getCocktailMatch(res: Resultat): Number {
    const total = this.getTotal(res);
    console.log("Total : "+Number(total));
    if(Number(total) < Number(7)){
      return 1;
    } else if (Number(total) < 11) {
      return 2;
    } else if(Number(total) < 15) {
      return 3;
    } else  if(Number(total) < 17){
      return 4;
    } else {
      return 0;
    }
  }

  getTotal(res: Resultat): Number {
    console.log('q1:', res.q1); // Log la valeur de q1
    console.log('q2:', res.q2); // Log la valeur de q2
    console.log('q3:', res.q3); // Log la valeur de q3
    console.log('q4:', res.q4); // Log la valeur de q4

    return +res.q1 + +res.q2 + +res.q3 + +res.q4;
  }

  isLastQuestion(): boolean {
    if(this.quizzId == QUESTIONS.size) {
      return true;
    } else {
      return false;
    }
  }

  addResponse(reponse: string): void {
    this.quizzFireBaseService.saveString(reponse).then((docRef: DocumentReference) => {
      this.docId = docRef.id;
    })
  }

}
