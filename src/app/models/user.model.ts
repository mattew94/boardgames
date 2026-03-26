export interface IResponseBoardgamesList {
  data: BoardgamesList;
}
export interface BoardgamesList {
  list: List[];
}
export interface List {
  type: string;
  duration: number;
  players: string;
  game: string;
  description: string;
  owners: string[];
}

export interface Utente {
  nome: string;
  giochi: IGames[];
}

export interface IResponseFriendsGames {
  id: string;
  display_name: string;
  games: IGames[];
  username: string;
}

export interface IResponseCurrentUserGames {
  id: string;
  name: string;
  description: string;
  genre: string;
  min_players: number,
  max_players: number,
  duration: number
}

export interface IGames {
  id: string;
  name: string;
  genre: string;
  min_players: string;
  duration: number;
  max_players: string
}