const cgSvc = require('./coin-gecko.service');
const subscanSvc = require('./subscan.service');

getAddressDetails = async(address) => {
    const rewards = await getRewards(address);
    const staked = await getMovrStaked(address);
    const price = await getPrice();

    const datas = {
        address: address,
        price: price,
        totalStaked: staked,
        now: Math.floor(Date.now()/1000),
        potentialIntervals: [1, 7, 14, 30, 60, 90, 180, 270, 365, 730],
        rewards: [],
        totalReward: 0,
        stakingStart: 0,
        stakingHours: 0,
        stakingTotalTime: '',
        avgRewardDay: 0,
        avgRewardHr: 0,
        avgRewardHr12: 0,
        avgRewardHr24: 0,
        avgRewardHr48: 0,
        avgRewardHr6: 0,
        futureRewards: []
    };
    if(rewards.length > 0) {
        datas.rewards = rewards.map(x => x.reward);
        datas.totalReward = datas.rewards.reduce((tot, val) => tot + val, 0);
        datas.stakingStart = rewards[rewards.length - 1].timestamp;
        datas.stakingHours = Math.floor((datas.now - datas.stakingStart)/60/60);
        datas.stakingTotalTime = getTimeDiff(datas.now - datas.stakingStart);
        if(rewards.length > 0){
            datas.avgRewardHr = datas.rewards.reduce((tot, val) => tot + val, 0) / rewards.length;
            datas.avgRewardDay = datas.avgRewardHr * 24;
            if(rewards.length > 6) {
                datas.avgRewardHr6 = datas.rewards.slice(0, 5).reduce((tot, val) => tot + val, 0) / 6;
            }
            if(rewards.length > 12) {
                datas.avgRewardHr12 = datas.rewards.slice(0, 11).reduce((tot, val) => tot + val, 0) / 12;
            }
            if(rewards.length > 24) {
                datas.avgRewardHr24 = datas.rewards.slice(0, 23).reduce((tot, val) => tot + val, 0) / 24;
            }
            if(rewards.length > 48) {
                datas.avgRewardHr48 = datas.rewards.slice(0, 47).reduce((tot, val) => tot + val, 0) / 48;
            }
        }
        datas.futureRewards = getFutureRewards(price, datas.totalReward, datas.stakingHours, datas.rewards);
    }

    return datas;
}

getFutureRewards = (price, total, hours, rewards) => {
    const futureRewards = [];

    let future = {
        index: 0,
        label: 'Avg Rewards/Hr (Total)',
        movr: total / hours
    };
    future.usd = future.movr * price;
    future.hrsTil1Movr = 1 / future.movr;
    future.daysTil1Movr = future.hrsTil1Movr / 24;
    const diff = (total - Math.floor(total));
    
    const num = 1 - diff;
    
    future.hrsTilNextMovr = (1 - (total - Math.floor(total))) / future.movr;
    future.daysTilNextMovr = future.hrsTilNextMovr / 24;

    futureRewards.push(future);
    
    future = {
        index: 1,
        label: 'Avg Rewards/Day (Total)',
        movr: futureRewards[0].movr * 24
    };
    future.usd = future.movr * price;

    futureRewards.push(future);

    const hrs = [ 48, 24, 12, 6 ];

    let idx = 2;
    for(let hr of hrs){
        const subset = rewards.slice(0, (hr - 1));
        const subTotal = subset.reduce((tot, val) => tot + val, 0);
        
        let future = {
            index: idx,
            label: `Avg Rewards/Hr (Last ${hr})`,
            movr: subTotal / hr
        };
        future.usd = future.movr * price;
        future.hrsTil1Movr = 1 / future.movr;
        future.daysTil1Movr = future.hrsTil1Movr / 24;
        future.hrsTilNextMovr = (1 - (total - Math.floor(total))) / future.movr;
        future.daysTilNextMovr = future.hrsTilNextMovr / 24;

        futureRewards.push(future);
        idx++;
    }

    return futureRewards;
}

getTimeDiff = (difference) => {
    let days = "";
    let hours = "";
    let minutes = "";

    if(difference >= (60*60*24)) {
        const val = Math.floor(difference/60/60/24);
        days = `${val} days `;
        difference -= val*60*60*24;
    }
    if(difference >= (60*60)) {
        const val = Math.floor(difference/60/60);
        hours = `${val} hours `;
        difference -= val*60*60;
    }
    if(difference >= 60) {
        const val = Math.floor(difference/60);
        minutes = `${val} minutes`;
        difference -= val*60;
    }

    return `${days}${hours}${minutes}`;
}

getRewards = async(address) => {
    const rewards = [];
    let moreRewards = true;
    let page = 0;
    let rows = 100;

    while (moreRewards) {
        const response = await subscanSvc.getRewards(address, page, rows);

        if(response !== null && response.message.toLowerCase() === "success" && response.data.count > 0) {
            
            const totalRewards = response.data.count;
            if(rows * (page + 1) >= totalRewards){
                moreRewards = false;
            }
            
            const subset = response.data.list.filter(x => x.module_id === "parachainstaking");
            
            const rewardSubset = 
                subset
                .map((x) => {
                    return { reward: +x.amount / Math.pow(10,18), timestamp:  x.block_timestamp }
                });

            rewards.push.apply(rewards, rewardSubset);

            page++;
        } else {
            moreRewards = false;
        }
    }

    return rewards;
}

getMovrStaked = async(address) => {
    let totalStaked = 0;

    const response = await subscanSvc.getStaked(address);
    
    if(response !== null && response.message.toLowerCase() === "success") {
        totalStaked = +response.data.account.reserved / Math.pow(10,18);
    }

    return totalStaked;
}

getPrice = async() => {
    const symbol = 'moonriver';
    let price = 0.0;

    const priceData = await cgSvc.getPrice(symbol);

    if(priceData != null) {
        price = priceData.tickers[0].converted_last.usd;
    }

    return price;
}

module.exports = {
    getAddressDetails
}