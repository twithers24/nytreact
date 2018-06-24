import axios from "axios";

const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?z";
const APIKEY = "df6d23b191ae4d009174bd8f60e38530";

export default {
  // Gets all books
  searchArticles: function(search, beginDate, endDate) {
    return axios.get("${url}q=${search}&begin_date=${beginDate}0101&end_date=${endDate}1231${apiKey}");
  },
  // Gets the book with the given id
  getallarticles: function() {
    return axios.get("/api/article/");
  },
  // Deletes the book with the given id
  deletearticle: function(id) {
    return axios.delete("/api/article/" + id);
  },
  // Saves a book to the database
  savearticle: function(articleData) {
    return axios.post("/api/article", articleData);
  }
};
