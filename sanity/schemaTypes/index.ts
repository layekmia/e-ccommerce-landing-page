import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import productImage from './productImage'
import benefit from './benefit'
import howToUseStep from './howToUseStep'
import ingredient from './ingredient'
import review from './review'
import faq from './faq'
import problemSolution from './problemSolution'
import order from './order'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    product,
    productImage,
    benefit,
    howToUseStep,
    ingredient,
    review,
    faq,
    problemSolution,
    order,
  ],
}
