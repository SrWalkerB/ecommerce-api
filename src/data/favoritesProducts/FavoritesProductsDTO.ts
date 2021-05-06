
interface IListAllFavoritesProducts{
    idCompany: string,
    idClient: string
}

interface ICreateAndRemoveFavoritesProducts{
    idProduct: string,
    idCompany: string,
    idClient: string
}

export {
  IListAllFavoritesProducts,
  ICreateAndRemoveFavoritesProducts
}
