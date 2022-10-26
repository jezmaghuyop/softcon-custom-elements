import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class CustomTableComponent implements OnInit, OnChanges {
  @Input() headers: Array<string> = [];
  @Input() bodyData: Array<any> = [];
  @Input() actions: Array<{ name: string; action: string }> = [];
  @Input() tableHeaderClass: string = 'bg-gray-50';

  @Output() actionEvent: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(simpleChanges: SimpleChanges): void {
    console.log(simpleChanges);

    if (
      simpleChanges['headers'] &&
      simpleChanges['headers'].currentValue &&
      typeof simpleChanges['headers'].currentValue === 'string'
    ) {
      this.headers = JSON.parse(simpleChanges['headers'].currentValue);
      console.log(this.headers);
    }

    if (
      simpleChanges['bodyData'] &&
      simpleChanges['bodyData'].currentValue &&
      typeof simpleChanges['bodyData'].currentValue === 'string'
    ) {
      this.bodyData = JSON.parse(simpleChanges['bodyData'].currentValue);
      console.log(this.bodyData);
    }

    if (
      simpleChanges['actions'] &&
      simpleChanges['actions'].currentValue &&
      typeof simpleChanges['actions'].currentValue === 'string'
    ) {
      this.actions = JSON.parse(simpleChanges['actions'].currentValue);
      console.log(this.actions);
    }

    if (
      simpleChanges['tableHeaderClass'] &&
      simpleChanges['tableHeaderClass'].currentValue &&
      simpleChanges['tableHeaderClass'].currentValue !== 'undefined' &&
      typeof simpleChanges['tableHeaderClass'].currentValue === 'string'
    ) {
      this.tableHeaderClass = simpleChanges['tableHeaderClass'].currentValue;
      console.log(this.tableHeaderClass);
    }
  }

  dataKeys(data: any): string[] {
    return Object.keys(data);
  }

  triggerAction(action: string) {
    this.actionEvent.emit(action);
  }
}
