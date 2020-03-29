import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertService } from '../_alert/alert.service';
import { MoneyService } from '../money-service.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };

  withdrawalForm: FormGroup;

  constructor(private alertService: AlertService, private moneyService: MoneyService, fb: FormBuilder) {
    this.withdrawalForm = fb.group({
      cashAmount: ['', Validators.required]
    });
   }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const cash = this.withdrawalForm.value.cashAmount;
    if (cash > 0){
      // Submit the values entered and take bills from the ATM stock.
      console.log('Withdrawing $' + cash);
      this.moneyService.withdrawCash(cash);
    }
    else {
      // Trigger an error message if the value entered was negative.
      this.alertService.error('Invalid withdrawal value of ' + cash + ' entered.', this.options);
    }
  }



}
