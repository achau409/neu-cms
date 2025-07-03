import { lexicalEditor, BlocksFeature } from '@payloadcms/richtext-lexical'

export const createLexicalEditor = () => {
  return lexicalEditor({
    features: ({ defaultFeatures }) => [...defaultFeatures],
  })
}
