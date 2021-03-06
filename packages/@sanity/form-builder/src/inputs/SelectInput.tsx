import React from 'react'
import Select from 'part:@sanity/components/selects/default'
import RadioSelect from 'part:@sanity/components/selects/radio'
import PatchEvent, {set} from '../PatchEvent'
import FormField from 'part:@sanity/components/formfields/default'
import {Type, Marker} from '../typedefs'
import {uniqueId, capitalize} from 'lodash'
const EMPTY_ITEM = {title: '', value: undefined}

function toSelectItem(option) {
  if (typeof option === 'object') {
    return option
  }
  return {title: capitalize(option), value: option}
}

type Props = {
  type: Type
  level: number
  value: string | null
  readOnly: boolean | null
  onChange: (arg0: PatchEvent) => void
  onFocus: () => void
  markers: Array<Marker>
}
export default class StringSelect extends React.Component<Props> {
  _input: (RadioSelect | Select) | null
  name = uniqueId('RadioName')
  static defaultProps = {
    value: ''
  }
  handleChange = (item: Record<string, any>) => {
    const {onChange} = this.props
    onChange(
      PatchEvent.from(set(typeof item === 'string' || typeof item === 'number' ? item : item.value))
    )
  }
  focus() {
    if (this._input) {
      this._input.focus()
    }
  }
  setInput = (input: (RadioSelect | Select) | null) => {
    this._input = input
  }
  render() {
    const {value, readOnly, markers, type, level, onFocus} = this.props
    const items = (type.options.list || []).map(toSelectItem)
    const currentItem = items.find(item => item.value === value)
    const isRadio = type.options && type.options.layout === 'radio'
    return (
      <FormField markers={markers} level={level} label={type.title} description={type.description}>
        {isRadio ? (
          <RadioSelect
            name={this.name}
            legend={type.title}
            items={items}
            onChange={this.handleChange}
            onFocus={onFocus}
            value={currentItem}
            direction={type.options.direction || 'vertical'}
            ref={this.setInput}
            readOnly={readOnly}
          />
        ) : (
          <Select
            label={type.title}
            value={currentItem}
            placeholder={type.placeholder}
            onChange={this.handleChange}
            onFocus={onFocus}
            items={[EMPTY_ITEM].concat(items)}
            ref={this.setInput}
            readOnly={readOnly}
          />
        )}
      </FormField>
    )
  }
}
