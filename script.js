class DappUser {
    constructor(Name, StakeBLV2) {
        this.Name = Name;
        this.StakeBLV2 = StakeBLV2;
        this.MyBLD = 0;
        this.Transaction = [];
    }
    DepositeBLD(Amount, Date){
        this.MyBLD += Amount;
        let array = {type: 'Deposite', amt: Amount, remark: 'Reward BLD from Dapp account.', date: Date}
        this.Transaction.push(array);
    }
    WithdrawalBLD(Amount, Date){
        this.MyBLD -= Amount;
        let array = {type: 'Withdrawal', amt: Amount, remark: 'Sell BLD from your account.',date: Date}
        this.Transaction.push(array);
    }
}

// Create Object Into Arr
const AllDappUser = {
    Ahsan: new DappUser('Ahsan', 66592),
    Dr_Irshad: new DappUser('Irshad', 109),
    Dr_Raju: new DappUser('Raju', 398),
    Farooq_Bhai_Loni: new DappUser('Farooq', 4122),
    Haroon_Premnagar: new DappUser('Haroon', 113),
    M_Aas_Mohammad: new DappUser('Aas Mohammad', 5000),
    M_Aarif: new DappUser('Aarif', 3600+4000),
    M_Masoom: new DappUser('Masoom', 13103),
    M_Sabir: new DappUser('Sabir', 10896),
    Naseem_Bhai_BLV: new DappUser('Naseem', 5000),
    Imtiyaz_Bhai_Pooja: new DappUser('Imtiyaz', 27989),
    Rahees_Burger: new DappUser('Rahees', 9159),
    Shahid_Saharanpur: new DappUser('Shahid', 13301),
    Tasleem_Saharanpur: new DappUser('Tasleem', 5000),
    Sahlu: new DappUser('Shalu', 15168),
    Vaseem_Roll: new DappUser('Vaseem', 13744),
    Abdul_Qadir_Loni: new DappUser('Abdul Qadir', 13342+5287),
    M_Salman_Bhensaheri: new DappUser('Salman', 6072),
    Billu: new DappUser('Billu', 3000),
    Shadab_Murga: new DappUser('Shadab', 2873),
    Inam_Kairana: new DappUser('Inam', 3414),
    Gufran_Kairana: new DappUser('Gufran', 3007),
    Khushnuma_Kairana: new DappUser('Khushnuma', 3070),
    Tanveer_Kairana: new DappUser('Tanveer', 2966),
    Aas_Mohammad_Saharanpur: new DappUser('Aas Mohammad', 4685+50000),
    Shahrukh_Saharanpur: new DappUser('Shahrukh', 23333),
    Touheed_Saharanpur: new DappUser('Touheed', 1358),
    Sahim_Saharanpur: new DappUser('Sahim', 1000),
    Tanveer_Irshad: new DappUser('Tanveer', 100000),
    Salman_Bhai: new DappUser('Salman', 1000),
    Irfan: new DappUser('Irfan', 11707),
    Sameer: new DappUser('Sameer', 1428)
};


// Sum Of All BLD Stake
const TotalBLV2Stake = Object.values(AllDappUser).reduce((sum, user) => sum + user.StakeBLV2, 0);

// Reward Generate Function
function MonthlyReward(Amount, Date){
    Object.values(AllDappUser).forEach(User => {
        User.DepositeBLD(Amount*User.StakeBLV2/TotalBLV2Stake, Date);
    }); 
}








// ----------------------------------------------Transaction Part Start--------------------------------------------------------------------------------------------------------------




// -----------------------------------------------Transaction Part Emd--------------------------------------------------------------------------------------------------------------















let Body = document.getElementById('body');
let FormPage = document.getElementById('form_page');
function check() {
    const InpName = document.getElementById('name').value.trim();
    const InpBLV2 = parseInt(document.getElementById('blv2stake').value.trim());
    if(FetchUser = Object.values(AllDappUser).find(
        User => User.Name.toLowerCase() === InpName.toLowerCase() && User.StakeBLV2 === InpBLV2
    )) {
        FormPage.remove();
        

        // Create Main Element
        let DataPage = document.createElement('main');
        Body.appendChild(DataPage);



        // Create Header Element
        let Header = document.createElement('header');
        Header.setAttribute('class', 'header');
        DataPage.appendChild(Header);

        let Reload = document.createElement('button');
        Reload.setAttribute('onclick', 'location.reload();');
        Reload.setAttribute('class', 'reload_btn');
        Reload.innerHTML = '<i class="bi bi-arrow-left"></i>';
        Header.appendChild(Reload);

        let SiteName = document.createElement('span');
        SiteName.setAttribute('class', 'site_name');
        SiteName.textContent = 'Dapp Record';
        Header.appendChild(SiteName);


        // Create Article Element For Profile
        let Profile = document.createElement('article');
        Profile.setAttribute('class', 'profile');
        DataPage.appendChild(Profile);
        // Name Element
        let UserName = document.createElement('p');
        UserName.textContent = FetchUser.Name;
        UserName.setAttribute('class', 'name');
        Profile.appendChild(UserName);
        // My BLD Element
        let UserBLD = document.createElement('p');
        UserBLD.textContent = parseFloat(Math.floor(FetchUser.MyBLD * 100) / 100).toFixed(2);
        UserBLD.setAttribute('class', 'bld');
        Profile.appendChild(UserBLD);
        // Staking Element
        let UserStake = document.createElement('p');
        UserStake.textContent = 'BLV 2.0 : ' +FetchUser.StakeBLV2;
        UserStake.setAttribute('class', 'stake');
        Profile.appendChild(UserStake);

        DataPage.appendChild(Profile);

        // Create Transaction Element For Transactions
        let Transaction = document.createElement('aside');
        Transaction.setAttribute('class', 'transaction');
        DataPage.appendChild(Transaction);

        // Create H2 Element For Heading Transaction
        let Heading = document.createElement('p');
        Heading.textContent = 'Transactions';
        Heading.setAttribute('class', 'transaction_heading')
        Transaction.appendChild(Heading);

        if(FetchUser.Transaction.length > 0){
            FetchUser.Transaction.forEach(History => {
                // Transaction Box Element 
                var TransactionBox = document.createElement('section');
                Transaction.appendChild(TransactionBox);
    
                // Transaction Date Element
                var TransactionDate = document.createElement('p');
                TransactionDate.textContent = History.date;
                TransactionDate.setAttribute('class', 'transaction_date');
                TransactionBox.appendChild(TransactionDate);
    
                // Transaction Type Element
                var TransactionType = document.createElement('p');
                TransactionType.textContent = 'Type : '+ History.type;
                TransactionType.setAttribute('class', 'transaction_type');
                TransactionBox.appendChild(TransactionType);
    
                // Transaction Amt Element
                var TransactionAmt = document.createElement('p');
                TransactionAmt.textContent = parseFloat(Math.floor(History.amt * 100) / 100).toFixed(2);
                TransactionAmt.setAttribute('class', 'transaction_amt');
                TransactionBox.appendChild(TransactionAmt);
    
                // Transaction Amt Element
                var TransactionRemark = document.createElement('p');
                TransactionRemark.textContent = 'Remark : '+ History.remark;
                TransactionRemark.setAttribute('class', 'transaction_remark');
                TransactionBox.appendChild(TransactionRemark);
    
                if(History.type === 'Deposite'){
                    TransactionBox.setAttribute('class', 'deposite');
                }
                else{
                    TransactionBox.setAttribute('class', 'withdrawal');
                }
            });
        }
        else {
            let NotTransactionAvail = document.createElement('section');
            NotTransactionAvail.setAttribute('class', 'not_transaction_available')
            Transaction.appendChild(NotTransactionAvail);

            let NotTransactionPara = document.createElement('p');
            NotTransactionPara.textContent = 'Transaction Not Available';
            NotTransactionAvail.appendChild(NotTransactionPara);
        }

        

    }
    else {
        alert('Invalid User Cridentials!');
    }
}
