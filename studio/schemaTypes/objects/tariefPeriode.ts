import {defineField, defineType} from 'sanity'

export const tariefPeriode = defineType({
  name: 'tariefPeriode',
  title: 'Tarieven voor dit seizoen',
  type: 'object',
  description: 'Typ enkel het getal (bv. 900 voor € 900,00). Laat een veld leeg als die periode niet geboekt kan worden in dit seizoen.',
  options: {columns: 3, collapsible: true, collapsed: false},
  fields: [
    defineField({name: 'weekend', title: 'Weekend', type: 'number'}),
    defineField({name: 'eenWeek', title: '1 week', type: 'number'}),
    defineField({name: 'tweeWeken', title: '2 weken', type: 'number'}),
    defineField({name: 'drieWeken', title: '3 weken', type: 'number'}),
    defineField({name: 'vierWeken', title: '4 weken', type: 'number'}),
    defineField({name: 'extraDag', title: 'Extra dag', type: 'number'}),
  ],
})
