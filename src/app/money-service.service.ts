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
  // The default value of the ATM stock. Used when resetting the ATM values.
  defaultValue = 10;

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  constructor(private alertService: AlertService) { }

  withdrawCash(cash): void {
    // Get the bill denominations, then update the atmStock.
    const billsRequested = this.getBills(cash);
    // If the array returned by getBills() evaluates to true, update the atmStock.
    if (billsRequested[1]){
      this.updateStock(billsRequested[0], cash);
      this.inquireStock();
    }
  }

  inquireStock(): void {
    // Get a readout on all of the bills in the ATM stock.
    let atmString = `<div>Machine Balance: </div>`;
    let step = 0;
    while (step < this.atmStock.length){
      atmString += `<div>$${this.denominations[step]} - ${this.atmStock[step]} </div>`;
      step++;
    }
    this.alertService.success(atmString, this.options);
  }

  inquireDenominations(denomArray): void {
    console.log(denomArray);
    if (denomArray.length > 0){
      // Match the values in the denomArray to the list of denominations
      // and get their matching index number.
      const indexArray = [];
      const billArray = [];
      let inquiryString = `<div>Machine Balance: </div>`;
      let step = 0;
      while (step < denomArray.length){
        if (this.denominations.indexOf(denomArray[step]) >= 0){
          indexArray.push(this.denominations.indexOf(denomArray[step]));
          step++;
        }
        else {
          this.alertService.error('Invalid command.', this.options);
          return;
        }
      }
      // Then, find the number of matching bills in the atmStock.
      step = 0;
      while (step < indexArray.length){
        billArray.push(this.atmStock[indexArray[step]]);
        step++;
      }
      step = 0;
      while (step < denomArray.length){
        inquiryString += `<div>$${denomArray[step]} - ${billArray[step]} </div>`;
        step++;
      }
      // Finally, send the string over to the AlertService.
      this.alertService.success(inquiryString, this.options);
    }
    else {
      this.alertService.error('Invalid command.', this.options);
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
      // If the ATM runs out of cash or doesn't have the correct number of bills, trigger an error message.
      // Set the boolean in the withdrawArray to false.
      this.alertService.error('Insufficent funds or bills available.', this.options);
      withdrawArray[1] = false;
    }
    // Add the piles of bills to the withdrawArray.
    withdrawArray[0] = userPiles;
    return withdrawArray;
  }
  getAtmTotal(): number {
      // Get the number of bills from the ATM stock, then
      // multiply by each demonination to get the total available.
      let atmTotal;
      const billValues = Object.assign([], this.atmStock);
      let step = 0;
      while (step < billValues.length) {
        billValues[step] *= this.denominations[step];
        step++;
      }
      atmTotal = billValues.reduce((a, b) => a + b, 0);
      return atmTotal;
  }

  resetStock(): void {

    let step = 0;
    while (step < this.atmStock.length){
      this.atmStock[step] = this.defaultValue;
      step++;
    }
    this.alertService.success('ATM stock has been reset to default values.', this.options);
    this.inquireStock();
  }

  updateStock(billsRequested, cashAmount): void {
    console.log(billsRequested);
    // Update the ATM with new values.
    let step = 0;
    // Subtract the values from atmStock.
    while (step < this.atmStock.length) {
        this.atmStock[step] -= billsRequested[step];
        step++;
    }
    const totalStock = this.getAtmTotal();
    this.alertService.success(`Dispensed $${cashAmount} to user. $${totalStock} remaining in stock.`, this.options);
    return;
  }
}
