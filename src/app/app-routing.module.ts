import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { InstitutionalPageComponent } from './institutional-page/institutional-page.component';
import { ServicesPageComponent } from './services-page/services-page.component';
import { ConventionsPageComponent } from './conventions-page/conventions-page.component';
import { JuridicPageComponent } from './juridic-page/juridic-page.component';
import { NewsPageComponent } from './news-page/news-page.component';

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
		path: 'institutional',
		component: InstitutionalPageComponent,
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
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ],
})
export class AppRoutingModule {}
