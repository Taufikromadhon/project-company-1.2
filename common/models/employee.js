// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-database
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

module.exports = function(Employee) {
    Employee.remoteMethod(
        'getNameTaufik',
        {
            description: 'get name like -> Taufik',
            accepts: [
                { arg: 'firstname', type: 'string'}
            ],
            returns:{
                arg: 'res', type:'object', root: true
            },
            http: { path: '/getNameTaufik', verb: 'get' }
        }
    );

    Employee.getNameTaufik = function(firstname, callback){
        new Promise(function(resolve, reject){
            var filter = {
                where: {
                    first_name : {
                        like : firstname
                    }
                }
            }
            Employee.find(filter, function(err, result){
                if(err) reject (err)
                if(result === null){
                    err = new Error ("Nama Tidak Dapat Ditemukan")
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
