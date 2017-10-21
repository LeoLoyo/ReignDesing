import React, {Component} from 'react';
import moment from 'moment';
import axios from 'axios';
import './App.css';

class TabletHits extends Component {
  constructor() {
    super();
    this.state = {
      hits: []
    }
  }
  loadHits() {
    axios
      .get("/hits")
      .then(({data}) => this.setState({hits: data}));
  }
  deleteHits(...arg) {
    const [hit] = arg;
    axios
      .delete(`/hits/${hit.objectID}`)
      .then(({data}) => {
        this.loadHits();
      });
  }

  componentWillMount() {
    this.loadHits();
  }

  render() {

    return (
      <table className="table table-hover">
        <thead>
          <tr className="Row row">
            <th className="col-9"></th>
            <th className="col"></th>
            <th className="col"></th>
          </tr>
        </thead>
        <tbody>
          {this
            .state
            .hits
            .filter((item) => (item.story_title || item.title))
            .map((each, index) => (
              <tr key={index} className="Row row">
                <td
                  onClick={() => window.open(!each.story_url
                  ? each.url
                  : each.story_url)}
                  className="Title col-9 px-5">
                  <b>
                    {!each.story_title
                      ? each.title
                      : each.story_title}
                  </b>
                  <span className="Author px-2">{`-   ${each.author}   -`}</span>
                </td>
                <td
                  onClick={() => window.open(!each.story_url
                  ? each.url
                  : each.story_url)}
                  className="Time col">{moment(each.created_at).format("HH:mm a")}</td>
                <td className="col"><i
                  onClick={this
                .deleteHits
                .bind(this, each)}
                  className="ion-trash-a"/></td>
              </tr>
            ))
}
        </tbody>
      </table>
    );
  }
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">HN Feed</h1>
          <h2 className="App-title">{`We <3 hacker news!`}</h2>
        </header>
        <TabletHits/>
      </div>
    );
  }
}

export default App;
