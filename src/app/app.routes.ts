import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { QuizBoxComponent } from './quiz-box/quiz-box.component';

const routeConfig: Routes = [
    {
      path: '',
      component: WelcomeComponent,
      title: 'Home page'
    },
    {
      path: 'question/:id',
      component: QuizBoxComponent,
      title: 'Home details'
    }
  ];
  
  export default routeConfig;
