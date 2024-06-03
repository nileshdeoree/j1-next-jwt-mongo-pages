import fetchuser from "@/middleware/fetchuser";
import User from "@/models/User"

const handler = async (req, res) => {
    if (req.method !== 'GET') {
        res.json({ message: "This method is not allowed" })
    }

    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

export default fetchuser(handler);
