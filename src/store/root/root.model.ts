export class Url {
  constructor(
    public baseurl: string,
    public shoppingurl: string
  ) { }
}

export const initialUrl: Url = {
  baseurl: 'http://192.168.1.252:3000/',
  shoppingurl: 'shopping/query'
};
