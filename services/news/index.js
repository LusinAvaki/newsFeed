import news from '../../models/index.js';
const newsModel = news.NewsModel;
import fetch from "node-fetch";
import convert from 'xml-js';

async function getNewsFeed() {
	try {
		const response = await fetch("http://feeds.bbci.co.uk/news/rss.xml")
		const content = await response.text()
        const jsonData = JSON.parse(convert.xml2json(content, { compact: true }));

        const responseNews = jsonData.rss.channel.item
        for(let i = 0; i < responseNews.length; i++) {

            const news = new newsModel({
                title: responseNews[i]['title']._cdata,
                link: responseNews[i]['link']._text,
                description: responseNews[i]['description']._cdata,
            })
            news.save();
        }
		
	} catch (e) {
		console.log({e})
	}
}

function listNews() {
  return newsModel.listAllNews()
    .then((news) => {
      const response = {
        data: news,
        message: 'Successfully fetched news.'
      };
      return response;
    })
}


export default {
    getNewsFeed,
    listNews
};