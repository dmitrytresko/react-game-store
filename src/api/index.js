import axios from "axios";

export const callSearchValue = async (value) => {
  try {
    const response = await axios.get("http://localhost:4000/games");

    return response.data.filter((item) =>
      item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
  } catch (err) {
    console.error(err);
  }
};

export const callSearchValueWithPsCategory = async (value) => {
  try {
    const response = await axios.get("http://localhost:4000/games");

    const psResponse = response.data.filter(
      (item) => item.id >= 100 && item.id < 200
    );

    return psResponse.filter((item) =>
      item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
  } catch (err) {
    console.error(err);
  }
};

export const callSearchValueWithXboxCategory = async (value) => {
  try {
    const response = await axios.get("http://localhost:4000/games");

    const xboxResponse = response.data.filter(
      (item) => item.id >= 200 && item.id < 300
    );

    return xboxResponse.filter((item) =>
      item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
  } catch (err) {
    console.error(err);
  }
};

export const callSearchValueWithPcCategory = async (value) => {
  try {
    const response = await axios.get("http://localhost:4000/games");

    const pcResponse = response.data.filter((item) => item.id >= 300);

    return pcResponse.filter((item) =>
      item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
  } catch (err) {
    console.error(err);
  }
};
