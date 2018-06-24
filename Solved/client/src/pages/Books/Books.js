import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import SaveBtn from "../../components/saveBtn";

class Books extends Component {
  state = {
    articles: [],
    savedArticles: [],
    beginDate: "",
    endDate: ""
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.search4articles(this.state.search, this.state.beginDate, this.state.endDate);
  };

  search4articles = (search, beginDate, endDate) => {
    API.searchArticles(search, beginDate, endDate)
      .then(res => {
        console.log(res.data.response.docs);
        this.setState({articles: res.data.response.docs});
        console.log(this.state.articles);
        console.log("Headline");
        console.log(this.state.articles[0].headline.main);
        console.log("URL");
        console.log(this.state.articles[0].web_url);
        console.log(this.state.articles[0].create_date);
      })
      //.catch(err=> console.log("Search4Articles: " + err));
  }

  componentDidMount() {
    this.loadgetallarticles();
  }

  saveArticle = (event) => {
    const target = event.target.id;
    const contents = {
      headline: this.state.articles[target].headline.main,
      web_url: this.state.articles[target].web_url,
      create_date: this.state.articles[target].create_date.slice(0,7)
    }
    API.savearticle(contents)
    .then(res => console.log(res))
    //.catch(res => console.log(err));
    this.loadgetallarticles();//)
  }

  loadgetallarticles = () => {
    API.getallarticles()
      .then(res =>
        this.setState({savedArticles: res.data})//})
      )
      //.catch(err => console.log(err));
  };

  deleteArticles = (event) => {
    const id = event.target.id;
    API.deletearticle(id)
      .then(res => this.loadgetallarticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };




  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>New York Times Search</h1>
            </Jumbotron>
            <form>
              <Input name="search" placeholder="Article Search(required)"onChange={this.handleInputChange} />
              <Input name="beginDate" placeholder="year (required)" onChange={this.handleInputChange}/>
              <Input name="endDate" placeholder="year (Optional)" onChange={this.handleInputChange}/>
              <FormBtn
              onClick={this.handleFormSubmit}
              >Submit</FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Latest Headlines</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map((articles, index) => (
                    <ListItem index={index} key={index} >
                      <a href={articles.web_url}>
                      <strong>
                        {articles.headline.main}
                        <br /> Published On: {articles.create_date.slice(0,7)}
                        </strong>
                        </a>
                        <br />
                      <SaveBtn id={index} onClick={this.saveArticle}>Save</SaveBtn>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>

          <Col size="md-6 sm-12">
          <Jumbotron>
            <h1>Saved Articles</h1>
          </Jumbotron>
          {this.state.savedArticles.length ? (
            <List> 
              {this.state.savedArticles.map((articles, index) => (
                <ListItem id={articles._id} key={index}>

                  <a href={articles.web_url}>
                    <strong>
                      {articles.headline}
                      <br /> Published On: {articles.create_date}
                    </strong>
                    </a>
                    <br />
                    <DeleteBtn id={articles._id} onClick={this.deleteArticles} />
                </ListItem>
              ))}
            </List>
          ) : (
            <h3>No Results to Display</h3>
          )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
