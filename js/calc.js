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

const DOM = {
  listAll() {
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
  },

  incomes() {
    document.querySelectorAll("#data-table tbody tr td").forEach((item) => {
      if (item.classList == "income") {
        let value = item.innerHTML;
        let data = format.getValue(value);

        totalIncome += Number(data);

        cards.card_income.innerHTML = `R$ ${format.showValue(totalIncome)}`;
      }
    });
  },

  expenses() {
    document.querySelectorAll("#data-table tbody tr td").forEach((item) => {
      if (item.classList == "expense") {
        let value = item.innerHTML;
        let data = format.getValue(value);

        totalExpense += Number(data);

        cards.card_expense.innerHTML = `R$ ${format.showValue(totalExpense)}`;
      }
    });
  },

  total() {
    let total = totalIncome - format.showValueTotal(totalExpense);

    cards.card_total.innerHTML = `R$ ${total}`;

  },

  clearTransactions() {
    totalIncome = 0;
    totalExpense = 0;

    document.querySelector("#data-table tbody").innerHTML = "";
  },

  addTransaction(transaction) {
    transactionList.push(transaction);

    reload();
  },

  removeTransaction(index) {
    transactionList.splice(index, 1);

    reload();
  }
}

const Form = {
  description: document.querySelector("input#description"),
  amount: document.querySelector("input#amount"),
  date: document.querySelector("input#date"),

  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value
    }
  },

  validateFields() {
    const { amount, date, description } = Form.getValues();

    if (description.trim() === "" || amount.trim() === "" || date.trim === "") {
      throw new Error("Preencha todos os campos")
    }
  },

  formatValues() {
    let { amount, date, description } = Form.getValues();

    amount = format.amount(amount);

    date = format.date(date);

    return {
      description,
      amount,
      date
    }
  },

  clearFields() {
    Form.description.value = "";
    Form.amount.value = "";
    Form.date.value = "";
  },

  createTransaction(event) {
    // Evitar que faça o comportamento padrão que é 'enviar' o formulário
    event.preventDefault();

    try {
      // Verificar se todos os campos estão preenchidos
      Form.validateFields();

      // Formatar os dados para salvar
      const transaction = Form.formatValues();

      // Salvar os dados
      DOM.addTransaction(transaction);

      // Resetar o formulário
      Form.clearFields();

      // Fechar o Modal
      modal.classList.remove("on");
    } catch (error) {
      alert(error.message);
    }
  }
}

function init() {
  DOM.listAll();

  DOM.incomes();
  DOM.expenses();
  DOM.total();
}

function reload() {
  DOM.clearTransactions();
  init();
}

init();
