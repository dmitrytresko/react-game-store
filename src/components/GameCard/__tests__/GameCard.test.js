import React from "react";
import { render } from "@testing-library/react";
import GameCard from "../GameCard";
import { Provider } from 'react-redux';
import fifa21Img from "../assets/img/games/ps/fifa21.png";
import fiveStars from "../assets/img/card-items/five-stars.jpg";

describe("Game card", () => {
  const mockProps = {
    gameDetails: {
      id: 100,
      name: "Game Name",
      company: "Company Name",
      path: fifa21Img,
      rating: fiveStars,
      price: 99.99,
      age: 0,
      genre: "Genre Name",
      metaRating: 99
    },
    openEditGameModalState: jest.fn()
  }

  it("should render Game card component", () => {
    const store = {
      getState: jest.fn(() => ({})),
      dispatch: jest.fn(),
      subscribe: jest.fn(),
    };

    jest.mock('react-redux', () => {
      return {
        ...jest.requireActual('react-redux'),
        useSelector: jest.fn().mockImplementation(() => ({})),
        useDispatch: () => jest.fn(),
      };
    });

    const { container } = render(
      <Provider store={store}>
        <GameCard {...mockProps} />
      </Provider>
    );

    expect(container).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  })
})
