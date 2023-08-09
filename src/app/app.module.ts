import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilesystemFormComponent } from './components/filesystem/filesystem-form/filesystem-form.component';
import { FileComponent } from './components/filesystem/file/file.component';
import { FolderComponent } from './components/filesystem/folder/folder.component';
import { NotFoundPageComponent } from './pages/not-found/not-found-page.component';
import { ScenarioPageComponent } from './pages/scenario-page/scenario-page.component';
import { SelectModelPageComponent } from './pages/select-model-page/select-model-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectModelPageComponent,
    NotFoundPageComponent,
    ScenarioPageComponent,
    FilesystemFormComponent,
    FolderComponent,
    FileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
