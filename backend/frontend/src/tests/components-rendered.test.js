import { render, screen } from "@testing-library/react";
import Menu from "../components/Menu.js";
import Search from "../components/Search.js";
import SearchResults from "../components/SearchResults.js";

// tests to see if all the components render

it("renders the Menu component", () => {
	render(<Menu />);
	const menuElement = screen.getByTestId("menuTest");
	expect(menuElement).toBeInTheDocument();
});

it("renders the Search component", () => {
	render(<Search />);
	const searchElement = screen.getByTestId("searchTest");
	expect(searchElement).toBeInTheDocument();
});

it("renders the SearchResults component", () => {
	render(<SearchResults />);
	const searchResultsElement = screen.getByTestId("searchResultsTest");
	expect(searchResultsElement).toBeInTheDocument();
});
