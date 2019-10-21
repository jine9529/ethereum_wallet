const Web3 = require('web3');
const web3 = new Web3();
const url = 'http://localhost:8545';
const db = require('../db/db_conn');

web3.setProvider(new Web3.providers.HttpProvider(url));

module.exports = function(app){
    app.get('/api/test', function (req,res){
        res.send('api test!!');
    });

    app.get('/api/getCoinbase', async(req,res) => {
        let accounts = await web3.eth.getCoinbase();
        res.send(`현재 Coinbase는 ${accounts} 입니다`);
    });

    app.get('/api/getAccountList', async(req,res) => {
        let accounts;
        accounts = await web3.eth.getAccounts();
        // res.send(`${accounts}`);
        res.send(accounts);
    });

    app.get('/api/getBalance', async(req,res) => {
        //강사님 코드
        let account = req.query.account;
        let result = await web3.eth.getBalance(account);
        result = web3.utils.fromWei(result, "ether");
        res.send(result);


    //     let accountBal = new Array();
    //     let accounts = await web3.eth.getAccounts();
        
    //     for(var i=0; i<accounts.length; i++){
    //         accountBal[i] = await web3.utils.fromWei(await web3.eth.getBalance(accounts[i]));
    //     }
    
    //     // res.send(accounts);
    //     // res.send(`ETH : ${accountBal} ${accounts}`);

    //     res.send(accuntBal);
    
    });

    app.post('/api/newAccount', async(req,res) => {
        let email = req.body.email;
        let password = req.body.password;
        let result = await web3.eth.personal.newAccount(password);
        let sql = `INSERT INTO member (user_email, user_password, user_pub_key) values ('${email}', '${password}', '${result}')`;

        db.query(sql, function(err, rows, fields){
            if(err){
                console.log(err);
                
            }
            else{
                console.log(rows);
                res.send(rows);
            }
        })

        console.log(password);
        console.log(email);

        
    });

    app.get('/api/getBalance', async(req,res) => {
        let account = req.query.account;

        result = await web3.eth.getBalance(account);
        // console.log(req.headers);
        result = new bNum(web3.utils.fromWei(result,"ether"));
        res.send(result);
    });


    app.get('/api/getBalance2', async(req,res) => {
        let account = req.query.account2;

        result = await web3.eth.getBalance(account);
        result = await web3.utils.fromWei(result,"ether");
    
        res.send(result);
    });



    app.get('/api/getEth', async(req, res) => {
        let myAccount = req.query.account;

        let coinBase = await web3.eth.getCoinbase();
        console.log(`coinBase : ${coinBase}`);
        let unlock_result = await web3.eth.personal.unlockAccount(coinBase,'',0);
        console.log(`unlock_result : ${unlock_result}`);
        let send_result = await web3.eth.sendTransaction({
            from:coinBase,
            to:myAccount,
            value:web3.utils.toWei('10', 'ether')
        });
        console.log(`send_result : ${send_result}`)
        res.send(send_result);
    });



    app.get('/api/sendEth', async(req, res) => {
        let myAccount = req.query.account;
        let otherAccount = req.query.account2;
        let ethValue = req.query.ethValue;
        console.log(`myAccount : ${myAccount}`);
        let unlock_result = await web3.eth.personal.unlockAccount(myAccount,'11',0);
        console.log(`unlock_result : ${unlock_result}`);
        let send_result = await web3.eth.sendTransaction({
            from:myAccount,
            to:otherAccount,
            value:web3.utils.toWei(ethValue, 'ether')
        });
        console.log(`send_result : ${send_result}`)
        res.send(send_result);
    });

}