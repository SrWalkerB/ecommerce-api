
interface ICreateProductData{
    idProduct: string,
    idCompany: string,
    name: string,
    description: string,
    price: number,
    type: string,
    stock: number,
    image: string
}

interface IUpdateProductData{
    idProduct: string,
    idCompany: string,
    name?: string,
    description?: string,
    price?: number,
    type?: string,
    stock?: number,
    image?: string
}

export {
  ICreateProductData,
  IUpdateProductData
}
