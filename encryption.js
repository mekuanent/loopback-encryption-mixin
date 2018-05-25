/**
 * Created by Mekuanent Getachew on 5/25/18.
 */
var crypto = require('crypto');

module.exports = function(Model, options) {

    'use strict';

    var defaultOpt = {
        "fields" : [],
        "password": "asiyd87yshd23878hujnwqd78",
        "salt": "oldrleovjja0jz7h",
        "iteration": 100,
        "hashBytes": 16,
        "hashAlgorithm": "sha1",
        "hexIv": "cd5c632d26fde5e2eb61e521ad2b91ba",
        "encryptionAlgorithm": "aes-128-cbc"
    };

    Model.observe('persist', function event(ctx, next) {

        var iv = Buffer.from(options.hexIv || defaultOpt.hexIv, "hex");
        crypto.pbkdf2(options.password || defaultOpt.password,
            options.salt || defaultOpt.salt,
            options.iteration || defaultOpt.iteration,
            options.hashBytes || defaultOpt.hashBytes,
            options.hashAlgorithm || defaultOpt.hashAlgorithm,
            function (err, derivedKey){
                if(err) {
                    console.log(err);
                    next(err);
                }
                else{
                    var cipher = crypto.createCipheriv(options.encryptionAlgorithm || defaultOpt.encryptionAlgorithm, derivedKey, iv);
                    var fields = options.fields || defaultOpt.fields;

                    for(var i in fields){
                        var crypted = cipher.update(ctx.data[fields[i]],'utf8','hex');
                        crypted += cipher.final('hex');
                        ctx.data[fields[i]] = crypted;
                    }
                    next();
                }
            });
    });

    Model.observe('loaded', function event(ctx, next) {

        var iv = Buffer.from(options.hexIv || defaultOpt.hexIv, "hex");
        crypto.pbkdf2(options.password || defaultOpt.password,
            options.salt || defaultOpt.salt,
            options.iteration || defaultOpt.iteration,
            options.hashBytes || defaultOpt.hashBytes,
            options.hashAlgorithm || defaultOpt.hashAlgorithm,
            function (err, derivedKey){
                if(err) {
                    console.log(err);
                    next(err);
                }
                else{
                    var cipher = crypto.createDecipheriv(options.encryptionAlgorithm || defaultOpt.encryptionAlgorithm, derivedKey, iv);
                    var fields = options.fields || defaultOpt.fields;

                    for(var i in fields){
                        var decrypted = cipher.update(ctx.data[fields[i]],'hex', 'utf8');
                        try{
                            decrypted += cipher.final('utf8');
                            ctx.data[fields[i]] = decrypted;
                            next();
                        }catch (ex){
                            ex.message += "\nThis usually happens when the field contains a plain text! please make sure to remove/re-save that";
                            next(ex);
                        }
                    }

                }
            });
    });

};
