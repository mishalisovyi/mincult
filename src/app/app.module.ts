import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "./material.module";

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { ContainerComponent } from "./pages/container/container.component";
import { StartPageGuestComponent } from "./components/start-page-guest/start-page-guest.component";
import { RegularValuesListComponent } from "./components/regular-values-list/regular-values-list.component";
import { MovedValuesListComponent } from "./components/moved-values-list/moved-values-list.component";
import { MissedValuesListComponent } from "./components/missed-values-list/missed-values-list.component";
import { UserCabinetComponent } from "./components/user-cabinet/user-cabinet.component";
import { ExpertRequestsListComponent } from "./components/expert-requests-list/expert-requests-list.component";
import { DocumentsGeneralListComponent } from "./components/documents-general-list/documents-general-list.component";
import { DocumentsSharingComponent } from "./components/documents-sharing/documents-sharing.component";
import { StartPageOtherComponent } from "./components/start-page-other/start-page-other.component";
import { CreateRegularRequestComponent } from "./components/user-cabinet/create-regular-request/create-regular-request.component";
import { CreateMoveRequestComponent } from "./components/user-cabinet/create-move-request/create-move-request.component";


import { TokenInterceptor } from "./services/interceptors/token.interceptor";

import { appRoutes } from "./app.routes";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ContainerComponent,
    StartPageGuestComponent,
    RegularValuesListComponent,
    MovedValuesListComponent,
    MissedValuesListComponent,
    UserCabinetComponent,
    ExpertRequestsListComponent,
    DocumentsGeneralListComponent,
    DocumentsSharingComponent,
    StartPageOtherComponent,
    CreateRegularRequestComponent,
    CreateMoveRequestComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    RouterModule.forRoot(appRoutes),
    ...MaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [CreateRegularRequestComponent, CreateMoveRequestComponent]
})
export class AppModule { }