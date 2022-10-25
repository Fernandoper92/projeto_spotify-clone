import { IPlaylist } from "../interfaces/iPlaylist";
import { IUsuario } from "../interfaces/IUsuario";

export function spotifyUserParaUsuario(user: SpotifyApi.CurrentUsersProfileResponse,): IUsuario {
    return {
        id: user.id,
        nome: user.display_name,
        imagemUrl: user.images.pop().url,
    }
}

export function spotifyPlaylistparaIPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): IPlaylist {
    return {
        id: playlist.id,
        nome: playlist.name,
        imagemUrl: playlist.images.pop().url
    }
}