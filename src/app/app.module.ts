import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SearchComponent} from './search/search.component';
import { LaunchesListComponent } from './shared/launches-list/launches-list.component';
import { CriterionComponent } from './shared/criterion/criterion.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    LaunchesListComponent,
    CriterionComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
