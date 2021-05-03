
interface ICreateProductServices{
    name: string,
    description: string,
    price: number,
    type: string,
    stock: number,
    image: string
}

interface IUpdateProductServices{
    idProduct: string,
    name?: string,
    description?: string,
    price?: number,
    type?: string,
    stock?: number,
    image?: string
}

export {
  ICreateProductServices,
  IUpdateProductServices
}
