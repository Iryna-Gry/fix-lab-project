import type { ProductItem } from './ProductsSection'

export interface ProductItemProps {
  productItem: ProductItem
}

const GeneralInfo: React.FC<ProductItemProps> = ({ productItem }) => {
  return (
    <div className='mt-8 flex justify-between gap-8 max-lg:flex-col max-lg:justify-center'>
      <h2 className='font-exo_2 max-md:text-md text-2xl font-semibold'>
        {productItem.data.attributes.title}
      </h2>
    </div>
  )
}

export default GeneralInfo
