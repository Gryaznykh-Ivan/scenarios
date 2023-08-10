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
import { ModalComponent } from './components/modal/modal.component';
import { CreateFileComponent } from './components/filesystem/create-file/create-file.component';
import { CreateFolderComponent } from './components/filesystem/create-folder/create-folder.component';
import { EditFolderComponent } from './components/filesystem/edit-folder/edit-folder.component';
import { EditFileComponent } from './components/filesystem/edit-file/edit-file.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SelectModelPageComponent,
    NotFoundPageComponent,
    ScenarioPageComponent,
    FilesystemFormComponent,
    FolderComponent,
    FileComponent,
    ModalComponent,
    CreateFileComponent,
    CreateFolderComponent,
    EditFolderComponent,
    EditFileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
