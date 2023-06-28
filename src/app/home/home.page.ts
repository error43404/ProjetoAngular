import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class HomePage {
  operations = ['+', '-', 'x', '÷'];

  operationsValue = '';

  result = '';

  constructor() {
  }

  buttonNumericClick(number: any) {
      this.operationsValue += '' + number;
      this.calc();
  }

  buttonCalcClick(operationCalc: any) {
      if (this.isLastOperationCalc()) {
          this.operationsValue = this.operationsValue.substr(0, this.operationsValue.length - 1);
      }
      this.operationsValue += operationCalc;
  }

  buttonClearClick() {
      this.operationsValue = this.operationsValue.substr(0, this.operationsValue.length - 1);
      this.calc();
  }

  isLastOperationCalc() {
      if (this.operationsValue.length === 0) {
          return false;
      }
      const lastElemet = this.operationsValue.substr(this.operationsValue.length - 1);
      return this.operations.indexOf(lastElemet) >= 0;
  }

  hasOperationCalc() {
      if (this.operationsValue.length === 0) {
          return false;
      }
      return this.operations.some(operation => this.operationsValue.indexOf(operation) >= 0);
  }

  calc() {
      if (this.isLastOperationCalc() || !this.hasOperationCalc()) {
          return;
      }

      let expression = this.operationsValue;
      expression = this.replaceAll(expression, 'x', '*');
      expression = this.replaceAll(expression, '÷', '/');

      this.result = eval(expression);
  }

      replaceAll(target: any, search: any, replacement: any) {
      return target.replace(new RegExp(search, 'g'), replacement);
  }



}
