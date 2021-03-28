import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertService } from '../_alert/alert.service';
import { MoneyService } from '../money-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };

  commandForm: FormGroup;

  restockArray = [10, 10, 10, 10, 10, 10];

  // tslint:disable-next-line:max-line-length
  constructor(private alertService: AlertService, private moneyService: MoneyService, fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.commandForm = fb.group({
      commandText: ['', Validators.required]
    });
   }


  ngOnInit(): void {
  }

  onSubmit(): void {
    // Get the command text andconvert it to uppercase (in case a user entered in a lowercase letter)
    let command = this.commandForm.value.commandText;
    command = command.toUpperCase();

    // Parse the command and perform actions based on the first character entered.
    const commandLetter = command.charAt(0);

    switch (commandLetter){
      case 'W':
        // Parse the amount of money from the rest of the text entered,
        // then call the withdraw command from the MoneyService.
        console.log('Withdraw command.');
        const dollarMarker = command.indexOf('$') + 1;
        if (dollarMarker > 0){
          const bills = command.substr(dollarMarker);
          const regex = /^[A-Za-z]+$/;
          if (bills.match(regex)){
            this.alertService.error('Invalid command.', this.options);
          }
          else {
            this.moneyService.withdrawCash(bills);
          }
        }
        else {
          this.alertService.error('Invalid command.', this.options);
        }
        break;
      case 'R':
        // Restock the ATM to the default 10 bills.
        console.log('Restock command.');
        this.moneyService.resetStock();
        break;
      case 'I':
        // Parse the bill denominations from the rest of the text entered,
        // Then call inquireDenominations from the MoneyService.
        console.log('Inquiry command.');
        let inputString = command.substr(2);
        inputString = inputString.replace(/\$/g, '');
        const denomArray = inputString.split(' ');
        this.moneyService.inquireDenominations(denomArray);
        break;
      case 'Q':
        // Quit the application and return the user to the Login page.
        console.log('Quit command.');
        this.router.navigate([''], { relativeTo: this.route });
        break;
      default:
        break;
    }

  }

}
