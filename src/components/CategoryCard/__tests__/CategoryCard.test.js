import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router, Route } from "react-router-dom";
import CategoryCard from "../CategoryCard";
import playStationColorfulLogo from "../../assets/img/playstation-colorful.jpg";
import playStationLightLogo from "../../assets/img/playstation-light.jpg";

describe("Category card", () => {
  let history;
  let mockProps;

  beforeEach(() => {
    history = createMemoryHistory();

    mockProps = {
      path: playStationColorfulLogo,
      pathLight: playStationLightLogo,
      altName: "Colorful Logo",
      altNameLight: "Light Logo",
      name: "Platform",
      route: "/products/ps"
    }
  })

  it("should render Category card component", () => {
    const { container, getAllByRole } = render(
      <Router history={history}>
        <Route path="/">
          <CategoryCard {...mockProps} />
        </Route>
      </Router>
    );

    const images = getAllByRole('img');

    expect(images.length).toEqual(2);
    expect(container).toBeTruthy();
    expect(container).toMatchSnapshot();
  })

  it("should redirect to corresponding Product page", () => {
    const { container } = render(
      <Router history={history}>
        <Route path="/">
          <CategoryCard {...mockProps} />
        </Route>
      </Router>
    );

    const card = container.getElementsByClassName('category-card')[0];

    fireEvent.click(card);
    expect(history.location.pathname).toEqual(mockProps.route);
  })
})

