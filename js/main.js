

'use strict';

let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    depositCheck = document.querySelector('#deposit-check'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value'),
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpenses = document.querySelector('.additional_expenses'),
    periodSelect = document.querySelector('.period-select'),
    additinonalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    incomeItems = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.period-amount');

let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    expensesMonth: 0,
    deposit: false,
    percentDeposit: 0,
    period: 3,
    check: function () { 
      if (salaryAmount.value !== ''){
        start.removeAttribute('disabled');
      }
     },
    start: function() {
      if (salaryAmount.value === '') {
          start.setAttribute('disabled', 'true');
          return;
      }
      let allInput = document.querySelectorAll('.data input[type = text]');
          allInput.forEach(function (item) { 
            item.setAttribute('disabled', 'true');
      });

      expensesPlus.setAttribute('disabled', 'true');
      incomePlus.setAttribute('disabled', 'true');
      start.style.display = 'none';
      cancel.style.display = 'block';


      this.budget = +salaryAmount.value;

      this.getExpenses();
      this.getIncome();
      this.getExpensesMonth();
      this.getAddExpenses();
      this.getAddIncome();
      this.getBudget();  
      this.getInfoDeposit();
      this.getStatusIncome();
      this.showResult();
    },
    showResult: function () {
      budgetMonthValue.value = this.budgetMonth;
      budgetDayValue.value = this.budgetDay;
      expensesMonthValue.value = this.expensesMonth;
      additionalExpensesValue.value = this.addExpenses.join(', ');
      additionalIncomeValue.value = this.addIncome.join(', ');
      targetMonthValue.value = Math.ceil(this.getTargetMonth());
      incomePeriodValue.value = this.calcPeriod();
      periodSelect.addEventListener('change', function () { 
        incomePeriodValue.value = this.calcPeriod();
      });
    },
    addExpensesBlock: function() {
      let cloneExpensesItem = expensesItems[0].cloneNode(true);
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
      expensesItems = document.querySelectorAll('.expenses-items');

      if (expensesItems.length === 3) {
        expensesPlus.style.display = 'none';
      }
    },
    getExpenses: function() { 
      expensesItems.forEach(function(item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
          appData.expenses[itemExpenses] = cashExpenses;
        }
      });
     },
    addIncomeBlock: function() {
      let cloneIncomeItem = incomeItems[0].cloneNode(true);
      incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
      incomeItems = document.querySelectorAll('.income-items');

      if (incomeItems.length === 3) {
        incomePlus.style.display = 'none';
      }
    },
     getIncome: function () {
       incomeItems.forEach(function(item){
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
       
        if (itemIncome !== '' && cashIncome !== '') {
          appData.income[itemIncome] = cashIncome;
        }
      });
      for (let key in this.income) {
        this.incomeMonth += +this.income[key];
      }
      },
     getAddExpenses: function () {
        let addExpenses = additinonalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== '') {
              appData.addExpenses.push(item);
            }
        });
     },
    getAddIncome: function () { 
      additionalIncomeItem.forEach(function (item) { 
        let itemValue = item.value.trim();
        if (itemValue !=='') {
          appData.addIncome.push(itemValue);
        }
       });
     
    },
    getExpensesMonth: function() {
      for (let key in appData.expenses) {
        appData.expensesMonth += +appData.expenses[key];
      }
    },
    getBudget: function(){
      this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
      this.budgetDay = Math.floor(this.budgetMonth / 30);
    },
    getInfoDeposit: function(){
      if (this.deposit) {
        do {
          this.percentDeposit = prompt('Процент?');
        }
        while (isNaN(this.percentDeposit) || this.percentDeposit === '' || this.percentDeposit === null);
        do {
          this.moneDeposit = prompt('сумма?');

        }
        while (isNaN(this.moneDeposit) || this.moneDeposit === '' || this.moneDeposit === null);
      }
    },
    
    
    getTargetMonth: function(){
      return targetAmount.value / this.budgetMonth;
    },
    getStatusIncome: function(){
      if (this.budgetDay >= 800) {
        return ('Высокий уровень дохода');
      }
      else if (this.budgetDay >= 300 && this.budgetDay < 800){
        return ('Средний уровень дохода');
      }
      else if(this.budgetDay >= 0 && this.budgetDay < 300){
        return ('Низкий уровень дохода');
      }
      else {
        return('Вы что то делаете не так в своей жизни');
      }
    },
    calcPeriod: function () {
      return this.budgetMonth * periodSelect.value;
    },
    reset: function() {
      let inputTextData = document.querySelectorAll('.data input[type = text]'),
          resultInputAll = document.querySelectorAll('.result input[type = text]');

      inputTextData.forEach(function(elem) {
        elem.value = '';
        elem.removeAttribute('disabled');
        periodSelect.value = '0';
        periodAmount.innerHTML = periodSelect.value;
      });
      resultInputAll.forEach(function (elem) { 
        elem.value = '';
       });

       for (let i = 1; i < incomeItems.length; i++) {
         incomeItems[i].parentNode.removeChild(incomeItems[i]);
         incomePlus.style.display = 'block';
       }
       for (let i = 1; i < expensesItems.length; i++) {
         expensesItems[i].parentNode.removeChild(expensesItems[i]);
         expensesPlus.style.display = 'block';

       }

       this.budget = 0;
       this.budgetDay = 0;
       this.budgetMonth = 0;
       this.income = {};
       this.incomeMonth = 0;
       this.addIncome = [];
       this.expenses = {};
       this.expensesMonth = 0;
       this.deposit = false;
       this.percentDeposit = 0;
       this.moneDeposit = 0;
       this.addExpenses = [];

       cancel.style.display = 'none';
       start.style.display = 'block';
       expensesPlus.removeAttribute('disabled');
       incomePlus.removeAttribute('disabled');
       depositCheck.checked = false;
    },


    
  };


start.addEventListener('click', appData.start.bind(appData));
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
salaryAmount.addEventListener('keyup', appData.check);
cancel.addEventListener('click', appData.reset.bind(appData));

periodSelect.addEventListener('change', function (event) {
  periodAmount.innerHTML = periodSelect.value;
});



let addExp = [];
for (let i = 0; i < appData.addExpenses.length; i ++) {
  let element = appData.addExpenses[i].trim();
  element = element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();

  addExp.push(element);
}



   


