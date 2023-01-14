export default (News) => {
    /**
     * @description List all news.
     */
    News.listAllNews = () => {
      return News.find({});
    };
    
  };