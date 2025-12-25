import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Product document first
      S.listItem()
        .title('Product')
        .child(
          S.document()
            .schemaType('product')
            .documentId('product')
        ),
      // Orders list
      S.listItem()
        .title('Orders')
        .child(
          S.documentTypeList('order')
            .title('Orders')
            .defaultOrdering([{ field: 'orderedAt', direction: 'desc' }])
        ),
      // Divider
      S.divider(),
      // All other documents
      ...S.documentTypeListItems().filter(
        (listItem) => {
          const id = listItem.getId()
          return id !== 'product' && id !== 'order'
        }
      ),
    ])
