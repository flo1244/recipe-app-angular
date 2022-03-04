import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  //stores feature which should be displayed initially which could be recipes etc. 
  loadedFeature = 'recipe';

  constructor(private authService: AuthService, private loggingService: LoggingService){}
  //receives the were to navigate from information
  // onNavigate(feature: string) {
  //   //set loadedFeature to the feature we receive here as argument
  //   this.loadedFeature = feature;
  // }
  ngOnInit(): void {
    this.authService.autoLogin();
    this.loggingService.printLog('Hello from app component'); //testing services
  }

}
