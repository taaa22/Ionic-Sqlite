import { Injectable } from '@angular/core';
import { Product } from '../../models/product';
import SQL from "../../../www/sql.js";

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  private dbName : string; 

  constructor() {
    this.dbName = "db.sqlite"; 
  }

  getAllProducts(){

    return new Promise<Product[]>((resolve, reject) => { 

      let sql = "select * from Products";
      this.executeQuery(sql).then(data => {
        
        let products = [];
        data.forEach(function (row) {
          let product: Product = { productId: row[0], productName: row[1], price: row[2] }
          products.push(product);
        });
        resolve(products);

      }).catch(error => {
        console.log(error);
      });

    });

    
  }

  executeQuery(sql: string) {

    let db: any;
    return new Promise<any>((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', this.dbName, true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = (e) => {
          let uInt8Array = new Uint8Array(xhr.response);
          db = new SQL.Database(uInt8Array);
          let contents = db.exec(sql);
          resolve(contents[0].values);
        };
        xhr.send();

    });
    
    

  }

}
