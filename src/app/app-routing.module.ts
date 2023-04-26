import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{LoginComponent} from "./components/login/login.component"
import{SignupComponent} from "./components/signup/signup.component"
import{HomeComponent} from "./components/home/home.component"
import{MainPageComponent} from "./components/main-page/main-page.component"
import{MainPageEmComponent} from "./components/main-page-em/main-page-em.component"
import { AuthGuard } from './auth.guard';

const routes:Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent },
  {path: 'signup', component: SignupComponent},
  {path: 'home', component: HomeComponent},
  {path: 'MainPage', component: MainPageComponent, canActivate: [AuthGuard]},
  {path: 'MainPageEm', component: MainPageEmComponent, canActivate: [AuthGuard]},
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
