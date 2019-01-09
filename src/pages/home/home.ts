import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  weather: any;
  location : {
    city: string,
    state: string
  }

  constructor(public navCtrl: NavController, private _weatherProvider: WeatherProvider, private _storage: Storage ) {

  }

  ionViewWillEnter () {
    this._storage.get('location').then(
      val => {
        if (val !== null) {
          this.location = JSON.parse(val);
        } else {
          this._storage.set('location', JSON.stringify({city: 'Miami', state: 'FL'}))
          this.location = {city: 'Miami', state: 'FL'};
        }
        this._weatherProvider.getWeather(this.location.city, this.location.state).subscribe(
      (data: any) => (
        this.weather = data.current_observation
        )
    );
      }
    )
    
  }

  

}
