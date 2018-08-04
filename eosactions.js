

// configuration
eos = Eos({
    chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f', // 32 byte (64 char) hex string
    keyProvider: [config.KEY], // WIF string or array of keys..
    httpEndpoint: 'http://172.16.97.1:8888',
    expireInSeconds: 60,
    broadcast: true,
    verbose: false, // API activity
    sign: false
});
// test connection
console.log(eos.getInfo({}));

var ACTIONS = {
    getTable: function () {
        return eos.getTableRows(true, config.CONTRACT_NAME, config.CONTRACT_NAME, 'request', 'request', null, null, null, 'i64', 'primary');
    },
    submit: function (userID, longitude, latitude, sampleName, sampleCategory, image) {
        var transaction = {
            // ...headers,
            actions: [
                {
                    account: config.CONTRACT_NAME,
                    name: 'submit',
                    authorization: [{
                        actor: config.ACCOUNT_NAME,
                        permission: 'active'
                    }],
                    data: {
                        user_id: userID,
                        longitude: longitude,
                        latitude: latitude,
                        sample_name: sampleName,
                        sample_category: sampleCategory,
                        images: [image]
                    }
                }
            ]
        };
        this.executeTransaction(transaction);

        var result = eos.getTableRows(true, config.CONTRACT_NAME, config.CONTRACT_NAME, 'request', 'request', null, null, null, 'i64', 'primary');
        console.log('the result', result);
    },
    submitAI: function () {

        // mockAI


    },
    // you can only claim if the status is 3
    check: function (userID) {
        var transaction = {
            actions: [
                {
                    account: config.CONTRACT_NAME,
                    name: 'submit',
                    authorization: [{
                        actor: config.ACCOUNT_NAME,
                        permission: 'active'
                    }],
                    data: {
                        client:'',//account name
                        id:'' , //request table id


                        // to: 'initb',
                        // quantity: '7.0000 SYS',
                        // memo: ''
                    }
                }
            ]
        }
    },
    verify: function (id, sample_name, sample_category, remark) {
        var transaction = {
            // ...headers,
            actions: [
                {
                    account: config.CONTRACT_NAME,
                    name: 'submit',
                    authorization: [{
                        actor: config.ACCOUNT_NAME,
                        permission: 'active'
                    }],
                    data: {
                        expert: config.EXPERT_ACCOUNT_NAME, // acccount name
                        id:'', // requesttable id
                        result:'',// 1 0
                        sample_name:'',
                        sample_category:'',
                        remark: ''
                    }
                }
            ]
        };
    },
    gettask: function () {
    },
    testAction: function () {
        var transaction = {
            // ...headers,
            actions: [
                {
                    account: 'hackathon111',
                    name: 'hi',
                    authorization: [{
                        actor: config.ACCOUNT_NAME,
                        permission: 'active'
                    }],
                    data: {
                        user: 'user',
                        // to: 'initb',
                        // quantity: '7.0000 SYS',
                        // memo: ''
                    }
                }
            ]
        };
        this.executeTransaction(transaction);
    },
    executeTransaction: function (transaction) {
        eos.transaction(transaction);
    }
};