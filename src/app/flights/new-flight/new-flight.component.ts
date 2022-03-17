import { Component, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FlightsService } from 'src/app/core/flights.service';
import { FlightFormComponent } from '../flight-form/flight-form.component';

@Component({
  selector: 'app-new-flight',
  templateUrl: './new-flight.component.html',
  styleUrls: ['./new-flight.component.scss']
})

export class NewFlightComponent {
  @ViewChild('flightForm')
  flightForm!: FlightFormComponent;

  constructor (
    private flightService: FlightsService,
    private toast: MatSnackBar,
    private dialogReg: MatDialogRef<NewFlightComponent>)
    {}

  createFlight() {
    console.log(this.flightForm);
    this.flightService.addFlight(this.flightForm.form.value).then(this.onCreatingSuccess.bind(this), 
    this.onCreatingFailure.bind(this));
  }

  private onCreatingSuccess() {
    this.dialogReg.close();
    this.toast.open('Lot został pomyślnie utworzony!', '', { panelClass: 'toast-success'});  
  }

  private onCreatingFailure(error: { message: string; }) {
    this.toast.open(error.message, '', { panelClass: 'toast-error'});
  }
  
}