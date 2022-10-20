import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';
import spotify from 'spotify-web-api-js';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi: spotify.SpotifyWebApiJs = null;

  constructor() { 
    this.spotifyApi = new spotify();
  }

  obterUrlLogin() {
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + redirectUrl + scopes + responseType
  }

  obterTokenUrlCallback() {
    if (!window.location.hash) return '';
    const param = window.location.hash.substring(1).split('&');
    return param[0].split('=')[1];
  }

  definirAccessToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }
}
