import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './pages/not-found/not-found-page.component';
import { ScenarioPageComponent } from './pages/scenario-page/scenario-page.component';
import { SelectModelPageComponent } from './pages/select-model-page/select-model-page.component';

const routes: Routes = [
  { path: '', component: SelectModelPageComponent },
  { path: 'scenario/:scenarioId', component: ScenarioPageComponent },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
