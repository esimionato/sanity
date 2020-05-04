import * as React from 'react'
import {sortBy} from 'lodash'

const OVERLAY_STYLE: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none'
}

const ITEM_STYLE = {
  display: 'inline-block',
  background: 'rgba(255, 0, 0, 0.25)',
  overflow: 'hidden',
  textAlign: 'right',
  pointerEvents: 'all',
  position: 'absolute',
  outline: '1px solid #f00'
}

export function AbsoluteOverlayRenderer(props) {
  const {items} = props
  return items.map(item => {
    return (
      <div
        key={item.id}
        style={{
          ...ITEM_STYLE,
          ...item.rect
        }}
      >
        {item.id}
      </div>
    )
  })
}
