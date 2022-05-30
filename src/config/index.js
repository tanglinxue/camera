const env = process && process.env && process.env.NODE_ENV;
console.log(env)
const EnvConfig = {
	development: {
    baseApi: 'https://xcx10.datikeji.com',
	},
	production: {
		baseApi: 'https://xcx10.datikeji.com',
	}
}
export default {
	env,
	...EnvConfig[env]
}
