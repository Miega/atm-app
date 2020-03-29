import { Injectable } from '@angular/core';
import { AlertService } from './_alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class MoneyService {

  // Default stored values of all cash in the ATM.
  // $100 bills are in position 0, while $1 bills are in position 5.
  // In a real application, these values would be stored elsewhere
  // and could be retrieved even if the page is reloaded.
  atmStock = [10, 10, 10, 10, 10, 10];
  // Array containing value of bill denominations.
  denominations = [100, 50, 20, 10, 5, 1];

  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };

  constructor(private alertService: AlertService) { }

  withdrawCash(cash): void {
    // Get the bill denominations, then update the atmStock.
    const billsRequested = this.getBills(cash);
    // If the array returned by getBills() evaluates to true, update the atmStock.
    if (billsRequested[1]){
      this.updateStock(false, billsRequested[0], cash);
    }
  }

  getBills(cash): any {
    // Return array that will contain the array of bills requested as well as a boolean.
    const withdrawArray = [[], true];
    // The piles of bills, initialized as an empty array.
    const userPiles = new Array(this.denominations.length).fill(0);
    // Start with the largest denominaion.
    let step = 0;
    // Loop while we have money left or until we run out of bills.
    while (cash > 0 && step < this.denominations.length) {
      // Get the first stack of money we can use to make change.
      const denomination = this.denominations[step];
      // Figure out how many bills we can use.
      // Use whatever is in the ATM stock as the maximum amount of bills that can be taken from that denomination.
      const needed = Math.min(Math.floor(cash / denomination), this.atmStock[step]);
      // Reduce the total by the bills we used.
      cash -= denomination * needed;
      // Update the stacks with the change.
      userPiles[step] = needed;
      // Move to the next denomination in the array.
      step++;
    }
    // See if we were not able to make the change due to the ATM not having enough cash on hand.
    if (cash > 0) {
      // If the ATM runs out of cash, trigger a displayMessage.
      // Set the boolean in the withdrawArray to false.
      this.alertService.error('Insufficent Funds.', this.options);
      withdrawArray[1] = false;
    }
    // Add the piles of bills to the withdrawArray.
    withdrawArray[0] = userPiles;
    return withdrawArray;
  }

  updateStock(add, billsRequested, cashAmount): void {
    console.log(billsRequested);
    // Update the ATM with new values.
    let step = 0;
    if (!add){
      // Subtract the values from atmStock.
      while (step < this.atmStock.length) {
        this.atmStock[step] -= billsRequested[step];
        step++;
      }
      this.alertService.success('Dispensed $' + cashAmount + ' to user.', this.options);
    }
    else {
      // Add the values to atmStock.
      while (step < this.atmStock.length) {
        this.atmStock[step] += billsRequested[step];
        step++;
      }
      this.alertService.success('Successfully added bills to ATM stock.', this.options);
    }
    return;
  }
}
