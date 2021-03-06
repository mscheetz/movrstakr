import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Addresses } from 'src/app/classes/addresses.class';
import { QrDialogData } from 'src/app/classes/qr-dialog-data.class';
import { RestService } from 'src/app/core/rest.service';
import { QrDialogComponent } from '../qr-dialog/qr-dialog.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  qrDialogData!: QrDialogData;
  addresses!: Addresses;
  showQRCode: boolean = false;
  donateType!: string;
  address!: string;
  symbol!: string;

  constructor(private restSvc: RestService, private dialog: MatDialog) { 
    this.getAllAddresses();
  }

  ngOnInit(): void {
  }

  async getAllAddresses(symbol: string = '') {
    if(typeof this.addresses === 'undefined') {
      this.restSvc.addresses()
          .subscribe(res => {
            this.addresses = res;
            if(symbol !== ''){
              this.getAddress(symbol);
            }
          });
      }
  }

  async getAddress(symbol: string){
    if(typeof this.addresses === 'undefined') {
      await this.getAllAddresses(symbol);
      return;
    }
    let coinName!: string;

    this.symbol = symbol.toUpperCase();
    if(this.symbol === 'BTC') {
      coinName = 'Bitcoin';
      this.address = this.addresses.btc;
    } else if (this.symbol === 'DOT') {
      coinName = 'Polkadot';
      this.address = this.addresses.dot;
    } else if (this.symbol === 'ERC20') {
      coinName = 'ERC20 (MOVR, ETH, POLY, BSC,...)';
      this.address = this.addresses.erc20;
    } else if (this.symbol === 'XHV') {
      coinName = 'Haven';
      this.address = this.addresses.xhv;
    } else if (this.symbol === 'XMR') {
      coinName = 'Monero';
      this.address = this.addresses.xmr;
    }
    this.showQRCode = true;
    this.qrDialogData = {
      address: this.address,
      donateType: `Donate with ${coinName} (${this.symbol})`,
      symbol: this.symbol
    }
    this.openDialog();
  }

  openDialog() {
    const ref = this.dialog.open(QrDialogComponent, {
      data: this.qrDialogData
    });

  }
}
