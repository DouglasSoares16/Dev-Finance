// import utils from "./js";

let totalIncome = 0;
let totalExpense = 0;

let cards = {
  card_income: document.getElementById("card_income"),
  card_expense: document.getElementById("card_expense"),
  card_total: document.getElementById("card_total"),
};

const transactionList = [
  {
    description: "Internet",
    amount: -500,
    date: "26/02/2022"
  },
  {
    description: "WebSite",
    amount: 2000,
    date: "26/02/2022"
  },
  {
    description: "WebSite KDC Automóveis",
    amount: 2000,
    date: "26/02/2022"
  }
];

const format = {
  getValue(value) {
    return value.replace("R$", "").replace(",", ".");
  },

  showValue(value) {
    return value.toFixed(2).replace(".", ",")
  },

  showValueTotal(value) {
    return Number(value.toString().replace("-", ""))
  }
};

function listAll() {
  transactionList.forEach((item) => {
    let search = item.amount.toString().includes("-");

    const type = search ? "expense" : "income";

    document.querySelector("#data-table tbody").innerHTML += `
      <tr>
        <td class="description">${item.description}</td>
        <td class=${type}>R$ ${item.amount.toFixed(2).replace(".", ",")}</td>
        <td class="date">${item.date}</td>
        <td>
          <img src="./assets/minus.svg" alt="Remover Transação">
        </td>
      </tr>
    `;
  });
}

function incomes() {
  document.querySelectorAll("#data-table tbody tr td").forEach((item) => {
    if (item.classList == "income") {
      let value = item.innerHTML;
      let data = format.getValue(value);

      totalIncome += Number(data);

      cards.card_income.innerHTML = `R$ ${format.showValue(totalIncome)}`;
    }
  });
}

function expenses() {
  document.querySelectorAll("#data-table tbody tr td").forEach((item) => {
    if (item.classList == "expense") {
      let value = item.innerHTML;
      let data = format.getValue(value);

      totalExpense += Number(data);

      cards.card_expense.innerHTML = `R$ ${format.showValue(totalExpense)}`;
    }
  });
}

function total() {
  let total = totalIncome - format.showValueTotal(totalExpense);

  cards.card_total.innerHTML = `R$ ${total}`;

}

function clearTransactions() {
  totalIncome = 0;
  totalExpense = 0;

  document.querySelector("#data-table tbody").innerHTML = "";
}

function addTransaction(transaction) {
  transactionList.push(transaction);

  reload();
}

function init() {
  listAll();

  incomes();
  expenses();
  total();
}

function reload() {
  clearTransactions();
  init();
}

init();

addTransaction({
  description: "add new",
  amount: 2000,
  date: "26/02/2022"
});

