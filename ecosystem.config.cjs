const dotenv = require('dotenv')

const env_production = dotenv.config({ path: '.env.production' }).parsed;

module.exports = {
	apps: [{
		name: 'loskop',
		script: `pnpx serve .output/public`,
		env_production,
	}],

	deploy: {
		production: {
			user: 'dimitriaatos',
			host: 'grain',
			ref: 'origin/master',
			repo: 'https://github.com/dimitriaatos/loskop.radio.git',
			path: '/home/dimitriaatos/sites/loskop/front',
			'post-deploy': 'source ~/.nvm/nvm.sh && pnpm install && pnpm generate && pm2 reload ecosystem.config.cjs --env production',
			'pre-deploy-local': 'rsync -v ./.env.production dimitriaatos@grain:/home/dimitriaatos/sites/loskop/front/current/.env.production',
			'ssh-options': 'ForwardAgent=yes'
		}
	}
}
