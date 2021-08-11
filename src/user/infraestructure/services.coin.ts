import axios from "axios";

export class CoinService {
  static url: string = "https://api.coingecko.com/api/v3/";
  static async getCoins(currency: string): Promise<any> {
    const infoCoins: any = [];
    if (currency != undefined) {
      const coins = await axios.get(
        this.url + `coins/markets?vs_currency=${currency}`
      );
      coins.data.map((element: any) => {
        infoCoins.push({
          simbolo: element.symbol,
          nombre: element.name,
          imagen: element.image,
          precio: element.current_price,
          lastUpdate: element.last_updated,
        });
      });
      return Promise.resolve(infoCoins);
    } else {
      return "Parametro currency, no encontrado";
    }
  }
  static async top(criptos: any): Promise<any> {
    console.log(criptos);
    const currency: string = "ars,usd,eur";
    let criptomonedas: any = [];
    criptos.cripto.forEach((element: any) => {
      criptomonedas.push(element.nombre);
    });
    console.log(criptomonedas);
    if (criptos === undefined || criptos === null) {
      return "No tiene criptomonedas registradas";
    } else {
      const prices = await axios.get(
        this.url + `simple/price?ids=bitcoin&vs_currencies=${currency}`
      );
      return prices.data;
    }
  }
}
