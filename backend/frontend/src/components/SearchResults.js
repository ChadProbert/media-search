import React, { Component } from "react";
import { Container } from "react-grid-system";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Radio from "@mui/material/Radio";
import ClearIcon from "@mui/icons-material/Clear";

// stylesheets
import "./css/SearchResults.css";
import "./css/Favourites.css";

class SearchResults extends Component {
	constructor(props) {
		super(props);

		// initial states
		this.state = {
			loading: true,
			searches: null,
			favourites: [],
		};

		this.handleFavourited = this.handleFavourited.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	// captures the data found at /search each time the page is loaded
	async componentDidMount() {
		const url = "/search";
		const response = await fetch(url);
		const data = await response.json();
		this.setState({ searches: data[0].results.results, loading: false });
	}

	// captures the user's favourites
	async handleFavourited(e) {
		// captures the favourited item
		const favourited = await e.target.value;
		/* pushes the value of the radio button (name of song/book etc.) to the 
		favourites state array */
		this.setState({
			favourites: [...this.state.favourites, favourited],
		});
	}

	// removes an item from the favourites array
	async handleDelete(e) {
		// captures the deleted item
		const removed = await e.currentTarget.value;
		// finds the index number of the targeted item inside the favourites array
		const indexNumber = this.state.favourites.indexOf(removed);
		// removes the item with the specified index number from the array
		this.state.favourites.splice(indexNumber, 1);
		// triggers a re-render to update the UI
		this.setState({ favourites: this.state.favourites });
	}

	//renders the UI
	// maps out the search result data and user's favourites into the UI
	// data-test-id "searchResultsTest" (line 62) is used for a frontend unit test
	render() {
		return (
			<Container fluid data-testid="searchResultsTest">
				{this.state.loading || !this.state.searches ? (
					<div className="loadingIconDiv">
						<div className="loader">
							<div className="face">
								<div className="circle"></div>
							</div>
							<div className="face">
								<div className="circle"></div>
							</div>
						</div>
					</div>
				) : (
					<div className="listedSearchResultsDiv">
						<ul className="listedSearchResults">
							{this.state.searches.map((search, index) => (
								<li key={index}>
									<div className="searchResultBox">
										<a
											href={search.trackViewUrl}
											target="_blank"
											rel="noreferrer"
										>
											<div className="trackInfo">
												<h3 className="searchResultTrackName">
													{search.trackName}
												</h3>
												<h4 className="searchResultArtist">
													{search.artistName}
												</h4>

												<p className="searchResultGenre">
													{search.primaryGenreName}
												</p>
											</div>
										</a>
										<Radio
											value={search.trackName}
											className="likeButton"
											color="error"
											icon={<FavoriteIcon />}
											checkedIcon={<FavoriteIcon />}
											onClick={this.handleFavourited}
										></Radio>
									</div>
								</li>
							))}
						</ul>
					</div>
				)}

				<div className="favouritesDisplay">
					<h2 className="favouritesHeading">Favourites</h2>

					{!this.state.favourites.length ? (
						<p className="favouritesEmpty">No favourites added</p>
					) : (
						<ul>
							{this.state.favourites.map((favourite, index) => (
								<li key={index}>
									<div className="favouritesList">
										<p className="favouritesAdded">
											{favourite}
											<button
												className="removeButton"
												value={favourite}
												onClick={this.handleDelete}
											>
												<ClearIcon />
											</button>
										</p>
									</div>
								</li>
							))}
						</ul>
					)}
				</div>
			</Container>
		);
	}
}

export default SearchResults;

/* references:

https://www.npmjs.com/package/react-grid-system

https://react-bootstrap.github.io/

https://www.youtube.com/watch?v=T3Px88x_PsA

https://mui.com/

https://stackoverflow.com/questions/37435334/correct-way-to-push-into-state-array

*/
