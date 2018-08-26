import './App.scss';
import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const TOP_FREE_API = 'https://itunes.apple.com/hk/rss/topfreeapplications/limit=100/json';
const RECOMMEND_API = 'https://itunes.apple.com/hk/rss/topgrossingapplications/limit=10/json';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topfreeapplications: [],
      recommendApplications: [],
      topfreeItems: [],
      recommendItems: []
    };
    this.filterList = this.filterList.bind(this);
  }

  componentDidMount() {
    fetch(TOP_FREE_API )
      .then(response => response.json())
      .then(data =>
        this.setState({
          topfreeapplications: data.feed.entry,
          topfreeItems: data.feed.entry
        })
      );
    fetch(RECOMMEND_API )
      .then(response => response.json())
      .then(data =>
        this.setState({
          recommendApplications: data.feed.entry,
          recommendItems: data.feed.entry
        })
      );
  }

  filterList(event) {
    let updatedTopfreeapp = this.state.topfreeapplications;
    let updatedRecommendApp = this.state.recommendApplications;
    updatedTopfreeapp = updatedTopfreeapp.filter((item) =>{
      return item["summary"].label.toLowerCase().search(event.target.value.toLowerCase()) !== -1 ||
             item["im:name"].label.toLowerCase().search(event.target.value.toLowerCase()) !== -1 ||
             item["im:artist"].label.toLowerCase().search(event.target.value.toLowerCase()) !== -1 ||
             item["category"].attributes.label.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
    });
    updatedRecommendApp = updatedRecommendApp.filter((item) =>{
      return item["summary"].label.toLowerCase().search(event.target.value.toLowerCase()) !== -1 ||
             item["im:name"].label.toLowerCase().search(event.target.value.toLowerCase()) !== -1 ||
             item["im:artist"].label.toLowerCase().search(event.target.value.toLowerCase()) !== -1 ||
             item["category"].attributes.label.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
    });
    this.setState({
      topfreeItems: updatedTopfreeapp,
      recommendItems: updatedRecommendApp
    });

  }

  render() {
    return (
      <div className="app">
        <div className="search-bar">
          <FontAwesomeIcon icon="search" />
          <input placeholder="search" onChange={this.filterList}/>
        </div>
        <div className="app-list">
          <div className="recommend-10">
            <div className="title font-size-20 padding-20">推介</div>
            <div className="recommend-apps-list">
              {this.state.recommendItems && (
                this.state.recommendItems.map((recommendapp, index) =>
                  <div className="recommend-app">
                    <div className="app-image padding-5">
                      <img src={recommendapp["im:image"][2].label} />
                    </div>
                    <div className="app-desc-block padding-5">
                      <div className="app-name black font-size-12">{recommendapp["im:name"].label}</div>
                      <div className="app-category font-size-10">{recommendapp["category"].attributes.label}</div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="top-free-100">
            <ul>
              {this.state.topfreeItems && (
                this.state.topfreeItems.map((freeapp, index) =>
                  <LazyLoad height={200} offset={100}
                  >
                    <div className="free-app">
                      <div className="app-number padding-5">{index + 1}</div>
                      <div className="app-image padding-5">
                        <img src={freeapp["im:image"][2].label} />
                      </div>
                      <div className="app-desc-block padding-5">
                        <div className="app-name black font-size-14">{freeapp["im:name"].label}</div>
                        <div className="app-category font-size-12">{freeapp["category"].attributes.label}</div>
                      </div>
                    </div>
                  </LazyLoad>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }

}

export default App;

library.add(faSearch);
