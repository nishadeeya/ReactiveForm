import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = 'b0c9a15aca1142f1269236566f654167';

  constructor() { }

  getWeather(city: string) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`;
    return axios.get(apiUrl);
  }
  getCurrentWeather(latitude: number, longitude: number): Promise<AxiosResponse<any>> {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}`;
    return axios.get(apiUrl);
  }
  getForecast(city: string) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.apiKey}`;
    return axios.get(apiUrl);
  }
  
}
