const jwt = require('jsonwebtoken')
//

const auth = async (req, res, next) => {
    const authHeaders = req.headers.authorization
    if (!authHeaders || !authHeaders.startsWith('Bearer ')) {
        return res.status(401).json({msg: 'Auth Failed'})
    }

    const token = authHeaders.split(' ')[1]
    try {
    const payLoad = jwt.verify(token, process.env.JWT_SECRET)
    req.user = {userId: payLoad.userId, name: payLoad.name}
    next()
    } catch (error) {
        console.log(error);
        res.status(401).json({msg: 'Auth Failed'})
    }
}

module.exports = auth;