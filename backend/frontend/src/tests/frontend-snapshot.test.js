import React from "react";
import renderer from "react-test-renderer";
import Search from "../components/Search.js";

describe("snapshot for Search component", () => {
	test("frontend snapshot", () => {
		const renderedComponent = renderer.create(<Search />).toJSON();
		/* tests to see if the snapshot stored inside the project directory matches 
		with what is in the Search.js file during the test */
		expect(renderedComponent).toMatchSnapshot();
	});
});

/* references: 

my own work from level 2 task 15

https://www.youtube.com/watch?v=qOaGoujjc3M&ab_channel=SoftwareTestingHelp
 
*/
