const Users = require(`../models/users`)



const getUser = async (req, res) => {
    try {
        const code = req.params.code;
        console.log('Received verification code:', code);
        const user = await Users.findOne({ code: code });
        console.log('Database query completed');

        if (!user) {
            console.log('No user found with code:', code);
            return res.status(404).json({
                message: 'No such user found with this certification code'
            });
        }

        console.log('User found:', user);

        res.status(200).json({
            discord_username: user.discord_username || "Not provided",
            fullname: user.fullname || "Not provided",
            speciality: user.speciality || "Not provided",
            country: user.country || "Not provided",
            certificate_level: user.certificate_level || "Not provided",
            code: user.code || "Not provided"
        });

    } catch (error) {
        console.error('Error in getUser:', error);
        res.status(500).json({
            message: 'Server error while verifying certificate'
        });
    }
}

module.exports = {
    getUser
}

