import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BackendController } from './backend/backend.controller';
import { TableComponent } from './components/table/table.component';
import { TableService } from './components/table/table.service';
import { BackendInterceptor } from './interceptors/backend.interceptor';

@NgModule({
  declarations: [AppComponent, TableComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [
    BackendController,
    { provide: HTTP_INTERCEPTORS, useClass: BackendInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
