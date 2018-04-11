export interface CardModel {
  number: number;
  title: string;
  faction: string;
  type: string;
  mainText: string;
  loreText: string;
  location: string;
  glory: number;
  restricted: string;
  atackActions: AtackActionsModel;
}

export interface AtackActionsModel {
  range: number;
  dicesType: string;
  dices: number;
  damage: number;
}
