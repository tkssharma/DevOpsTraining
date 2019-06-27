import React from 'react'
import $ from 'jquery'; 
import './assets/index.css';
import Header from './components/partails/header';
import Hero from './components/partails/hero';
import TitleList from './components/titleList';

class App extends React.Component{
  
   constructor(props) {
     super(props)
     this.state = {
      data: []
     }
   }
	performSearch(e) {
		// stop form from submitting
		e.preventDefault();
		// get the value
		const val = $('.Search input').val();
		const apiKey = '87dfa1c669eea853da609d4968d294be'

		$.ajax({
      url: 'https://api.themoviedb.org/3/search/multi?query=' + val + '&api_key=' + apiKey,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
	}
	componentDidUpdate() {
	}
	render() {
		if(this.state.data.results) {
			console.log(this.state.data);
		}
		return (
			<div>
				<Header onSubmit={this.performSearch} />
				<Hero />
				<TitleList title="Top TV picks for Jack" url='discover/tv?sort_by=popularity.desc&page=1' />
				<TitleList title="Trending now" url='discover/movie?sort_by=popularity.desc&page=1' />
				<TitleList title="Most watched in Horror" url='genre/27/movies?sort_by=popularity.desc&page=1' />
				<TitleList title="Sci-Fi greats" url='genre/878/movies?sort_by=popularity.desc&page=1' />
				<TitleList title="Comedy magic" url='genre/35/movies?sort_by=popularity.desc&page=1' />
			</div>
		);
  }
}

export default App;

/*


*/
