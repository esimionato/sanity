import config from 'config:sanity'
import React from 'react'

import styles from './root.css'

function SanityRoot() {
  return <div className={styles.root}>SanityRoot: {config.api.projectId}</div>
}

export default SanityRoot
