import {Icon} from '@sanity/icons'
import type {StructureResolver} from 'sanity/structure'
import {HoeHetWerkt} from './schemaTypes/components/HoeHetWerkt'

function HelpIcon() {
  return <Icon symbol="help-circle" />
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Hoe het werkt')
        .icon(HelpIcon)
        .child(S.component(HoeHetWerkt).title('Hoe het werkt').id('hoe-het-werkt')),
      S.divider(),
      ...S.documentTypeListItems(),
    ])
