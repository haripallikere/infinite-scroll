import React, { Component } from 'react';
import Search from '../src/Components/Search/Search';
import DisplayFetchData from '../src/Components/DisplayFetchData/DIsplayFetchData';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      articles :[],
      query:'react',
      limit:'2',
      page:'1'
    }
  }
  componentWillMount() {
    this.fetchData();
   }

  fetchData = async function(){
    const {query,limit,page} = this.state;
    this.setState({isFetching: true});
    try {
      let response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=f25157fd35514108a3cd55026422f9ba&pageSize=${limit}&page=${page}`);
      let json = await response.json();
      this.setState({...this.state,articles: json.articles,isFetching: false})
    }
    catch(err) {
      console.log(err,'eroor')
    }
  }



  render() {
    const {isFetching,articles} = this.state;
    return (
      <div className="App">
        <header>
        <h1>Latest News Search</h1>
        </header>
        <Search/>
        {
          isFetching ? <p>lodaing......</p> :  <DisplayFetchData articles={articles}/>
        }
       
       
      </div>
    );
  }

}

export default App;
