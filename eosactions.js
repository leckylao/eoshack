// configuration
eos = Eos({
    chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f', // 32 byte (64 char) hex string
    keyProvider: config.KEY, // WIF string or array of keys..
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
                        user_id: config.ACCOUNT_NAME,
                        longitude: longitude,
                        latitude: latitude,
                        sample_name: sampleName,
                        sample_category: sampleCategory,
                        images: [image]
                    }
                }
            ]
        };
        console.log('* thats the transaction object', transaction);
        this.executeTransaction(transaction);

        var result = eos.getTableRows(true, config.CONTRACT_NAME, config.CONTRACT_NAME, 'request', 'request', null, null, null, 'i64', 'primary');
        console.log('the result', result);
        return result;
    },
    submitAI: function () {

        // mockAI


    },

    verify: function (id, result, sample_name, sample_category, remark) {
        console.log('*verification test', id, result, sample_name, sample_category, remark);
        console.log(config.ACTIVE_EXPERT);
        var transaction = {
            // ...headers,
            actions: [
                {
                    account: config.CONTRACT_NAME,
                    name: 'verify',
                    authorization: [{
                        actor: config.ACTIVE_EXPERT,
                        permission: 'active'
                    }],
                    data: {
                        expert: config.ACTIVE_EXPERT, // acccount name
                        id: id, // requesttable id
                        result: result,// 1 0
                        sample_name: sample_name,
                        sample_category: sample_category,
                        remark: remark
                    }
                }
            ]
        };
        return this.executeTransaction(transaction);
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
        return eos.transaction(transaction);
    },
    getAccount: async function (accountName) {
      return eos.getAccount(accountName);
    }
};
