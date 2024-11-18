const jwt = require('jsonwebtoken')

const ensureAuthenticated = (req, res, next) => {
    const auth = req.headers['authorization']
    const secret = "Iamfeelinggoodyeah";
    if (!auth) {
        return res.status(403).json({ message: 'Unauthorized' })
    }

    try {
        const decoded = jwt.verify(auth, secret)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(403).json({ message: 'Unauthorized' })
    }
}

module.exports = ensureAuthenticated