import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilesystemFormComponent } from './components/filesystem/filesystem-form/filesystem-form.component';
import { FileComponent } from './components/filesystem/file/file.component';
import { FolderComponent } from './components/filesystem/folder/folder.component';
import { NotFoundPageComponent } from './pages/not-found/not-found-page.component';
import { ScenarioPageComponent } from './pages/scenario-page/scenario-page.component';
import { SelectModelPageComponent } from './pages/select-model-page/select-model-page.component';
import { CreateFileComponent } from './components/popups/create-file/create-file.component';
import { CreateFolderComponent } from './components/popups/create-folder/create-folder.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { RenameFileComponent } from './components/popups/rename-file/rename-file.component';
import { RenameFolderComponent } from './components/popups/rename-folder/rename-folder.component';
import { ConfirmComponent } from './components/popups/confirm/confirm.component';
import { RemoveFolderComponent } from './components/popups/remove-folder/remove-folder.component';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    SelectModelPageComponent,
    NotFoundPageComponent,
    ScenarioPageComponent,
    FilesystemFormComponent,
    FolderComponent,
    FileComponent,
    CreateFileComponent,
    CreateFolderComponent,
    RenameFileComponent,
    RenameFolderComponent,
    ConfirmComponent,
    RemoveFolderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
