

export const corsConfig = {
	credentials: true,
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	origin: ['http://localhost:3000', 'http://padscomp.local:3000', 'https://192.168.0.22:3000' ],
};

export const cloudinaryConfig = {
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
};
