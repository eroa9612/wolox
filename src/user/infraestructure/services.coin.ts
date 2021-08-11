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
      const response = { data: infoCoins, status: 200 };
      return Promise.resolve(response);
    } else {
      const response = {
        data: "Parametro currency, no encontrado",
        status: 400,
      };
      return response;
    }
  }
  static async top(criptos: any, moneda: string): Promise<any> {
    const currency: string = "ars,usd,eur";
    let criptomonedas: any = [];
    let result: any = [];
    if (criptos === undefined || criptos === null) {
      const response = {
        data: "No tiene criptomonedas registradas",
        status: 400,
      };
      return response;
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
      const response = { data: result, status: 200 };
      return response;
    }
  }
}
