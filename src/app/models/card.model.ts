export interface CardModel {
  number: number;
  season: string;
  title: string;
  faction: string;
  type: string;
  mainText: string;
  loreText: string;
  location: string;
  glory: number;
  restricted: string;
  errataType: string;
  attackActions: AttackActionsModel;
}

export interface AttackActionsModel {
  range: number;
  dicesType: string;
  dices: number;
  damage: number;
}
