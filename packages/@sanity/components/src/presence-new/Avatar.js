import React, {useState, useEffect} from 'react'
import userStore from 'part:@sanity/base/user'
import PropTypes from 'prop-types'
import colorHasher from '../presence/colorHasher'
import styles from './styles/Avatar.css'
import {useId} from '@reach/auto-id'

export default function Avatar({userId, sessionId, position, scrollToField, status, size}) {
  // we need to scope the value of the id attributes here
  const elementId = useId()
  const [user, setUser] = useState({})
  useEffect(() => {
    if (userId) {
      userStore.getUser(userId).then(result => {
        setUser(result)
      })
    }
  }, [user])

  function handleScrollToField(event) {
    if (scrollToField) {
      scrollToField(event)
    }
  }

  const isAnimating = !position && status === 'editing'

  return (
    <div
      className={styles.root}
      onClick={handleScrollToField}
      data-dock={position}
      style={{color: colorHasher(sessionId)}}
      aria-label={user.displayName}
    >
      <div className={`${styles.avatar} ${styles[`size_${size}`]}`} data-status={status}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse
            cx="16"
            cy="16"
            rx="15"
            ry="15"
            transform="rotate(90 16 16)"
            stroke="currentColor"
            className={`
                ${styles.border}
                ${isAnimating && styles.isAnimating}
              `}
          />
          <ellipse cx="16" cy="16" rx="14" ry="14" transform="rotate(-90 16 16)" fill="white" />
          <circle
            className={styles.avatarImage}
            cx="16"
            cy="16"
            r="13"
            fill={user.imageUrl ? `url(#${`${elementId}_${userId}-image-url`})` : 'currentColor'}
          />
          <defs>
            <pattern
              id={`${elementId}_${userId}-image-url`}
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              {user.imageUrl && <image href={user.imageUrl} width="1" height="1" />}
            </pattern>
          </defs>
        </svg>
      <div className={styles.arrow} data-dock={position}>
        <svg viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 6.4H9.6L5.44 0.853333C5.12 0.426666 4.48 0.426666 4.16 0.853333L0 6.4Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
    </div>
  )
}

Avatar.propTypes = {
  userId: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['top', 'bottom', null]),
  scrollToField: PropTypes.func,
  size: PropTypes.string,
  status: PropTypes.oneOf(['online', 'editing', 'inactive'])
}

Avatar.defaultProps = {
  position: null,
  scrollToField: null,
  size: 'small',
  status: 'online'
}
