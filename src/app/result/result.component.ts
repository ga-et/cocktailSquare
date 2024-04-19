import { Component, inject } from '@angular/core';
import { QuizzFirebaseServiceService } from '../quizz-firebase-service.service';
import { AppComponent } from '../app.component';
import { Resultat } from './resultat';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent {
  quizzFireBaseService = inject(QuizzFirebaseServiceService)
  appComponent = inject(AppComponent)

  resultat: Resultat = new Resultat;
  cocktailResult!: Number;

  constructor() {
    this.getResult().then((res: Resultat) => {
      this.cocktailResult = this.getCocktailMatch(res);
    })
  }

  async getResult(): Promise<Resultat> {
    const res = await this.quizzFireBaseService.getResponsesByUSer(this.appComponent.documentId);
    this.resultat.q1 = res.q1;
    this.resultat.q2 = res.q2;
    this.resultat.q3 = res.q3;
    this.resultat.q4 = res.q4;
    return this.resultat;
  }

  getTotal(res: Resultat): Number {
    console.log('q1:', res.q1); // Log la valeur de q1
    console.log('q2:', res.q2); // Log la valeur de q2
    console.log('q3:', res.q3); // Log la valeur de q3
    console.log('q4:', res.q4); // Log la valeur de q4

    return +res.q1 + +res.q2 + +res.q3 + +res.q4;
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

  getCocktailName(): string {

    if(this.cocktailResult == 1) {
      return "Mojito";
    }

    if(this.cocktailResult == 2) {
      return "Martini";
    }

    if(this.cocktailResult == 3) {
      return "Old Fashioned";
    }

    if(this.cocktailResult == 4) {
      return "Margarita aux fruits exotiques";
    }

    return "pas de résultat"
  }
}
