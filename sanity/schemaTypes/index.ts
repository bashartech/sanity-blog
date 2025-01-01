import { type SchemaTypeDefinition } from 'sanity'
import Books from '../books'
import blog from '../blog'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Books, blog],
}
