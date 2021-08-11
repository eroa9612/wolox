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
  static async top(criptos: any, moneda: string): Promise<any> {
    const currency: string = "ars,usd,eur";
    let criptomonedas: any = [];
    let result: any = [];
    if (criptos === undefined || criptos === null) {
      return "No tiene criptomonedas registradas";
    } else {
      criptos.nombre.forEach((element: any) => {
        criptomonedas.push(element.cripto);
      });
      const prices = await axios.get(
        this.url +
          `simple/price?ids=${criptomonedas}&vs_currencies=${currency}&include_last_updated_at=true`
      );

      const coins = await axios.get(
        this.url + `coins/markets?vs_currency=${moneda}&ids=${criptomonedas}`
      );

      for (const key in prices.data) {
        coins.data.forEach((element: any) => {
          if (key === element.id) {
            result.push({
              simbolo: element.symbol,
              ars: prices.data[key].ars,
              usd: prices.data[key].usd,
              eur: prices.data[key].eur,
              nombre: element.name,
              imagen: element.image,
              lastUpdate: element.last_updated,
            });
          }
        });
      }
      return result;
    }
  }
}
