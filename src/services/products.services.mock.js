import { faker } from '@faker-js/faker'

const mockProducts = []

for (let index = 0; index < 100; index++) {
    mockProducts.push({
        products: faker.commerce.product()
    })
}

const productDaoMock = {
    readMany: async ({}) => {
        return mockProducts
    }
}

class ProductServiceMock {
    constructor (dao) {
        this.dao = dao
    }

    readMany ({}) {
        this.dao.readMany({})
    }
}

export const productServiceMock = new ProductServiceMock(productDaoMock)

