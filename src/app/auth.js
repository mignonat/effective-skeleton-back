const jwt = require('jsonwebtoken')
const config = require('./tool/config.js')
const user_model = require('./model/user.js')
const log = require('./tool/log.js')
const Const = require('./tool/const.js')

const secret = config.get(Const.TOKEN_SECRET)
if (!secret)
    log.error('auth module : secret not found ! '+secret)

//TODO check properties not null

//TODO explore this api : https://www.npmjs.com/package/express-jwt

module.exports = {
    doAuth : (login, password) => {
        return new Promise(function(resolve, reject) {
            try {
                user_model
                    .findUserByLogin(login)
                    .then((user) => {
                        if (!user) {
                            log.debug('doAuth : no user found for login="'+login+'"')
                            reject(true)
                        } else if (user) {
                            if (user.password != password) {
                                log.debug('doAuth : bad password for login="'+login+'" and password="'+password+'"')
                                reject(true)
                            } else {
                                const userInterface = {
                                    firstname: user.firstname,
                                    lastname: user.lastname,
                                    login: user.login,
                                    admin: user.admin
                                }
                                // TODO : sign with RSA SHA256
                                //https://github.com/auth0/node-jsonwebtoken
                                //const cert = fs.readFileSync('private.key')  // get private key
                                //const token = jwt.sign({ foo: 'bar' }, cert, { algorithm: 'RS256'})
                                resolve({
                                    token : jwt.sign(userInterface, secret), 
                                    user : userInterface
                                })
                            }
                        }
                    })
                    .catch((err) => {
                        log.error('auth.doAuth : '+err)
                        reject(false)
                    })
            } catch (ex) {
                log.error('auth.doAuth : '+ex)
                reject(false)
            }
        })
    },
    validToken : (token) => {
        return new Promise(function(resolve, reject) {
            try {
                if (token) {
                    jwt.verify(token, secret, (err, decoded) => {
                        if (err) {
                            log.err('auth.validToken : error while verifying '+err)
                            reject(true)
                        }
                        resolve(decoded)
                    })
                } else {
                    log.debug('auth.validToken : empty token')
                    reject(true)
                }
            } catch (ex) {
                log.error('auth.validToken : error '+ex)
                reject(false)
            }
        })
    }
}