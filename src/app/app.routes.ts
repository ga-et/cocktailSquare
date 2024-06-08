import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { QuizBoxComponent } from './quiz-box/quiz-box.component';
import { ResultComponent } from './result/result.component';

const routeConfig: Routes = [
    {
      path: '',
      component: WelcomeComponent,
      title: 'Welcome !'
    },
    {
      path: 'question/:id',
      component: QuizBoxComponent,
      title: 'questions'
    },
    {
      path: 'result',
      component: ResultComponent,
      title: 'Résultat'
    },
    {
      path: 'welcome',
      component: WelcomeComponent,
      title: 'Bienvenue'
    }
  ];
  
  export default routeConfig;
