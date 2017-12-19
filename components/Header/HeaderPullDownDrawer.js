import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { decode } from 'he'
import { reject } from 'lodash'
import styled from 'styled-components/native'

import Check from './Check'
import { HeaderButtonLabel } from './HeaderButton'
import { AbsoluteFill } from '../UI/Layout'
import HeaderPullDownDrawerOption, { Select, SelectOption } from './HeaderPullDownDrawerOption'

import { Units } from '../../constants/Style'

import navigationService from '../../utilities/navigationService'

const LINKS = [
  { title: 'Your profile', key: 'me' },
  { title: 'Feed', key: 'feed' },
  { title: 'Explore', key: 'explore' },
]

const SelectDrawer = styled(AbsoluteFill)`
  padding-horizontal: ${Units.base};
  padding-top: ${
    // Line up with underlying header
    Units.statusBarHeight + 0.5
  };
  justify-content: flex-start;
`

export default class HeaderPullDownDrawer extends Component {
  static propTypes = {
    title: PropTypes.string,
  }

  static defaultProps = {
    title: null,
  }

  links = () =>
    reject(LINKS, { key: navigationService.getCurrentRouteName() })

  render() {
    const { title } = this.props

    return (
      <SelectDrawer>
        <Select>
          <SelectOption>
            <HeaderButtonLabel active>
              {decode(title || '—')}
            </HeaderButtonLabel>

            <Check />
          </SelectOption>

          {this.links().map(option => (
            <HeaderPullDownDrawerOption
              key={option.key}
              href={option.key}
              title={option.title}
            />
          ))}
        </Select>
      </SelectDrawer>
    )
  }
}
