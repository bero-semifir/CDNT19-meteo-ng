import { Component } from '@angular/core';
import { MeteoService } from './meteo/meteo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  ville: string = "";

  meteo: any = null;

  constructor(private meteoService: MeteoService){}

  voirMeteo() {
    const obs = this.meteoService.getWeather(this.ville);
      
    // change l'attribu weather pour l'affichage
    obs.subscribe((weather: any) => {
        this.meteo = weather;
      });

    // log la reponse
    obs.subscribe((weather: any) => {console.log(weather)})
    // log un message
    obs.subscribe(( _ ) => {console.log("Requête envoyée")})

  }

  voirMeteoLocale(){
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        this.meteoService.getLocalWeather(position)
          .subscribe(
            (weather) => this.meteo = weather
          )
      }
    )
  }

}
