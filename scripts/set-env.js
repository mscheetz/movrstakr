const fs = require('fs');
const yargs = require('yargs');

// This is good for local dev environments, when it's better to
// store a projects environment variables in a .gitignore'd file
require('dotenv').config();

// Would be passed to script like this:
// `ts-node set-env.ts --environment=dev`
// we get it from yargs's argv object
const environment = yargs.argv.environment;
const isProd = environment === 'prod';

const targetPath = environment === 'dev' 
    ? `./src/environments/environment.ts`
    : `./src/environments/environment.${environment}.ts`;

const envConfigFile = `
export const environment = {
    production: ${isProd},
    ENVIRONMENT: "${environment.toUpperCase()}",
    PORT: ${process.env.PORT},
    COOKIE: "${process.env.COOKIE}",
    API_BASE: "${process.env.API_BASE}",
    LOGIN: "${process.env.LOGIN}",
    ADDRESSES: "${process.env.ADDRESSES}",
    STAKE_INFO: "${process.env.STAKE_INFO}",
    BTC_XPUB: "${process.env.BTC_XPUB}",
    DOT_ADDRESS: "${process.env.DOT_ADDRESS}",
    ERC20_ADDRESS: "${process.env.ERC20_ADDRESS}",
    XHV_ADDRESS: "${process.env.XHV_ADDRESS}",
    XMR_ADDRESS: "${process.env.XMR_ADDRESS}",
    TOKEN_SECRET: "${process.env.TOKEN_SECRET}",
    SUBSCAN_API_KEY: "${process.env.SUBSCAN_API_KEY}"
};
`

if(targetPath !== 'dev') {
	const devPath = './src/environments/environment.ts';
	fs.writeFile(devPath, envConfigFile, function (err) {
	  if (err) {
	    console.log(err);
	  }

	  console.log(`Empty ${targetPath} created`);
	});
}

fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.log(err);
  }

  console.log(`Output generated at ${targetPath}`);
});
