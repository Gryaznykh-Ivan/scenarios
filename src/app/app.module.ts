import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilesystemFormComponent } from './components/forms/filesystem-form/filesystem-form.component';
import { FileComponent } from './components/filesystem/file/file.component';
import { FolderComponent } from './components/filesystem/folder/folder.component';
import { NotFoundPageComponent } from './pages/not-found/not-found-page.component';
import { ScenarioPageComponent } from './pages/scenario-page/scenario-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ConfirmComponent } from './components/popups/confirm/confirm.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TabsComponent } from './components/tabs/tabs.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidebarsComponent } from './components/sidebars/sidebars.component';
import { DragableDirective } from './directives/draggable.directive';
import { LetDirective } from './directives/let.directive';
import { ScenariosComponent } from './components/scenarios/scenarios.component';
import { ConfirmWithNameComponent } from './components/popups/confirm-with-name/confirm-with-name.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { ConfirmWithCheckboxComponent } from './components/popups/confirm-with-checkbox/confirm-with-checkbox.component';
import { ActionsComponent } from './components/actions/actions.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { EditorComponent } from './components/editor/editor.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { metaReducers, reducers } from './state/core.reducer';
import { FilesystemEffects } from './state/filesystem';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
    ScenarioPageComponent,
    FilesystemFormComponent,
    FolderComponent,
    FileComponent,
    ConfirmComponent,
    TabsComponent,
    ToolbarComponent,
    SidebarsComponent,
    DragableDirective,
    LetDirective,
    ScenariosComponent,
    ConfirmWithNameComponent,
    SearchFilterPipe,
    ConfirmWithCheckboxComponent,
    ActionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    DragDropModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatRippleModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatExpansionModule,
    EditorComponent,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([FilesystemEffects])
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
