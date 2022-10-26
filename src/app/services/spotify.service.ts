import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';
import spotify from 'spotify-web-api-js';
import { IUsuario } from '../interfaces/IUsuario';
import { spotifyArtistaParaArtista, spotifyPlaylistparaIPlaylist, spotifyUserParaUsuario } from '../common/spotifyHelper';
import { IPlaylist } from '../interfaces/IPlaylist';
import { Router } from '@angular/router';
import { IArtista } from '../interfaces/IArtista';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi: spotify.SpotifyWebApiJs = null;
  usuario: IUsuario;

  constructor(
    private router: Router
  ) {
    this.spotifyApi = new spotify();
  }

  async inicializarUsuario(): Promise<boolean> {
    if (!!this.usuario) return true;

    const token = localStorage.getItem('token');

    if (!token) return false;

    try {
      this.definirAccessToken(token);
      await this.obterSpotifyUsuario();
      return !!this.usuario;
    } catch (ex) {
      console.log(ex)
      return false;
    }
  }

  async obterSpotifyUsuario() {
    const userInfo = await this.spotifyApi.getMe();
    this.usuario = spotifyUserParaUsuario(userInfo);
  }

  obterUrlLogin(): string {
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + redirectUrl + scopes + responseType;
  }

  obterTokenUrlCallback(): string {
    if (!window.location.hash) return '';
    const param = window.location.hash.substring(1).split('&');
    return param[0].split('=')[1];
  }

  definirAccessToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }

  async buscarPlaylistusuario(offset = 0, limit = 50): Promise<IPlaylist[]> {
    const playlists = await this.spotifyApi.getUserPlaylists(this.usuario.id, { offset, limit });
    return playlists.items.map(spotifyPlaylistparaIPlaylist);
  }

  async buscarTopArtistas(limit = 10): Promise<IArtista[]> {
    const artistas = await this.spotifyApi.getMyTopArtists({limit});
    return artistas.items.map(spotifyArtistaParaArtista);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login'])
  }
}
