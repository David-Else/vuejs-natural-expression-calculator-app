import Vue from '../node_modules/vue/dist/vue.esm.browser.js';
import {
  primaryNumberMales,
  primaryNumberFemales,
  secondNumberMales,
  secondNumberFemales,
  thirdNumberArray,
} from './data.js';

Vue.component('results-box', {
  template: '#results',
});

// eslint-disable-next-line no-unused-vars
export default new Vue({
  el: '#app',
  beforeCreate() {
    if (localStorage.triesLeft === undefined) {
      localStorage.triesLeft = this.$options.allowedGoes;
    }
  },
  data() {
    return {
      get goesleft() {
        return localStorage.getItem('triesLeft') || 0;
      },
      set goesleft(value) {
        localStorage.setItem('triesLeft', value);
      },
      // Also, localStorage seems to convert ints to strings so I needed to run return
      // parseInt(localStorage.getItem('userSessionIndex') || 0) for it to work.
      // Others may or may not run into this problem
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
  allowedGoes: 4,
  computed: {
    year() {
      // if (!this.dateOfBirth) return null
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
      // localStorage.triesLeft = Number(localStorage.triesLeft) - 1;
      localStorage.triesLeft = Number(localStorage.triesLeft) - 1;

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
      return gender === 'F'
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
        gender === 'F'
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
      return gender === 'F'
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
