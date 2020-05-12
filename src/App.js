import React from 'react';
import ReactDOM from 'react-dom'
import './index.css';
import { get } from 'axios';

const testData = [
  { name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook" },
  { name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu" },
  { name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook" },
];

const CardList = (props) => (
  <div className="container md">
    {props.profiles.map(profile => <Card key={profile.id} {...profile} />)}
  </div>
);

class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
      <div class="card sm-3 mt-2 mb-3">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src={profile.avatar_url} class="card-img" alt=""></img>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{profile.name}</h5>
              <p class="card-text">{profile.company}</p>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

class Form extends React.Component {
  state = { userName: '' };
  handleSubmit = async (event) => {
    event.preventDefault();
    const response = await get(`https://api.github.com/users/${this.state.userName}`)
    this.props.onSubmit(response.data);
    this.setState({ userName: '' })
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.userName}
          onChange={event => this.setState({ userName: event.target.value })}
          placeholder="GitHub username"
          required
        />
        <button>Add card</button>
      </form>
    );
  }
}

class App extends React.Component {
  state = {
    profiles: testData,
  };

  addNewProfile = (profileData) => {
    this.setState(prevState => ({
      profiles: [...prevState.profiles, profileData]
    }))
    console.log(this.state.profiles)
  }

  render() {
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <div className="jumbotron">
          <Form onSubmit={this.addNewProfile} />
          <CardList profiles={this.state.profiles} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App title="The GitHub Cards App" />,
  document.getElementById('root'),
);

export default App;
