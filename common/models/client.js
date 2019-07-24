// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-database
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

module.exports = function(Client) {
    Client.remoteMethod(
        'getNameClient',
        {
            description: 'get name client like -> Client 1',
            accepts: [
                { arg: 'nameclient', type: 'string'}
            ],
            returns:{
                arg: 'res', type:'object', root: true
            },
            http: { path: '/getNameClient', verb: 'get' }
        }
    );

    Client.getNameClient = function(nameclient, callback){
        new Promise(function(resolve, reject){
            var filter = {
                where: {
                    name_client : {
                        like : nameclient
                    }
                }
            }
            Client.find(filter, function(err, result){
                if(err) reject (err)
                if(result === null){
                    err = new Error ("Nama Client Tidak Dapat Ditemukan")
                    err.statusCode = 404
                    reject (err)
                }
                resolve(result)
            })
        }).then(function(res){
            if (!res) callback (err)
            return callback (null, res)
        }).catch(function(err){
            callback(err);
        });
    }

};
