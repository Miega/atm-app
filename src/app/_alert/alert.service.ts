import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Alert, AlertType } from './alert.model';

@Injectable({ providedIn: 'root' })
export class AlertService {
    private subject = new Subject<Alert>();
    private defaultId = 'default-alert';

    private userAlertHistory: {
        alertMessage: string,
        timestamp: Date
    }[] = [];

    // Enable subscribing to an alerts observable.
    onAlert(id = this.defaultId): Observable<Alert> {
        return this.subject.asObservable().pipe(filter(x => x && x.id === id));
    }

    // Alert functions to create a new alert on the view.
    // Also adds a new entry into userAlertHistory.
    success(message: string, options?: any) {
        const date = new Date();
        this.alert(new Alert({ ...options, type: AlertType.Success, message }));
        this.userAlertHistory.push({ alertMessage: message, timestamp: date});
    }

    error(message: string, options?: any) {
        const date = new Date();
        this.alert(new Alert({ ...options, type: AlertType.Error, message }));
        this.userAlertHistory.push({ alertMessage: message, timestamp: date});
    }

    // Main alert method.
    alert(alert: Alert) {
        alert.id = alert.id || this.defaultId;
        this.subject.next(alert);
    }

    // Clear alerts.
    clear(id = this.defaultId) {
        this.subject.next(new Alert({ id }));
    }

    getMessageHistory(){
        // Get the list of all transactions made.
        console.log(this.userAlertHistory);
        return this.userAlertHistory;
    }
}
