import { Component, Input, inject } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() control: AbstractControl = new FormControl();
  @Input() label: string | undefined;
  @Input() placeholder: string | undefined;
  @Input() type = 'text';
  @Input() isPassword = false;
  @Input() isCountryPicker = false;
  @Input() showLabel = true;
  @Input() isDatePicker = false;
  @Input() isDatePickerRange = false;

  public showPassword: boolean = false;
  public isRequired = false;
  public calendar = inject(NgbCalendar);
  public formatter = inject(NgbDateParserFormatter);
  public hoveredDate: NgbDate | null = null;
  public fromDate: NgbDate | null = this.calendar.getToday();
  public toDate: NgbDate | null = null
  public isFromDateActive = true;

  ngOnInit(): void {
    if (this.transformControl.errors && this.transformControl.errors['required']) {
      this.isRequired = true;
    }
  }

  get transformControl(): FormControl {
    return this.control as FormControl;
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  public inputType(): string {
    if (this.type === 'password' && !this.showPassword) {
      return 'password';
    } else if (this.type === 'password' && this.showPassword) {
      return 'text';
    } else if (this.isCountryPicker) {
      return 'tel';
    } else {
      return this.type;
    }
  }

  public onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate) {
      if (date.before(this.fromDate)) {
        this.toDate = this.fromDate;
        this.fromDate = date;
      } else {
        this.toDate = date;
      }
      this.updateFormControlValue();
    } else {
      this.fromDate = date;
      this.toDate = null;
    }
  }
  
  

  public validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    const newDate = parsed ? NgbDate.from(parsed) : null;
    if (newDate) {
      this.fromDate = newDate;
      this.updateFormControlValue();
    }
    return currentValue;
  }

  private updateFormControlValue() {
    if (this.fromDate && this.toDate) {
      const formattedFromDate = this.formatter.format(this.fromDate);
      const formattedToDate = this.formatter.format(this.toDate);
      const dateRange = `${formattedFromDate} - ${formattedToDate}`;
      this.transformControl.setValue(dateRange);
    }
  }
  public isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  public isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  public isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }
}
