import Vue from '../vendor/vue.esm.browser.js';
import {
  primaryNumberMales,
  primaryNumberFemales,
  secondNumberMales,
  secondNumberFemales,
  thirdNumberArray,
} from './data.js';

export default new Vue({
  el: '#app',
  beforeCreate() {
    if (localStorage.triesLeft === undefined) {
      localStorage.triesLeft = this.$options.allowedGoes;
    }
  },
  data() {
    return {
      get goesLeft() {
        return Number(localStorage.getItem('triesLeft') || 0);
      },
      set goesLeft(value) {
        localStorage.setItem('triesLeft', value);
      },
      gender: 'Male',
      dateOfBirth: null,
      naturalExpressionYearOfBirth: null,
      primaryNumber: null,
      typeOfExpression: null,
      secondNumber: null,
      duality: null,
      complexity: null,
      thirdNumber: null,
      text: null,
    };
  },
  allowedGoes: 44,
  computed: {
    year() {
      return new Date(this.dateOfBirth).getFullYear();
    },
    month() {
      return new Date(this.dateOfBirth).getMonth();
    },
    day() {
      return new Date(this.dateOfBirth).getDate();
    },
  },
  methods: {
    toggleGender() {
      if (this.gender === 'Male') {
        this.gender = 'Female';
      } else if (this.gender === 'Female') {
        this.gender = 'Male';
      }
    },
    calculate() {
      this.goesLeft -= 1;
      this.naturalExpressionYearOfBirth = this.calcNaturalExpressionYearOfBirth(
        this.year,
      );
      Object.assign(
        this,
        this.findPrimaryAndType(this.naturalExpressionYearOfBirth, this.gender),
      );
      this.secondNumber = this.findSecondaryNumber(
        this.primaryNumber,
        this.gender,
        this.month,
      );
      Object.assign(
        this,
        this.findDualityAndComplexity(this.primaryNumber, this.gender),
      );

      Object.assign(
        this,
        this.findThirdNumberAndText(this.secondNumber, this.primaryNumber),
      );
    },
    calcNaturalExpressionYearOfBirth(yearOfBirth) {
      let NEYearOfBirth = yearOfBirth;
      NEYearOfBirth -= 1;
      return this.month === 0 || (this.month === 1 && this.day < 4)
        ? NEYearOfBirth
        : yearOfBirth;
    },
    findPrimaryAndType(naturalExpressionYearOfBirth, gender) {
      const includesYearOfBirth = element =>
        element.year.includes(naturalExpressionYearOfBirth);
      return gender === 'Female'
        ? {
            primaryNumber: (
              primaryNumberFemales.find(includesYearOfBirth) || {}
            ).number,
            typeOfExpression: (
              primaryNumberFemales.find(includesYearOfBirth) || {}
            ).name,
          }
        : {
            primaryNumber: (primaryNumberMales.find(includesYearOfBirth) || {})
              .number,
            typeOfExpression: (
              primaryNumberMales.find(includesYearOfBirth) || {}
            ).name,
          };
    },
    findSecondaryNumber(primaryNumber, gender, monthOfBirth) {
      const includesPrimaryNumber = element =>
        element.primary.includes(primaryNumber);
      const listOfSecondaryNumbers =
        gender === 'Female'
          ? (secondNumberFemales.find(includesPrimaryNumber) || {}).secondary
          : (secondNumberMales.find(includesPrimaryNumber) || {}).secondary;
      let monthIndex = monthOfBirth - 1;
      if (monthIndex < 0) {
        monthIndex = listOfSecondaryNumbers.length - 1;
      }
      return listOfSecondaryNumbers[monthIndex];
    },
    findDualityAndComplexity(primaryNumber, gender) {
      const isPrimaryNumber = element => element.number === primaryNumber;
      return gender === 'Female'
        ? {
            duality: (primaryNumberFemales.find(isPrimaryNumber) || {}).duality,
            complexity: (primaryNumberFemales.find(isPrimaryNumber) || {})
              .complexity,
          }
        : {
            duality: (primaryNumberMales.find(isPrimaryNumber) || {}).duality,
            complexity: (primaryNumberMales.find(isPrimaryNumber) || {})
              .complexity,
          };
    },
    findThirdNumberAndText(secondNumber, primaryNumber) {
      let secondNumberIndex = secondNumber;
      let primaryNumberIndex = primaryNumber;
      secondNumberIndex -= 1;
      primaryNumberIndex -= 1;
      const thirdNumberIndex = 2;
      const textIndex = 3;
      return {
        thirdNumber:
          thirdNumberArray[secondNumberIndex][primaryNumberIndex][
            thirdNumberIndex
          ],
        text:
          thirdNumberArray[secondNumberIndex][primaryNumberIndex][textIndex],
      };
    },
  },
});
