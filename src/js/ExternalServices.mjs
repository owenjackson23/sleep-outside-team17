const baseURL = import.meta.env.VITE_SERVER_URL;

export async function convertToJson(response) {
  const jsonResponse = await response.json();

  if (response.ok) {
    return jsonResponse;
  } else {
    throw {
      name: "servicesError",
      message: jsonResponse,
    };
  }
}

export default class ExternalServices {
  constructor() {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;

    // return fetch(this.path)
    //   .then(convertToJson)
    //   .then((data) => data);
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;

    // const products = await this.getData();
    // return products.find((item) => item.Id === id);
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    };
    return await fetch(`${baseURL}checkout/`, options).then(convertToJson);
  }
}
