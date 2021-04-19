import React, { Component,lazy,Suspense} from 'react';
import Search from '../src/Components/Search/Search';
import './App.css';
import Loader from './Components/Loader/Loader';


// lazy
const DisplayFetchData = React.lazy(
  ()=> import('../src/Components/DisplayFetchData/DIsplayFetchData')
  );

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      error: {},
      isFetching: false,
      articles :[],
      query:'react',
      limit:'2',
      page: 1,
    }
  }

  componentDidMount() {
    setInterval(
      this.timer
      ,1000);
    this.fetchData(this.state.query);
    this.timer();
      const observer = new IntersectionObserver(this.handleObserve,
        {
        threshold: 0.2
      });
      observer.observe(this.loadingRef)
   }

  timer= () =>{
      if(this.state.count === 30) {
        this.setState({count : 0,articles:[]})
        this.fetchData(this.state.query)
      }
      else {
     this.setState({count: this.state.count + 1});
      }
  }

   handleObserve = (entries) => {
    const y = entries[0].intersectionRect.y;
    console.log(y,'y')
      if (y > 500) {
        this.setState({page: this.state.page + 1});  
      } else {
        return
        }
        this.fetchData(this.state.query)
        }

    async fetchData (q) {
      const {limit,page,count} = this.state;
    this.setState({isFetching: true});
    try {
      let response = await fetch(`https://newsapi.org/v2/everything?q=${q}&apiKey=bbf1551f0a8d45b59a1f1905d491f1fa&pageSize=${limit}&page=${page}`);
      let newArticle = await response.json();
      if (newArticle.articles !== undefined ) {
        this.setState({
          articles: this.state.articles.concat(newArticle.articles),          
          isFetching: false
        })
      }
    }
    catch(err) {
      this.setState({error: err})
    }
  }

  handleChange = (e) => {
    console.log(e.target.value)
    this.setState({query: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({articles: []})
    this.fetchData(this.state.query)
  }



  render() {
    const {articles,count,query} = this.state;
    return (
      <div className="App">
        <header>
        <h1>Latest News Search</h1>
        </header>
        <div style={{padding:'25px',width:'90%',margin:'0 auto',border:'1px solid grey'}}>
        <Search 
        placeholder={query} 
        counter={count} 
        handleChange={this.handleChange} 
        handleSubmit={this.handleSubmit}
        />
        <Suspense fallback=
        {   
          <Loader limit={this.state.limit}/>
        }>
          {
                articles ? articles.map(value => 
                  (<DisplayFetchData article={value}/>)) : ''
          }
         
        </Suspense>
        </div>   
        <div ref={ref => this.loadingRef = ref }></div>
      </div>
    );
  }
}

export default App;
