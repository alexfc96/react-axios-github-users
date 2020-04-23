import React, {Component} from 'react'
import Axios from 'axios'
import '../components/SearchGitUsers.css'

const STATUS = {
  isLoading : 'loading',
  isLoaded : 'loaded',
  error : 'error'
}

class SearchGitUsers extends Component {
  state = {
    users : [],
    status : STATUS.isLoaded,
    inputValue : "",
  }

  handleInputChanges = (e) =>{
    this.setState({
      inputValue : e.target.value
    })

  }

  searchUsers = (input) =>{

    if(input.length>1){
      this.setState({
        status : STATUS.isLoading
      })
  
      Axios.get(`https://api.github.com/search/users?q=${input}`)
      .then((response)=>{
        console.log(response.data.items)
        this.setState({
          users : response.data.items,
          status : STATUS.isLoaded
        })
      })
      .catch((error) =>{
        this.setState({
          status : STATUS.error
        })
      })
    }

  }

  // componentDidMount(){
  //   console.log("montado")
  //   this.searchUsers()
  // }

  render(){
    const {status, inputValue, users} = this.state;

    switch (status) {
      case STATUS.isLoading:
        return <div>
                  <h1>Search Users in GitHub</h1>
                  <input type="text" value={inputValue} onChange={this.handleInputChanges} />
                  <button onClick={()=>this.searchUsers(inputValue)}>Search users</button>
                  <div>The content is loading</div>
               </div>
      case STATUS.isLoaded:
        return <div>
                  <h1>Search Users in GitHub</h1>
                  <input type="text" value={inputValue} onChange={this.handleInputChanges} minLength="2" />
                  <button onClick={()=>this.searchUsers(inputValue)}>Search users</button>
                  {users.map((user, index)=>{
                    return <div key={user.node_id}>
                              <a href={user.url}>{user.login}</a>
                            </div>
                  })
                  }
               </div>
      case STATUS.error:
        return <div> Error</div>

      default:
        break;
    }
  }
}

export default SearchGitUsers