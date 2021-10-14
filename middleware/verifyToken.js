import jwt from 'jsonwebtoken';

export async function verifyToken(req, res, next) {
	try {

		const { authToken } = req.cookies;
		const tokenData = await jwt.verify(authToken, process.env.SECRET_KEY);

		if (!tokenData) throw new Error('Unauthorized');

		req.verifiedAccount = { tokenData };
		next();
	} catch (err) {
		console.log(err);

		res.status(401).json({ success: false, message: err });
	}
}
