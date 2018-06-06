import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database'
import { Product } from '../../models/product';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  public products: Product[];

  constructor(public navCtrl: NavController, private db: DatabaseProvider) {

  }

  ngOnInit() {
    this.db.getAllProducts()
           .then(data => this.products = data)
           .catch(error => console.log('Something want wrong!'));
  }

}
