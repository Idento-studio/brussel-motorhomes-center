import {defineField, defineType} from 'sanity'

export const merk = defineType({
  name: 'merk',
  title: 'Merk',
  type: 'document',
  description:
    'De lijst van merken die je kan kiezen bij een camper te koop. Zie je het merk dat je zoekt niet in de lijst? Typ de naam en kies "Nieuwe aanmaken" — dat merk staat vanaf dan ook klaar voor de volgende camper.',
  fields: [
    defineField({
      name: 'naam',
      title: 'Merknaam',
      type: 'string',
      description: 'Bv. "Benimar" of "Blucamp".',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {title: 'naam'},
  },
})
