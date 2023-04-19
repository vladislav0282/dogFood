/* eslint-disable linebreak-style */

class DogFoodApi {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl

    // this.token = ''
  }

  // eslint-disable-next-line class-methods-use-this
  getAuthorizationHeader(token) {
    return `Bearer ${token}`
  }

  // setToken(token) {
  //   this.token = token
  // }

  // eslint-disable-next-line class-methods-use-this
  checkToken(token) {
    if (!token) throw new Error('Отсутствует токен')
  }

  async Signin(data) {
    const res = await fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (res.status === 401) {
      throw new Error(
        `Авторизация не пройдена непраильный логин или пароль. Status: ${res.status}`,
      )
    } if (res.status === 404) {
      throw new Error(`Авторизация не пройдена пользователь не найден. Status: ${res.status}`)
    } if (res.status >= 300) {
      throw new Error(`Ошибка. Status: ${res.status}`)
    }
    return res.json()
  }

  async Signup(data) {
    const res = await fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return res.json()
  }

  async getProductsByIds(ids, token) {
    this.checkToken(token)
    return Promise.all(ids.map((id) => fetch(`${this.baseUrl}/products/${id}`, {
      headers: {
        authorization: this.getAuthorizationHeader(token),
      },
    }).then((res) => res.json())))
  }

  async getAllProducts(search, token) {
    this.checkToken(token)
    const res = await fetch(`${this.baseUrl}/products/search?query=${search}`, {
      headers: {
        authorization: this.getAuthorizationHeader(token),
      },
    })
    if (res.status === 401) {
      throw new Error(
        `Авторизация не пройдена непраильный логин или пароль. Status: ${res.status}`,
      )
    } if (res.status === 404) {
      throw new Error(`Авторизация не пройдена пользователь не найден. Status: ${res.status}`)
    } if (res.status >= 300) {
      throw new Error(`Ошибка. Status: ${res.status}`)
    }
    return res.json()
  }

  async getUser(token) {
    this.checkToken(token)
    const res = await fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.getAuthorizationHeader(token),
      },
    })
    if (res.status === 401) {
      throw new Error(
        `Авторизация не пройдена непраильный логин или пароль. Status: ${res.status}`,
      )
    } if (res.status === 404) {
      throw new Error(`Авторизация не пройдена пользователь не найден. Status: ${res.status}`)
    } if (res.status >= 300) {
      throw new Error(`Ошибка. Status: ${res.status}`)
    }
    return res.json()
  }

  async getProductById(productId, token) {
    const res = await fetch(`${this.baseUrl}/products/${productId}`, {
      headers: {
        authorization: this.getAuthorizationHeader(token),
      },
    })

    if (res.status === 401) {
      throw new Error(
        `Авторизация не пройдена непраильный логин или пароль. Status: ${res.status}`,
      )
    } if (res.status === 404) {
      throw new Error(`Авторизация не пройдена пользователь не найден. Status: ${res.status}`)
    } if (res.status >= 300) {
      throw new Error(`Ошибка. Status: ${res.status}`)
    }
    return res.json()
  }

  async getRewiewsByProductId(id, token) {
    const res = await fetch(`${this.baseUrl}/products/review/${id}`, {
      headers: {
        authorization: this.getAuthorizationHeader(token),
      },
    })
    if (res.status === 401) {
      throw new Error(
        `Авторизация не пройдена непраильный логин или пароль. Status: ${res.status}`,
      )
    } if (res.status === 404) {
      throw new Error(`Авторизация не пройдена пользователь не найден. Status: ${res.status}`)
    } if (res.status >= 300) {
      throw new Error(`Ошибка. Status: ${res.status}`)
    }
    return res.json()
  }

  // https://api.react-learning.ru/products/review/${id}

  // async getProductById(productId, token) {
  //   this.checkToken(token)
  //   const res = await fetch(`${this.baseUrl}/products/${productId}`, {
  //     headers: {
  //       authorization: this.getAuthorizationHeader(token),
  //     },
  //   })

  //   if (res.status === 401) {
  //     throw new Error(
  //       `Авторизация не пройдена непраильный логин или пароль. Status: ${res.status}`,
  //     )
  //   } if (res.status === 404) {
  //     throw new Error(`Авторизация не пройдена пользователь не найден. Status: ${res.status}`)
  //   } if (res.status >= 300) {
  //     throw new Error(`Ошибка. Status: ${res.status}`)
  //   }
  //   return res.json()
  // }
}
export const dogFoodApi = new DogFoodApi({ baseUrl: 'https://api.react-learning.ru' })
