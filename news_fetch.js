const cheerio = require('cheerio');
const https = require('https')

const testing = false;
const SOCCER_ETHIOPIA_NEWS_URL = "https://www.soccerethiopia.net/wp-json/wp/v2/posts";

/**
 * Entry point for news_fetch api
 * @return {Array}
 */
exports.getLatestNews = async function () {
    if (testing) {
        return new Promise(resolve => resolve(getListOfNewsContent(readNewsFromFile())));
    } else {
        return await readNewsFromWeb().then(data => getListOfNewsContent(data));
    }
};

/**
 * Entry point for news_fetch api
 * @return {string} - json
 */
exports.getLatestNewsJSON = async function () {
    return JSON.stringify(await this.getLatestNews());
};

/**
 * Entry point for news_fetch api
 * @return {Array}
 */
exports.getSingleNewsContent = async function (newsId) {
    if (testing) {
        return new Promise(resolve => resolve(getListOfNewsContent(readNewsFromFile())));
    } else {
        return await readNewsFromWeb().then(data => getListOfNewsContent(data));
    }
};

/**
 * Entry point for news_fetch api
 * @return {string} - json
 */
exports.getSingleNewsContentJSON = async function (newsId) {
    return JSON.stringify(await this.getSingleNewsContent(newsId));
};

async function forEach(arr, callback) {
    return Promise.all(arr.map(async item => (await callback(item))));
}

async function getListOfNewsContent(news) {
    let newsItems = [];
    const newsJson = JSON.parse(news);

    await forEach(newsJson, await (async newsItem => {
        let categoryNames = [];
        const { author , featured_media, categories } = newsItem;
        
        let authorData = await requestGETURL(`https://www.soccerethiopia.net/wp-json/wp/v2/users/${author}`).catch(e => {});
        authorData = JSON.parse(authorData);

        let featuredMediaData = {}

        featuredMediaData = await requestGETURL(`https://www.soccerethiopia.net/wp-json/wp/v2/media/${featured_media}`).catch(e => console.log(e));
        featuredMediaData = JSON.parse(featuredMediaData)

        await forEach(categories, async category => {
            let categoryData = await requestGETURL(`https://www.soccerethiopia.net/wp-json/wp/v2/categories/${category}`).catch(e => {})
            categoryData = JSON.parse(categoryData)
            categoryNames.push(categoryData['name'])
        })

        let returnableNewsItem = {}
        returnableNewsItem['newsAuthorName'] = authorData['name']
        returnableNewsItem['newsId'] = newsItem['id']
        returnableNewsItem['newsImage'] = getImageLink(featuredMediaData)
        returnableNewsItem['newsTitle'] = newsItem['title']['rendered']
        returnableNewsItem['newsAuthorLink'] = authorData['link']
        returnableNewsItem['newsTags'] = categoryNames
        returnableNewsItem['newsPublishedOn'] = newsItem['date']
        returnableNewsItem['newsContent'] = newsItem['content']['rendered']

        newsItems = newsItems.concat(returnableNewsItem);
    })).catch(e => console.log(e));

    console.log('WAIT A SEC: ' + newsItems.length)
    return newsItems;
}

function getImageLink(holder) {
    if (holder['guid']) return holder['guid']['rendered']
    else return ""
}

/**
 * if (testing) -> read from offline file
 * @return {string}
 * @api Public
 */
function readNewsFromFile () {
    const fx = require('fs');
    try {
        return fx.readFileSync('./news_dummy.json', 'utf-8');
    } catch (e) {
        console.error("file_" , e);
        return ""
    }
}

/**
 * if (!testing) -> read data from website
 * @return {Promise<String>}
 */
async function readNewsFromWeb () {
    return requestGETURL(SOCCER_ETHIOPIA_NEWS_URL)
}

async function requestGETURL(url) {
    return new Promise(resolve => https.get(url, res => {
        let data = "";
        res.on("error", err => {
            resolve(err.reason);
        });

        res.on('data', d => {
            data += d;
        });

        res.on("end" , () => {
            resolve(data);
        })
    })).catch(err => console.log(err));
}