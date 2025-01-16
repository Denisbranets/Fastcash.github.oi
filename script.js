let investment = 3.00; // Початковий інвестиційний баланс
let income = parseFloat(localStorage.getItem("userIncome")) || 0.000000; // Завантаження доходу з localStorage
let reinvestCount = 0; // Лічильник реінвестицій
let totalProjectBalance = 3.00; // Баланс проекту

// Елементи
const userInvestment = document.getElementById("user-investment");
const userIncome = document.getElementById("user-income");
const projectBalanceEl = document.getElementById("project-balance");

// Відображення збереженого доходу
userIncome.textContent = income.toFixed(6);

// Депозит
document.getElementById("deposit-button").addEventListener("click", () => {
    document.getElementById("deposit-modal").classList.remove("hidden");
    document.getElementById("overlay").classList.remove("hidden");
});

document.getElementById("confirm-deposit").addEventListener("click", () => {
    const amount = parseFloat(document.getElementById("deposit-amount").value);
    if (isNaN(amount) || amount <= 0) {
        alert("Введіть коректну суму для депозиту!");
        return;
    }
    alert(`Заявка на депозит ${amount.toFixed(2)}$ створена!`);
    document.getElementById("deposit-modal").classList.add("hidden");
    document.getElementById("overlay").classList.add("hidden");
});

document.getElementById("close-deposit").addEventListener("click", () => {
    document.getElementById("deposit-modal").classList.add("hidden");
    document.getElementById("overlay").classList.add("hidden");
});

// Виведення
document.getElementById("withdraw-button").addEventListener("click", () => {
    document.getElementById("withdraw-modal").classList.remove("hidden");
    document.getElementById("overlay").classList.remove("hidden");
});

document.getElementById("confirm-withdraw").addEventListener("click", () => {
    const amount = parseFloat(document.getElementById("withdraw-amount").value);
    const wallet = document.getElementById("wallet-address").value.trim();
    if (isNaN(amount) || amount < 1 || wallet === "") {
        alert("Введіть коректну суму для виведення і адресу гаманця!");
        return;
    }
    if (amount > income) {
        alert("Недостатньо коштів для виведення!");
        return;
    }
    income -= amount;
    userIncome.textContent = income.toFixed(6);
    localStorage.setItem("userIncome", income.toFixed(6)); // Збереження оновленого доходу
    alert(`Запит на виведення ${amount.toFixed(2)}$ створено!`);
    document.getElementById("withdraw-modal").classList.add("hidden");
    document.getElementById("overlay").classList.add("hidden");
});

document.getElementById("close-withdraw").addEventListener("click", () => {
    document.getElementById("withdraw-modal").classList.add("hidden");
    document.getElementById("overlay").classList.add("hidden");
});

// Автоматичний дохід
setInterval(() => {
    income += investment * 0.02 / 86400; // Дохід: 2% на добу, оновлення щосекунди
    userIncome.textContent = income.toFixed(6);
    localStorage.setItem("userIncome", income.toFixed(6)); // Збереження доходу в localStorage
}, 1000);

// Калькулятор доходу
document.getElementById("calc-amount").addEventListener("input", () => {
    const amount = parseFloat(document.getElementById("calc-amount").value) || 0;
    document.getElementById("daily-income").textContent = (amount * 0.02).toFixed(6);
    document.getElementById("weekly-income").textContent = (amount * 0.14).toFixed(6);
    document.getElementById("monthly-income").textContent = (amount * 0.60).toFixed(6);
});
