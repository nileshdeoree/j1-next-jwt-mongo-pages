import jwt from 'jsonwebtoken';

const fetchuser = (handler) => async (req, res) => {
    const token = req.headers['auth-token'];

    if (!token) {
        return res.status(401).json({ error: "Please authenticate using a valid token" });
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        return handler(req, res);  // Call the handler with the req and res objects
    } catch (error) {
        console.error(error.message);
        return res.status(401).json({ error: "Please authenticate using a valid token" });
    }
};

export default fetchuser;
