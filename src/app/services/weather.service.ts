import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { enviroment } from 'src/environments/enviroments';
import { WeatherData } from '../models/weather.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  conversion(tempature: number): number {
    const result = +(((tempature - 32) * 5) / 9).toFixed(1);

    return result;
  }

  getWeatherData(cityName: string): Observable<WeatherData> {
    return this.http.get<WeatherData>(
      `${enviroment.weatherApiBaseURL}${cityName}`,
      {
        headers: new HttpHeaders()
          .set(
            enviroment.XRapidAPIKeyHeaderName,
            enviroment.XRapidAPIKeyHeaderValue
          )
          .set(
            enviroment.XRapidAPIHostHeaderName,
            enviroment.XRapidAPIHostHeaderValue
          ),
        params: new HttpParams().set('city', cityName),
      }
    );
  }
}
