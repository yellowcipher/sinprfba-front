import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { InstitutionalPageComponent } from './institutional-page/institutional-page.component';
import { ServicesPageComponent } from './services-page/services-page.component';
import { ConventionsPageComponent } from './conventions-page/conventions-page.component';
import { JuridicPageComponent } from './juridic-page/juridic-page.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { FooterComponent } from './footer/footer.component';
import { InstitutionalInfoPageComponent } from './institutional-info-page/institutional-info-page.component';
import { LoginPageComponent } from './login-page/login-page.component';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		HomePageComponent,
		InstitutionalPageComponent,
		ServicesPageComponent,
		ConventionsPageComponent,
		JuridicPageComponent,
		NewsPageComponent,
		FooterComponent,
		InstitutionalInfoPageComponent,
		LoginPageComponent,
	],
	imports: [
		BrowserModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		AppRoutingModule,
		NgbModule,
	],
	providers: [],
	bootstrap: [ AppComponent ],
})
export class AppModule {}
