import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import moment from 'moment';


const URL = 'http://reduxblog.herokuapp.com/api';
const postKey = '?key=13ufh12eu2';

function getPosts() {
  return axios.get(`${URL}/posts${postKey}`);
}
function createPost(post){
  return axios.post(`${URL}/posts${postKey}`,
    {"title": post.title,
      "content": moment().format('YYYY-MM-DD HH:mm'),
      "categories": post.categories});
}
function deletePosts(id) {
  return axios.delete(`${URL}/posts/${id}${postKey}`);
}

class App extends Component {
  state={
    posts:[]
  }

  componentWillMount=()=>{
    this.loadPage();
  }
  loadPage=()=>{
    getPosts()
    .then((res)=>{
      this.setState({posts:res.data});
      console.log(this.state.posts);
    });
  }

  submit=(e)=>{
    e.preventDefault();
    createPost({title:this.state.words})
    .then(()=>{
      this.setState({words:''});
      this.loadPage();
    });
  }
  change=(e)=>{
    this.setState({words:e.target.value});
  }
  delete=(e)=>{
    deletePosts(e)
    .then(()=>{

      this.loadPage();
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <img src={logo} className="App-logo" alt="logo" />
          <img src={logo} className="App-logo" alt="logo" />
          <img src={logo} className="App-logo" alt="logo" />
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to diary</h1>
        </header>
        <form>
          <textarea style={{height:100, width: 800}} value={this.state.words} onChange={(e)=>this.change(e)}/>
          <button className='submit' onClick={(e)=>this.submit(e)}>
            submit
          </button>
        </form>
        <div>
          {this.state.posts ?this.state.posts.map((post)=>{
            return (
              <div style={{padding: 10}}>
              <hr/>
                {post.title}
                <span style={{float:'right', color:'blue'}}>
                  {post.content}
                  <button
                    style={{marginLeft:5}}
                    onClick={()=>this.delete(post.id)}
                  >X</button>
                </span>
              </div>
            )
          }): null
        }

        </div>
      </div>
    );
  }
}

export default App;
