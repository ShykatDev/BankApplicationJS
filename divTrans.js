const logout = document.querySelector(".logout");

const closeAcc = document.querySelector(".closeAcc");
const trans = document.querySelector(".trans");
const cardGen = document.querySelector(".cardGen");
const allAccounts = document.querySelector(".allAccounts");

const forClose = document.querySelector(".forClose");
const forTrans = document.querySelector(".forTrans");
const forCard = document.querySelector(".forCard");
const forAllAcnt = document.querySelector(".forAllAcnt");

const menuItem1 = document.querySelector(".menui1");
const menuItem3 = document.querySelector(".menui3");
const menuItem4 = document.querySelector(".menui4");
const menuItem5 = document.querySelector(".menui5");

const cbx1 = document.querySelector(".cbx1");
const cbx3 = document.querySelector(".cbx3");
const cbx4 = document.querySelector(".cbx4");

//Start------------------- Selectors ----------------------Section

//Start------------------- Add & Remove classes ----------------------Section

const addRmv = function (curr, ...others) {
  curr.classList.add("activeMenu");
  for (const oth of others) {
    oth.classList.remove("activeMenu");
  }
};

const addRmv2 = function (curr, ...others) {
  curr.classList.add("activeSideMenu");
  for (const oth of others) {
    oth.classList.remove("activeSideMenu");
  }
};

//Start------------------- Translate Divs ----------------------Section

const transDiv = function (curr, ...others) {
  curr.style.transform = "translateX(0)";
  for (const oth of others) {
    oth.style.transform = "translateX(100%)";
  }
};

//Start------------------- Event Handlers Admin Pannel ----------------------Section

closeAcc.addEventListener("click", function () {
  addRmv(closeAcc, trans, cardGen, allAccounts);
  transDiv(forClose, forTrans, forCard, forAllAcnt);
});
trans.addEventListener("click", function () {
  addRmv(trans, closeAcc, cardGen, allAccounts);
  transDiv(forTrans, forClose, forCard, forAllAcnt);
});
cardGen.addEventListener("click", function () {
  addRmv(cardGen, closeAcc, trans, allAccounts);
  transDiv(forCard, forClose, forTrans, forAllAcnt);
});
allAccounts.addEventListener("click", function () {
  addRmv(allAccounts, cardGen, closeAcc, trans);
  transDiv(forAllAcnt, forClose, forTrans, forCard);
});

//Start------------------- Event Handlers User Pannel ----------------------Section

menuItem1.addEventListener("click", function () {
  addRmv2(menuItem1, menuItem3, menuItem4, menuItem5);
  transDiv(cbx1, cbx3, cbx4);
});

menuItem3.addEventListener("click", function () {
  addRmv2(menuItem3, menuItem1, menuItem4, menuItem5);
  transDiv(cbx3, cbx1, cbx4);
});

menuItem4.addEventListener("click", function () {
  addRmv2(menuItem4, menuItem1, menuItem3, menuItem5);
  transDiv(cbx4, cbx1, cbx3);
});

menuItem5.addEventListener("click", function () {
  addRmv2(menuItem5, menuItem1, menuItem3, menuItem4);
});

//Start------------------- Admin Logout ----------------------Section

logout.addEventListener("click", function () {
  firstPage.style.transform = "translateY(0)";
  firstPage.style.opacity = "1";

  adminPage.style.display = "none";
  adminPage.style.zIndex = "-1";

  adminUsername.value = adminPIN.value = "";

  adminUsername.blur();
  adminPIN.blur();

  addRmv(allAccounts, cardGen, closeAcc, trans);
  transDiv(forAllAcnt, forClose, forTrans, forCard);
});

//Start------------------- User Logout ----------------------Section

const userlogOut = document.querySelector(".userLogout");

userlogOut.addEventListener("click", function () {
  firstPage.style.transform = "translateY(0vh)";
  firstPage.style.opacity = "1";

  userPage.style.display = "none";
  userPage.style.zIndex = "0";

  addRmv2(menuItem1, menuItem3, menuItem4, menuItem5);
  transDiv(cbx1, cbx3, cbx4);

  cardApplication.innerHTML = `
  <p>Dear Sir/Mam,</p>
  <p>Application for account card genarate.</p>
  <br>
  <p>Hi, I am a user of your E do Bank. I haven't got my debit card/master card/credit card yet. But now I need the card for online transactions and other purposes. So I request you to give me my desire card as soon as possible.</p><br>
  <p class="application-note">Notes:</p>
  <p>
  <ul>
    <li>I will not share my PIN anyone.</li>
    <li>I will not able to withdrawl more than 50,000/- per day.</li>
    <li>I can change any information to call 19975.</li>
  </ul>
  </p>
  <br>
  <p>Thank you.</p>
  <br><br>
  <button class="apply-card">apply</button>`;
});
