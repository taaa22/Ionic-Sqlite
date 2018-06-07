# Ionic-Sqlite
Read existing SQLite database file and load data.

## Installation:
  ```
  git clone https://github.com/taaa22/Ionic-Sqlite.git
  cd Ionic-Sqlite/
  npm install
  ```
  
## How it works:
  1. Copy sql.js file from (https://github.com/kripken/sql.js/) to www folder.
  2. In index.html file at the end of body import <script src="sql.js"></script>.
  3. Use this code to open database and read data.
  ``` typescript
  
    import SQL from "../../../www/sql.js";
    .
    .
    .
  
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
    
  ```
