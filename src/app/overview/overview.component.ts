import { Component, OnInit } from '@angular/core';
import { AlertService } from '../_alert/alert.service';
import { MoneyService } from '../money-service.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  transactions;
  atmMoney: {
    denomination: number,
    billAmount: number
}[] = [];

  constructor(private alertService: AlertService, private moneyService: MoneyService) { }

  ngOnInit(): void {
    this.displayDenominations();
    this.displayHistory();
  }

  displayHistory(): void {
    this.transactions = this.alertService.getMessageHistory();
  }
  displayDenominations(): void {
    let step = 0;
    const stockList = this.moneyService.atmStock;
    const atmLength = this.moneyService.atmStock.length;
    const denominationList = this.moneyService.denominations;

    while (step < atmLength){
      this.atmMoney.push({ denomination: denominationList[step], billAmount: stockList[step]});
      step++;
    }
  }

}
