import React, { Component,lazy,Suspense} from 'react';
import Search from '../src/Components/Search/Search';
import './App.css';
import Loader from './Components/Loader/Loader';


// lazy
const DisplayFetchData = React.lazy(
  ()=> import('../src/Components/DisplayFetchData/DIsplayFetchData')
  ) ;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      error: {},
      isFetching: false,
      articles :[],
      query:'react',
      limit:'10',
      page: 1,
    }
  }

  componentDidMount() {
    setInterval(
      this.timer
      ,1000);
    this.fetchData();
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
        this.fetchData()
      }
      else {
     this.setState({count: this.state.count + 1});
      }
  }

   handleObserve = (entries) => {
    const y = entries[0].intersectionRect.y;
      if (y > 500) {
        this.setState({page: this.state.page + 1});  
      } else {
        return
        }
        this.fetchData()
        }

    async fetchData () {
      const {query,limit,page,count} = this.state;
    this.setState({isFetching: true});
    try {
      let response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=5eddff77effb4574956c391597a288db&pageSize=${limit}&page=${page}`);
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
    this.setState({query: e.target.value})
  }



 



  render() {
    const {articles,count,query} = this.state;
    return (
      <div className="App">
        <header>
        <h1>Latest News Search</h1>
        </header>
        <Search placeholder={query} counter={count} handleChange={this.handleChange}/>
        
        <Suspense fallback=
        {   
          <Loader limit={this.state.limit}/>
        }>
          {
                articles ? articles.map(value => 
                  (<DisplayFetchData article={value}/>)) : ''
          }
         
        </Suspense>
       
        
        <div ref={ref => this.loadingRef = ref }></div>
      </div>
    );
  }
}

export default App;
