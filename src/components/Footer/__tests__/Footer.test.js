import React from "react";
import { render } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer", () => {
  it("should render Footer component", () => {
    const { container, getByText, getAllByRole } = render(<Footer />);

    const links = container.getElementsByClassName('footer__link');
    const newLinks = getAllByRole('link');

    expect(links.length).toEqual(5);
    expect(newLinks.length).toEqual(5);
    expect(getByText('Incredible convenient')).toBeTruthy();
    expect(container).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  })
})
