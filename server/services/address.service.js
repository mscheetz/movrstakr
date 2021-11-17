const config = require('../../config');
const btc = require('btc-xpub-address');

const getAddresses = async() => {
    let datas = {
        btc: await getBtcAddress(),
        dot: config.DOT_ADDRESS,
        erc20: config.ERC20_ADDRESS,
        xhv: config.XHV_ADDRESS,
        xmr: config.XMR_ADDRESS
    };

    return datas;
}

const getBtcAddress = async() => {
    const xpub = config.BTC_XPUB;
    const address = await btc.default.getAddress(xpub);

    return address;
}

module.exports = {
    getAddresses
}