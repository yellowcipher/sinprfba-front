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

// News
import { ScrollingModule } from '@angular/cdk/scrolling';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewsDetailsPageComponent } from './news-details-page/news-details-page.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule, MatRadioModule } from '@angular/material';
import { CepService } from './services/cep.service';
import { HttpClientModule } from '@angular/common/http';

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
		InfiniteScrollComponent,
		NewsDetailsPageComponent,
		UserRegistrationComponent,
	],
	imports: [
		BrowserModule,
		ScrollingModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		AppRoutingModule,
		NgbModule,
		BrowserAnimationsModule,
		FormsModule,
		TextMaskModule,
		MatButtonModule,
		MatSelectModule,
		HttpClientModule,
		MatRadioModule,
	],
	providers: [ CepService ],
	bootstrap: [ AppComponent ],
})
export class AppModule {}
