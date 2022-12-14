import { Component, OnInit } from '@angular/core';
import { faGuitar, faHome, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';
import { IPlaylist } from 'src/app/interfaces/IPlaylist';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-painel-esquerdo',
  templateUrl: './painel-esquerdo.component.html',
  styleUrls: ['./painel-esquerdo.component.scss']
})
export class PainelEsquerdoComponent implements OnInit {

  playlists: IPlaylist[] = [];

  //Icones
  homeIcone = faHome;
  pesquisarIcone = faSearch;
  artistaIcone = faGuitar;
  playlistIcone = faMusic;

  constructor(private spotifyService: SpotifyService) {
  }

  ngOnInit(): void {
    this.buscarPlaylists();
  }

  async playlistClick(playlist: IPlaylist) {
  }

  async buscarPlaylists() {
    this.playlists = await this.spotifyService.buscarPlaylistusuario();
  }
}
