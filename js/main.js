

let btn = [...document.querySelectorAll('button')];
btn.pop();
btn.forEach(function(item){
    item.disabled = true;
});

let startBtn = document.getElementById("start"),
    budgetValue = document.getElementsByClassName("budget-value") [0],
    daybudgetValue = document.getElementsByClassName("daybudget-value") [0],
    levelValue = document.getElementsByClassName("level-value") [0],
    expensesValue = document.getElementsByClassName("expenses-value") [0],
    optionalExpensesValue = document.getElementsByClassName("optionalexpenses-value") [0],
    incomeValue = document.getElementsByClassName("income-value") [0],
    monthsavingsValue = document.getElementsByClassName("monthsavings-value") [0],
    yearsavingsValue = document.getElementsByClassName("yearsavings-value") [0];

let expensesItem = document.getElementsByClassName("expenses-item"),
    expensesBtn = document.getElementsByTagName("button") [0],
    optionalExpensesBtn = document.getElementsByTagName("button") [1],
    budgetCountBtn = document.getElementsByTagName("button") [2],
    optionalExpensesItem = document.querySelectorAll(".optionalexpenses-item"),
    incomeItem = document.querySelector(".choose-income"),
    checkSavings = document.querySelector("#savings"),
    sumValue = document.querySelector("#sum"),
    percentValue = document.querySelector("#percent"),
    yearValue = document.querySelector(".year-value"),
    monthValue = document.querySelector(".month-value"),
    dayValue = document.querySelector(".day-value");
let money, time;

startBtn.addEventListener("click", function(){
    time = prompt("Enter the date in the format YYYY-MM-DD", "2020-11-27");
    money = +prompt("Your budget for the month?", "60000");

    while(isNaN(money) || money == "" || money == null){
        money = +prompt("Your budget for the month?", "60000");
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDay();
    btn.forEach(function(item){
        item.disabled = false;
    });


});

expensesBtn.addEventListener('click', function(){
    sumOfExpenses = 0;
    for(let i = 0; i < expensesItem.length; i++)
    {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;
        if(typeof(a) === 'string' && typeof(a) != null && typeof(b) != null && a != "" && b != "" 
            && a.length < 50 && b != NaN && b >0){
            appData.expenses[a] = b;
            sumOfExpenses += +b;
        }else{
            i--;
        }  
    }
    expensesValue.textContent = sumOfExpenses;
});

optionalExpensesBtn.addEventListener('click', function(){
    for(let i = 0; i < optionalExpensesItem.length; i++)
    {
        let opt = optionalExpensesItem[i].value;
        appData.optionalEXpenses[i] = opt;
        optionalExpensesValue.textContent += appData.optionalEXpenses[i] + " "; 
    }
});

budgetCountBtn.addEventListener('click', function(){
    
    if(appData.budget != undefined){
        appData.BudgetPerDay = ((appData.budget / 30) - (sumOfExpenses / 30)).toFixed();
        daybudgetValue.textContent = appData.BudgetPerDay;

        if(appData.BudgetPerDay < 100){
            levelValue.textContent = "Minimum level of income";
        }else if(appData.BudgetPerDay > 100 && appData.BudgetPerDay < 200){
            levelValue.textContent = "Middle level of income";
        }else if(appData.BudgetPerDay > 200){
            levelValue.textContent = "High level of income";
        }else{
            levelValue.textContent = "An error occurred";
        }
    }else{
        daybudgetValue.textContent = "An error occurred";
    }
});

incomeItem.addEventListener('input', function(){
    appData.income =  incomeItem.value.split(",");
    incomeValue.textContent = incomeItem.value;
});

checkSavings.addEventListener('click', function(){
    if(appData.savings == true){
        appData.savings = false;
    }else{
        appData.savings = true;
    }
});

sumValue.addEventListener('input', function(){
    if(appData.savings == true){
        let sum = +sumValue.value,
            percent = +percentValue.value;
        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome =  sum / 100 * percent;
        monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearsavingsValue.textContent  = appData.yearIncome.toFixed(1);
    }
});
percentValue.addEventListener('input', function(){
    if(appData.savings == true){
        let sum = +sumValue.value,
            percent = +percentValue.value;
        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome =  sum / 100 * percent;
        monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearsavingsValue.textContent  = appData.yearIncome.toFixed(1);
    }
});
let appData = {
    budget: money,
    expenses: {},
    optionalEXpenses: {},
    income: [],
    timeData: time,
    savings: false
};

