import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { InstitutionalPageComponent } from './institutional-page/institutional-page.component';
import { InstitutionalInfoPageComponent } from './institutional-info-page/institutional-info-page.component';
import { ServicesPageComponent } from './services-page/services-page.component';
import { ConventionsPageComponent } from './conventions-page/conventions-page.component';
import { JuridicPageComponent } from './juridic-page/juridic-page.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { NewsDetailsPageComponent } from './news-details-page/news-details-page.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full',
	},
	{
		path: 'home',
		component: HomePageComponent,
	},
	{
		path: 'login',
		component: LoginPageComponent,
	},
	{
		path: 'institutional',
		component: InstitutionalPageComponent,
	},
	{
		path: 'institutional-info',
		component: InstitutionalInfoPageComponent,
	},
	{
		path: 'services',
		component: ServicesPageComponent,
	},
	{
		path: 'conventions',
		component: ConventionsPageComponent,
	},
	{
		path: 'juridic',
		component: JuridicPageComponent,
	},
	{
		path: 'news',
		component: NewsPageComponent,
	},
	{
		path: 'news/:id',
		component: NewsDetailsPageComponent,
		runGuardsAndResolvers: 'paramsOrQueryParamsChange',
	},
	{
		path: 'registration',
		component: UserRegistrationComponent,
	},
	{
		path: 'profile',
		component: UserProfileComponent,
	},
	{
		path: 'edit-profile',
		component: EditProfileComponent,
	},
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ],
})
export class AppRoutingModule {}
