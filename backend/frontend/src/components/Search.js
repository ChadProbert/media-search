import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-grid-system";
import SearchIcon from "@mui/icons-material/Search";

// stylesheets
import "./css/Search.css";

/* takes in a search and filter input from a user and sends a fetch request 
to the iTunes Store API based on the input */
class Search extends Component {
	constructor(props) {
		super(props);

		// initial states
		this.state = { search: "", results: "", type: "" };

		this.handleSearch = this.handleSearch.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleMediaType = this.handleMediaType.bind(this);
	}

	// captures the user's search input
	handleSearch(e) {
		this.setState({ search: e.target.value });
	}

	// captures the user's filter input
	handleMediaType(e) {
		this.setState({ type: e.target.value });
	}

	async handleSubmit(e) {
		e.preventDefault();
		// fetches data from the iTunes Store API based on the user's input
		await fetch(
			`https://itunes.apple.com/search?term=${this.state.search}&media=${this.state.type}&limit=12`
		)
			.then((res) => res.json())
			// stores the data returned inside the results state
			.then((results) => this.setState({ results: results }))
			/* refreshes the page */
			.then(() => window.location.reload(false))
			.catch((error) => console.log("Error:", error));

		// stores the results data in a config file (search-results.json)
		await fetch("/searches/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				results: this.state.results,
			}),
		}).catch((error) => console.log("Error", error));
	}

	// creating the UI and adding the relevant event handlers to the user inputs
	/* gave each radio button the media values provided by the Itunes Store API
	documentation */
	// data-test-id "searchTest" (line 65) is used for a frontend unit test
	render() {
		return (
			<Container fluid data-testid="searchTest">
				<Form onSubmit={this.handleSubmit}>
					<Form.Control
						type="text"
						placeholder="Search..."
						onChange={this.handleSearch}
						className="searchBar"
					></Form.Control>
					<br />
					<div className="filterSearchBox">
						<h3 className="filterHeading">Filter</h3>
						<div className="form-check form-check-inline">
							<input
								className="form-check-input"
								type="radio"
								value="movie"
								onClick={this.handleMediaType}
							></input>
							<label className="form-check-label">Movie</label>
						</div>
						<div className="form-check form-check-inline">
							<input
								className="form-check-input"
								type="radio"
								value="podcast"
								onClick={this.handleMediaType}
							></input>
							<label className="form-check-label">Podcast</label>
						</div>
						<div className="form-check form-check-inline">
							<input
								className="form-check-input"
								type="radio"
								value="music"
								onClick={this.handleMediaType}
							></input>
							<label className="form-check-label">Music</label>
						</div>
						<div className="form-check form-check-inline">
							<input
								className="form-check-input"
								type="radio"
								value="musicVideo"
								onClick={this.handleMediaType}
							></input>
							<label className="form-check-label">Music Video</label>
						</div>
						<div className="form-check form-check-inline">
							<input
								className="form-check-input"
								type="radio"
								value="audiobook"
								onClick={this.handleMediaType}
							></input>
							<label className="form-check-label">Audio Book</label>
						</div>
						<div className="form-check form-check-inline">
							<input
								className="form-check-input"
								type="radio"
								value="shortFilm"
								onClick={this.handleMediaType}
							></input>
							<label className="form-check-label">Short Film</label>
						</div>
						<div className="form-check form-check-inline">
							<input
								className="form-check-input"
								type="radio"
								value="tvShow"
								onClick={this.handleMediaType}
							></input>
							<label className="form-check-label">TV Show</label>
						</div>
						<div className="form-check form-check-inline">
							<input
								className="form-check-input"
								type="radio"
								value="software"
								onClick={this.handleMediaType}
							></input>
							<label className="form-check-label">Software</label>
						</div>
						<div className="form-check form-check-inline">
							<input
								className="form-check-input"
								type="radio"
								value="ebook"
								onClick={this.handleMediaType}
							></input>
							<label className="form-check-label">eBook</label>
						</div>
					</div>
					<br />
					<Button type="submit" className="searchButton">
						Search <SearchIcon fontSize="small" />
					</Button>
				</Form>
			</Container>
		);
	}
}

export default Search;

/* references:

https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/

https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/Searching.html#//apple_ref/doc/uid/TP40017632-CH5-SW1

https://getbootstrap.com/docs/5.0/forms/checks-radios/

https://react-bootstrap.netlify.app/components/buttons/

https://blog.logrocket.com/a-guide-to-react-onclick-event-handlers-d411943b14dd/

https://mui.com/components/material-icons/

*/
