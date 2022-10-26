import { PlayerComponent } from './player.component';
import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { PlaylistComponent } from '../playlist/playlist.component';
export const PlayerRotas: Routes = [
    {
        path: '',
        component: PlayerComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'pesquisar',
                component: HomeComponent
            },
            {
                path: 'artistas',
                component: HomeComponent
            },
            {
                path: 'playlist',
                component: PlaylistComponent
            },
            {
                path: 'playlist/:id',
                component: PlaylistComponent
            }
        ]
    }
]