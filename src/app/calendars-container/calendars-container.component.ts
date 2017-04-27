import {Component, OnInit, Input} from '@angular/core';
import {ControlValueAccessor, FormControl, ValidationErrors, Validator} from '@angular/forms';
import {CalendarValue} from '../common/types/calendar-value';
import {Moment} from 'moment';
import {UtilsService} from '../common/services/utils/utils.service';
import {IDayCalendarConfig} from '../day-calendar/day-calendar-config.model';
import {IMonthCalendarConfig} from '../month-calendar/month-calendar-config';
import {CalendarType} from '../common/types/calendar-type';
import {SingleCalendarValue} from '../common/types/single-calendar-value';
import {ECalendarValue} from '../common/types/calendar-value-enum';

@Component({
  selector: 'dp-calendars-container',
  templateUrl: './calendars-container.component.html',
  styleUrls: ['./calendars-container.component.less'],
  providers: [UtilsService]
})
export class CalendarsContainerComponent implements OnInit,
                                                    Validator,
                                                    ControlValueAccessor {
  @Input() config: IDayCalendarConfig | IMonthCalendarConfig;
  @Input() type: CalendarType = 'day';
  @Input() displayDate: SingleCalendarValue;
  @Input() minDate: Moment | string;
  @Input() maxDate: Moment | string;

  componentConfig: IDayCalendarConfig | IMonthCalendarConfig;
  _selected: Moment[] = [];
  inputValue: CalendarValue;
  inputValueType: ECalendarValue;
  validateFn: (FormControl, string) => {[key: string]: any};

  constructor(public utilsService: UtilsService) {
  }

  ngOnInit() {
  }

  init() {
  }

  set selected(selected: Moment[]) {
    this._selected = selected;
    this.onChangeCallback(this.processOnChangeCallback(selected));
  }

  get selected(): Moment[] {
    return this._selected;
  }

  onChangeCallback(_: any) {
  };

  writeValue(value: CalendarValue): void {
    this.inputValue = value;

    if (value) {
      this.selected = this.utilsService
        .convertToMomentArray(value, this.componentConfig.format, this.componentConfig.allowMultiSelect);
      this.init();
    }
  }

  processOnChangeCallback(selected: Moment[]): CalendarValue {
    return this.utilsService.convertFromMomentArray(this.componentConfig.format, selected, this.inputValueType);
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  validate(formControl: FormControl): ValidationErrors | any {
    if (this.minDate || this.maxDate) {
      return this.validateFn(formControl, this.componentConfig.format);
    } else {
      return () => null;
    }
  }
}
