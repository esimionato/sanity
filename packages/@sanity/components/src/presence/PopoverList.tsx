/* eslint-disable react/no-multi-comp */
import React from 'react'
import styles from './PopoverList.css'
import ListItem from './ListItem'
import {User, Size, Position} from './types'
import {Tooltip} from 'react-tippy'
import CogIcon from 'part:@sanity/base/cog-icon'

type Props = {
  userList: User[]
  avatarSize?: Size
  position?: 'top' | 'bottom'
  arrowPosition?: Position
  trigger?: 'mouseenter' | 'click'
  children?: any
  distance?: number
  disabled?: boolean
  isGlobal?: boolean
  projectId?: string
}

export default function PopoverList({
  userList = [],
  position = 'top',
  distance = 10,
  avatarSize,
  trigger = 'mouseenter',
  children,
  disabled = false,
  arrowPosition,
  isGlobal = false,
  projectId
}: Props) {
  const html = (
    <div className={styles.inner}>
      {isGlobal && userList.length < 1 && (
        <div className={styles.header}>
          <h2 className={styles.title}>No one's here!</h2>
          <p className={styles.subtitle}>Invite more collaborators to see their online statuses.</p>
        </div>
      )}
      {userList.length > 0 && (
        <ul className={styles.userList}>
          {userList.map(user => (
            <li key={user.sessionId}>
              <ListItem
                id={user.identity}
                status={user.status}
                sessions={user?.sessions}
                size={avatarSize}
              />
            </li>
          ))}
        </ul>
      )}
      {isGlobal && projectId && (
        <div className={styles.manageMembers}>
          <a
            href={`https://manage.sanity.io/projects/${projectId}/team`}
            className={styles.manageLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Manage members</span>
            <CogIcon />
          </a>
        </div>
      )}
    </div>
  )
  return (
    <div className={styles.root}>
      <Tooltip
        useContext
        title="Online collaborators"
        html={html}
        disabled={disabled}
        interactive
        position={position}
        trigger={trigger}
        arrow
        theme="light"
        distance={distance}
        className={styles.tooltip}
      >
        <div className={styles.outer}>{children}</div>
      </Tooltip>
    </div>
  )
}
