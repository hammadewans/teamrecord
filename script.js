// Disable right-click context menu
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});

// Disable specific keyboard shortcuts for inspect tools
document.addEventListener('keydown', function (e) {
  // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
  if (
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) ||
      (e.ctrlKey && e.key === "U")
  ) {
      e.preventDefault();
  }
});






class AmountTracker {
    constructor() {
      this.transactions = [];
    }

    addTransaction(type, amount, remark, date) {
      const transactionDate = date || new Date().toLocaleString(); // Use provided date or default to current date
      const transaction = { type, amount, remark, date: transactionDate };
      this.transactions.push(transaction);
      return transaction;
    }

    getTransactions() {
      return this.transactions;
    }
  }

  class User {
    constructor(name, password, initialAmount) {
      this.name = name;
      this.password = password;
      this.depositAmount = initialAmount; 
      this.transactionAmount = 0; 
      this.amountTracker = new AmountTracker();
    }

    increaseAmount(value, remark = "No remark", date) {
      if (value > 0) {
        this.transactionAmount += value;
        this.amountTracker.addTransaction("increase", value, remark, date); // Pass date manually
      }
    }

    decreaseAmount(value, remark = "No remark", date) {
      if (value > 0 && this.transactionAmount >= value) {
        this.transactionAmount -= value;
        this.amountTracker.addTransaction("decrease", value, remark, date); // Pass date manually
      } else {
        alert("Insufficient funds for this decrease transaction.");
      }
    }

    getTransactionHistory() {
      return this.amountTracker.getTransactions();
    }

    getTotalAmount() {
      return this.depositAmount + this.transactionAmount;
    }
  }

  // Sample users data
  const users = [
    new User("Mohammad", "Sajjad2010@", 400000),
  ];

  let currentUser = null;

  // Function to log in user by name and password
  function loginUser() {
    const loginName = document.getElementById("loginName").value.trim();
    const loginPassword = document.getElementById("loginPassword").value.trim() ;

    currentUser = users.find(user => user.name === loginName && user.password === loginPassword);

    if (currentUser) {
      displayUserInfo();
      displayTransactionHistory();
    } else {
      alert("Invalid login credentials.");
      clearUserInfo();
    }
  }

  // Display user info (name, deposit amount, transaction amount, and total balance)
  function displayUserInfo() {
    document.getElementById("userName").textContent = 'User Name:'  + currentUser.name;
    document.getElementById("userTransaction").textContent =' In-Hand Token:'+currentUser.transactionAmount;
    document.getElementById("userDeposit").textContent = 'Deposit Token: ₹'+currentUser.depositAmount; // Display deposit amount
  }

  // Clear user info when no user is found
  function clearUserInfo() {
    document.getElementById("userName").textContent = "User Name: -";
    document.getElementById("userTransaction").textContent = "In-Hand Token: -";
    document.getElementById("userDeposit").textContent = "Deposit Token: -"; // Clear deposit amount
    document.getElementById("transactionHistory").innerHTML = "";
  }

  // Display all transactions for the user
  function displayTransactionHistory() {
    const historyContainer = document.getElementById("transactionHistory");
    historyContainer.innerHTML = "";

    currentUser.getTransactionHistory().forEach((transaction, index) => {
      const transactionDiv = document.createElement("div");
      transactionDiv.className = "transaction-item";
      transactionDiv.classList.add(transaction.type === "increase" ? "increase" : "decrease");

      transactionDiv.innerHTML = `
        <p><strong>${transaction.type.toUpperCase()}</strong>-Token: ${transaction.amount}</p>
        <p>Date: ${transaction.date}</p>
        <p>Remark: ${transaction.remark}</p>
      `;

      historyContainer.appendChild(transactionDiv);
    });
  }

  // Function to increase all users' transaction amount by 10% of their deposit amount
  function increaseAllUsersAmount(Date, Percent=10) {
    users.forEach(user => {
      const increaseAmount = user.depositAmount * Percent/100; // 10% of deposit
      user.increaseAmount(increaseAmount, Percent+"% Reward from BLD.", Date); // Pass the custom date
    });

    // Update transaction history for current user (if logged in)
    if (currentUser) {
      displayTransactionHistory();
    }
  }
  
  //User Data
  const Mohammad = users.find(user => user.name === "Mohammad");
  

  // December 2024
  increaseAllUsersAmount("2024-Dec-10");
  Mohammad.decreaseAmount(15000, "Sell Token at ₹50", "2024-Dec-15"); // Another custom date for the increase transaction
  Mohammad.increaseAmount(1000, "Buy Token at ₹50", "2024-Dec-18"); // Another custom date for the increase transaction
