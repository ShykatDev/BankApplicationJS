const firstPage = document.querySelector(".sign-page");
const adminPage = document.querySelector(".adminMain");
const userPage = document.querySelector(".userMain");

const title = document.querySelector(".title");
const pp = document.querySelector(".pp");

const loggedUser = document.querySelector(".userWhoLogin");

const adminBtn = document.querySelector(".adminBtn");
const userBtn = document.querySelector(".userBtn");

const adminLog = document.querySelector(".admin-login");
const userLog = document.querySelector(".user-login");

const adminLogBtn = document.querySelector(".admin-login-btn");
const userLogBtn = document.querySelector(".user-login-btn");

const adminUsername = document.querySelector(".admin-username");
const adminPIN = document.querySelector(".admin-pin");
const userUserName = document.querySelector(".user-username");
const userPIN = document.querySelector(".user-pin");

const error = document.querySelector(".error-message");
const cross = document.querySelector(".cross");

const allUsersTable = document.querySelector(".all-users-table");

//Details

const userDetailsUI = document.querySelector(".user-details");
const noUser = document.querySelector(".no-user");

const userAccNum = document.querySelector(".user-given-acnum");
const userSearch = document.querySelector(".u-search");
const detailuserName = document.querySelector(".user-details-name");
const detailuserAccNum = document.querySelector(".user-details-num");
const detailuserEmail = document.querySelector(".user-details-email");
const detailuserAmnt = document.querySelector(".user-details-amount");
const detailuserLoan = document.querySelector(".user-details-loan");

//User UI
const personalUser = document.querySelector(".personal-details-name");
const personalAcc = document.querySelector(".personal-details-num");
const personalPin = document.querySelector(".personal-details-pin");
const personalEmail = document.querySelector(".personal-details-email");
const personalGender = document.querySelector(".personal-details-gender");
const personalAccType = document.querySelector(".personal-details-accType");

const amountHave = document.querySelector(".have");
const amountnot = document.querySelector(".not");

const allTrans = document.querySelector(".all-tranactions");
const allLoans = document.querySelector(".all-loans");
const loanNeedAcc = document.querySelector(".loan-need-req");
const loanNeedAmnt = document.querySelector(".loan-amount-req");
const cardApplication = document.querySelector(".user-card-application");
const userCard = document.querySelector(".user-card");

const card_app_acc = document.querySelector(".card-req-acc");

const card_gen_acc = document.querySelector(".card-gen-acc");
const card_gen_num = document.querySelector(".card-gen-num");

const expMonth = document.querySelector(".expMonth");
const expYear = document.querySelector(".expYear");
const valMonth = document.querySelector(".vaMonth");
const valYear = document.querySelector(".vaYear");
const userCVV = document.querySelector(".u-cvv");

//------------------------------------------- Selectors -----------------------------------------------------------------//

//Start-------------------Compute Username----------------------Section

//Admin Username
const admin_username = function (users) {
  users.forEach((user) => {
    user.username = user.person_name
      .toLowerCase()
      .split(" ")
      .map((word) => word[0])
      .join("");

    console.log(user.username);
  });
};

admin_username(admins);

//Start------------------- Compute Account Number ----------------------Section

const accNumber = function () {
  const acc_num = Math.trunc(Math.random() * 10000);
  console.log(acc_num);
  return acc_num;
};

//Start------------------- Compute CVV Number ----------------------Section

const cvvNum = function () {
  const cvv_num = Math.trunc(Math.random() * 1000);
  console.log(cvv_num);
  return cvv_num;
};

//Start------------------- Select Gender of Admin ----------------------Section

const adminUI = function () {
  const gender = adminInfo.gender === "male" ? "MR." : "MISS.";
  title.textContent = adminInfo.title;
  loggedUser.textContent = `${gender} ${adminInfo.person_name}`;
  pp.src = `${adminInfo.pic}`;
};

//Start------------------- Mask Account Number ----------------------Section

const maskAccNumber = function (number) {
  const str = number + "";
  const last4digits = str.slice(-4);

  return last4digits.padStart(str.length, "*");
};

let accAmount, accLoan;

//Start------------------- Login Selector Events handlers ----------------------Section

adminBtn.addEventListener("click", function () {
  adminLog.style.transform = "translateX(0)";
  adminLog.style.opacity = "1";
  userLog.style.transform = "translateY(0)";
  userLog.style.opacity = "0";

  adminBtn.classList.add("btnActive");
  userBtn.classList.remove("btnActive");
});

userBtn.addEventListener("click", function () {
  adminLog.style.transform = "translateX(100%)";
  adminLog.style.opacity = "0";
  userLog.style.transform = "translateY(-100%)";
  userLog.style.opacity = "1";

  userBtn.classList.add("btnActive");
  adminBtn.classList.remove("btnActive");
});

let adminInfo, userInfoSave;

//Start---------------------------------------- Admin Login -------------------------Section
adminLogBtn.addEventListener("click", function () {
  adminInfo = admins.find((acc) => acc.username === adminUsername.value);

  if (
    adminInfo &&
    adminInfo.username === adminUsername.value &&
    adminInfo.pin === Number(adminPIN.value)
  ) {
    firstPage.style.transform = "translateY(-100vh)";
    firstPage.style.opacity = "0";

    adminPage.style.display = "block";
    adminPage.style.zIndex = "1";

    //Change admin UI
    adminUI();
  } else {
    error.style.opacity = 1;
    error.style.zIndex = "1";
  }
});

cross.addEventListener("click", function () {
  error.style.zIndex = "-1";
  error.style.opacity = "0";
});

//Start------------------- Compute Total Money ----------------------Section

const totalMoneyComp = function (e) {
  const compTotal = e.totalMoney
    .filter((dep) => dep > 0)
    .reduce((amnt, index) => amnt + index, 0);
  return compTotal;
};

//Start------------------- Compute Loan Money----------------------Section

let compLoan;
const loanMoneyComp = function (e) {
  compLoan = e.loan.reduce((amnt, index) => amnt + index, 0);

  if (compLoan >= 20000) {
    document.querySelector(
      ".no-loan"
    ).textContent = `Sorry! This account has reached enough loan ammount. Please tell him/her to pay the loan first.`;

    amountnot.textContent = `20,000 + \n Please pay the loan.`;
    userDetailsUI.style.opacity = 0;
    noUser.style.opacity = 1;
  }
  return compLoan;
};

//Start------------------- All Account Show ----------------------Section

const allAcc = function (userArr) {
  allUsersTable.innerHTML = "";
  let allAccHTML;
  userArr.forEach((userObj, i) => {
    accAmount = totalMoneyComp(userObj);

    allAccHTML = `
  <div class="user-row">
  <small class="new-user-index">${i + 1}</small>
  <small class="new-user-name">${userObj.user} [${userObj.gender}]</small>
  <small class="new-user-accNo">${userObj.email}</small>
  <small class="new-user-email">${userObj.acc}</small>
  <small class="new-user-PIN">****</small>
  <small class="new-user-amount">${accAmount} tk</small>
</div>`;
    allUsersTable.insertAdjacentHTML("beforeend", allAccHTML);
  });
};
allAcc(users);

//Start------------------- Close Account ----------------------Section

const deleteInfo = document.querySelector(".delete-info");
const closeName = document.querySelector(".close-acc-name");
const closeNum = document.querySelector(".close-acc-num");
const closePIN = document.querySelector(".close-acc-pin");
const closeCPIN = document.querySelector(".close-acc-cpin");

deleteInfo.addEventListener("click", function () {
  const deleteInfoSave = users.find((userObj) => userObj.acc == closeNum.value);

  const dleteInfoIndex = users.findIndex(
    (userObj) => userObj.acc == closeNum.value
  );

  console.log(deleteInfoSave);

  if (
    deleteInfoSave?.user == closeName.value &&
    deleteInfoSave.acc == Number(closeNum.value) &&
    deleteInfoSave.pinCode == closeCPIN.value &&
    deleteInfoSave.pinCode == closeCPIN.value
  ) {
    users.splice(dleteInfoIndex, 1);
    allAcc(users);

    closeName.value = closeNum.value = closePIN.value = closeCPIN.value = "";
    closeCPIN.blur();
  }
});

//Start------------------- Search Account on Transaction FUNCTION ----------------------Section

const user_details_section = function (e) {
  detailuserName.textContent = e.user;
  detailuserAccNum.textContent = maskAccNumber(e.acc);
  detailuserEmail.textContent = e.email;
  detailuserAmnt.textContent = e.totalMoney
    .filter((dep) => dep > 0)
    .reduce((amnt, index) => amnt + index, 0);
  detailuserLoan.textContent = e.loan.reduce((amnt, index) => amnt + index, 0);
};

//Start------------------- Search Account on Transaction ----------------------Section

let userDetails, userDetailsIndex;

userSearch.addEventListener("click", function () {
  userDetails = users.find((userObj) => userObj.acc == userAccNum.value);

  if (userDetails?.acc === Number(userAccNum.value)) {
    noUser.style.opacity = 0;
    userDetailsUI.style.opacity = 1;
    user_details_section(userDetails);
  } else {
    userDetailsUI.style.opacity = 0;
    noUser.style.opacity = 1;
  }
});

//Start------------------- Transfer Money ----------------------Section

const tranToAcc = document.querySelector(".transfer-to-acc");
const tranToAmnt = document.querySelector(".transfer-to-amnt");
const sendBtn = document.querySelector(".sendBtn");

sendBtn.addEventListener("click", function () {
  userDetails = users.find((userObj) => userObj.acc == tranToAcc.value);

  if (userDetails?.acc === Number(tranToAcc.value)) {
    userDetails.totalMoney.push(Number(tranToAmnt.value));
    totalMoneyComp(userDetails);
    allAcc(users);
    tranToAcc.value = tranToAmnt.value = "";
    tranToAmnt.blur();
  } else {
    document.querySelector(".trans-error-message").textContent =
      "No user found";
  }
});

//Start------------------- Loan Money ----------------------Section

const loanToAcc = document.querySelector(".loan-to-acc");
const loanToAmnt = document.querySelector(".loan-to-amnt");
const loanBtn = document.querySelector(".loanBtn");

loanBtn.addEventListener("click", function () {
  userDetails = users.find((userObj) => userObj.acc == loanToAcc.value);

  if (userDetails?.acc === Number(loanToAcc.value)) {
    userDetails.loan.push(Number(loanToAmnt.value));
    loanMoneyComp(userDetails);
    console.log(compLoan);
    if (compLoan >= 20000) {
      userDetails.loan.pop(Number(loanToAmnt.value));
      compLoan -= loanToAmnt.value;
      console.log(compLoan);
    }
    console.log(userDetails.loan);
    allAcc(users);

    loanToAcc = loanToAmnt = "";
    loanToAmnt.blur();
  } else {
    document.querySelector(".loan-error-message").textContent = "No user found";
  }
});

//Start------------------- Card Generate ----------------------Section

document.querySelector(".cardGenerate").addEventListener("click", function () {
  fi.textContent = accNumber();
  se.textContent = accNumber();
  tr.textContent = accNumber();
  fo.textContent = accNumber();

  const cardNum = `${fi.textContent} ${se.textContent} ${tr.textContent} ${fo.textContent}`;
  console.log(cardNum);
  card_gen_num.value = cardNum;
});

//Start------------------- Generate Card From Admin ----------------------Section

document.querySelector(".create").addEventListener("click", function () {
  const cardInfoSave = users.find(
    (user) => user.acc === Number(card_gen_acc.value)
  );
  if (cardInfoSave?.acc === Number(card_gen_acc.value)) {
    userCardGen(cardInfoSave);
  }
  card_gen_acc.value = card_gen_num.value = expMonth.value = expYear.value = "";
  expYear.blur();
});

//Start------------------- User Login ----------------------Section

userLogBtn.addEventListener("click", function () {
  userInfoSave = users.find(
    (userObj) => userObj.acc === Number(userUserName.value)
  );

  if (userInfoSave.card === false) {
    userCard.classList.add("card-hide");
    cardApplication.classList.remove("card-hide");
  }

  if (
    userInfoSave?.acc === Number(userUserName.value) &&
    userInfoSave.pinCode === Number(userPIN.value)
  ) {
    firstPage.style.transform = "translateY(-100vh)";
    firstPage.style.opacity = "0";

    userPage.style.display = "block";
    userPage.style.zIndex = "1";

    userUserName.value = userPIN.value = "";
    userPIN.blur();

    //Update Profile
    personalUser.textContent = userInfoSave.user;
    personalAcc.textContent = userInfoSave.acc;
    personalPin.textContent = userInfoSave.pinCode;
    personalEmail.textContent = userInfoSave.email;
    personalGender.textContent = userInfoSave.gender;
    personalAccType.textContent = userInfoSave.accType;

    amountHave.textContent = `${totalMoneyComp(userInfoSave)} /-`;
    amountnot.textContent = `${loanMoneyComp(userInfoSave)} /-`;

    //Transaction list
    console.log(userInfoSave.totalMoney);
    allTrans.innerHTML = "";
    userInfoSave.totalMoney.forEach(function (amnt, i) {
      const transType = amnt > 0 ? "deposit" : "withdrawl";

      const transRowHTML = `
      <div class="trans-row">
        <small class="${transType}">${i + 1} ${transType}</small>
        <small class="transAmntTo">${userInfoSave.acc}</small>
        <h3 class="trans-amnt-part">${Math.abs(amnt)} tk</h3>
      </div`;

      allTrans.insertAdjacentHTML("afterbegin", transRowHTML);
    });

    document
      .querySelector(".apply-card")
      .addEventListener("click", function () {
        cardApplication.innerHTML = "Application Sent Successfully!";
      });
  } else {
    error.style.opacity = 1;
    error.style.zIndex = "1";
  }
});

//Start------------------- Generate User Card ----------------------Section

const fi = document.querySelector(".fi");
const se = document.querySelector(".s");
const tr = document.querySelector(".t");
const fo = document.querySelector(".fo");

//Start------------------- Card Generate FUNCTON ----------------------Section

const userCardGen = function (e) {
  if (e.acc === Number(card_gen_acc.value)) {
    e.card = true;
    if (e.card === true) {
      userCard.classList.remove("card-hide");
      cardApplication.classList.add("card-hide");

      valMonth.textContent = expMonth.value;
      valYear.textContent = expYear.value;

      userCVV.textContent = cvvNum();
    } else {
      e.card = false;
    }
  } else {
    console.log("wrong");
  }
};

//Start------------------- User Menu Toogle ----------------------Section

const tog = document.querySelector(".toggler");
const side = document.querySelector(".sideMenu");

tog.addEventListener("click", function () {
  side.classList.toggle("sideshow");
});
