const config = require('../../config');
const axios = require('axios');

getRewards = async(address, page = 0, rows = 0) => {
    const endpoint = '/api/scan/account/reward_slash';

    const data = {
        row: rows,
        page: page,
        address: address
    };

    return await onPost(endpoint, data);
}

getStaked = async(address, page = 0, rows = 20) => {
    const endpoint = '/api/v2/scan/search';

    const data = {
        row: rows,
        page: page,
        key: address
    };

    return await onPost(endpoint, data);
}

onPost = async(endpoint, data) => {
    const url = `https://moonriver.api.subscan.io${endpoint}`;

    const headers = {
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': config.SUBSCAN_API_KEY,
            'Accept': 'application/json'
        }
    };

    try {
        const response = await axios.post(url, data, headers);

        return response.data;
    } catch(err){
        console.log(err);
        return null;
    }
}

module.exports = {
    getRewards,
    getStaked
}