import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertService } from '../_alert/alert.service';
import { MoneyService } from '../money-service.service';

@Component({
  selector: 'app-restock',
  templateUrl: './restock.component.html',
  styleUrls: ['./restock.component.css']
})
export class RestockComponent implements OnInit {

  restockForm: FormGroup;

  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };

  constructor(private alertService: AlertService, private moneyService: MoneyService, fb: FormBuilder) {
    this.restockForm = fb.group({
      hundred: [0, Validators.required],
      fifty: [0, Validators.required],
      twenty: [0, Validators.required],
      ten: [0, Validators.required],
      five: [0, Validators.required],
      one: [0, Validators.required]
    });
   }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const restockArray = Object.values(this.restockForm.value);
    // Submit the values entered and attempt to add bills to the ATM stock.
    this.addCash(restockArray);
  }

  addCash(restockArray){
    // Check the array for negative values; if found, throw an error and immediately return.
    let step = 0;
    while (step < restockArray.length){
      if (restockArray[step] < 0){
        this.alertService.error(`Invalid restock value of ${restockArray[step]} entered.`, this.options);
        return;
      }
      step++;
    }
    // Update the atmStock.
    this.moneyService.updateStock(true, restockArray, null);
  }

}
