import { Injectable } from '@angular/core';
import { Client, fetchExchange } from '@urql/core';
import { BACKEND, GET_WORLD, ACHETER_PRODUIT, ENGAGER_MANAGER, LANCER_PRODUCTION} from './request';
import { World } from './world';
import { Product } from './world';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  user = "rokaya"
  server = BACKEND + "graphql"


  createClient() {
    return new Client({
      url: this.server,
      exchanges: [fetchExchange],
      fetchOptions: () => {
        return {
          headers: { 'x-user': this.user },
        };
      },
    });
  }


  getWorld() {
    return this.createClient().query(GET_WORLD, {}).toPromise();
  }

  lancerProduction(product: Product) {
    return this.createClient().mutation(LANCER_PRODUCTION, {
      id:
        product.id
    }).toPromise();
  }

}

