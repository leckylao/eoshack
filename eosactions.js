// Eos = require('eosjs');

// configuration
eos = Eos({
    chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f', // 32 byte (64 char) hex string
    keyProvider: ['5KbYnXiRxDqaej7qP7A6Pji3ZNiwaFiYRGayGRtHLk8jTFvGCdN'], // WIF string or array of keys..
    httpEndpoint: 'http://172.16.97.1:8888',
    expireInSeconds: 60,
    broadcast: true,
    verbose: false, // API activity
    sign: false
});
// test connection
console.log(eos.getInfo({}));

var actions = {
    submitEx: function (userID, geoLon, geoLat, name, category, picturePass, geoInfo) {
        var transaction = {
            // ...headers,
            actions: [
                {
                    account: 'hackathon111',
                    name: 'submit',
                    authorization: [{
                        actor: 'alice1111111',
                        permission: 'active'
                    }],
                    data: {
                        user: userID,
                        longtitude: geoLon,
                        latitude:
                        // to: 'initb',
                        // quantity: '7.0000 SYS',
                        // memo: ''
                    }
                }
            ]
        };
    },
    submitAI: function () {

        // mockAI

    },
    claim: function (userID) {
        var transaction = {
            actions: [
                {
                    account: 'hackathon111',
                    name: 'submit',
                    authorization: [{
                        actor: 'alice1111111',
                        permission: 'active'
                    }],
                    data: {
                        user: userID,
                        longtitude: geoLon,
                        latt
                        // to: 'initb',
                        // quantity: '7.0000 SYS',
                        // memo: ''
                    }
                }
            ]
        }
    },
    testAction: function () {
        var transaction = {
            // ...headers,
            actions: [
                {
                    account: 'hackathon111',
                    name: 'hi',
                    authorization: [{
                        actor: 'alice1111111',
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