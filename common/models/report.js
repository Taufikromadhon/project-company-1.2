// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-database
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

module.exports = function(Report) {
    Report.remoteMethod(
        'getNameReport',
        {
            description: 'get name report like -> Report 1',
            accepts: [
                { arg: 'namereport', type: 'string'}
            ],
            returns:{
                arg: 'res', type:'object', root: true
            },
            http: { path: '/getNameReport', verb: 'get' }
        }
    );

    Report.getNameReport = function(namereport, callback){
        new Promise(function(resolve, reject){
            var filter = {
                where: {
                    name_report : {
                        like : namereport
                    }
                }
            }
            Report.find(filter, function(err, result){
                if(err) reject (err)
                if(result === null){
                    err = new Error ("Nama Report Tidak Dapat Ditemukan")
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
