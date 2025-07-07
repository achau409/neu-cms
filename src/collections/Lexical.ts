import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { BoldFeature, HeadingFeature } from '@payloadcms/richtext-lexical'

export const createLexicalEditor = () => {
  return lexicalEditor({
    features: [BoldFeature(), HeadingFeature()],
  })
}
