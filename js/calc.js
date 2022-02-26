import utils from "./utils.js";

let totalIncome = 0;
let totalExpense = 0;

const transactionList = [
  {
    id: "1",
    description: "Internet",
    amount: -500,
    date: "26/02/2022"
  },
  {
    id: "2",
    description: "WebSite",
    amount: 2000,
    date: "26/02/2022"
  },
  {
    id: "3",
    description: "WebSite KDC Automóveis",
    amount: 2000,
    date: "26/02/2022"
  }
];

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
      let data = utils.format.getValue(value);

      totalIncome += Number(data);

      document.getElementById("card_income").innerHTML = `R$ ${utils.format.showValue(totalIncome)}`;
    }
  });
}

function expenses() {
  document.querySelectorAll("#data-table tbody tr td").forEach((item) => {
    if (item.classList == "expense") {
      let value = item.innerHTML;
      let data = utils.format.getValue(value);

      totalExpense += Number(data);

      document.getElementById("card_expense").innerHTML = `R$ ${utils.format.showValue(totalExpense)}`;
    }
  });
}

function total() {
  let total = totalIncome - utils.format.showValueTotal(totalExpense);

  document.getElementById("card_total").innerHTML = `R$ ${total}`;

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
  id: "4",
  description: "add new",
  amount: 2000,
  date: "26/02/2022"
});

