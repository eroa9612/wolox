import axios from "axios";

export class CoinService {
  static url: string = "https://api.coingecko.com/api/v3/";
  static async getCoins(currency: string): Promise<any> {
    const infoCoins: any = [];
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
  }

  //   static async infoCoins(coins: any): Promise<any> {
  //     let coinsData: any = [];
  //     coins.map(async (element: any) => {
  //       const data = await axios.get(this.url + `coins/${element.id}`);
  //       console.log(data);
  //       coinsData.push(data);
  //     });

  //     this.returData(coinsData.data);
  //   }
  //   static async returData(coins: any): Promise<any> {
  //     console.log("entra");
  //     let infoCoin: any = [];
  //     coins.map(async (element: any) => {
  //       infoCoin.push({
  //         simbolo: element.symbol,
  //         nombre: element.name,
  //         imagen: element.image,
  //         lastUpdate: element.last_updated,
  //       });
  //     });
  //     console.log(infoCoin);
  //     return infoCoin;
  //   }
}
