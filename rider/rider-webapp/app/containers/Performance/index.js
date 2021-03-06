/*-
 * <<
 * wormhole
 * ==
 * Copyright (C) 2016 - 2017 EDP
 * ==
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * >>
 */

import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import Helmet from 'react-helmet'

import { loadPerformances } from './action'
import { selectPerformances } from './selectors'

export class Performance extends React.Component {
  componentWillMount () {
    const projectId = this.props.router.params.projectId

    if (localStorage.getItem('loginRoleType') === 'admin') {
      this.props.onLoadPerformances(projectId, 'admin')
    } else if (localStorage.getItem('loginRoleType') === 'user') {
      this.props.onLoadPerformances(projectId, 'user')
    }
  }

  render () {
    const { performances } = this.props

    let performancesUrl = ''
    if (typeof (performances) === 'object') {
      performancesUrl = performances.dashboardUrl
    }

    return (
      <div>
        <Helmet title="Performance" />
        <iframe src={performancesUrl} frameBorder="0" width="100%" height="915"></iframe>
      </div>
    )
  }
}

Performance.propTypes = {
  router: React.PropTypes.any,
  onLoadPerformances: React.PropTypes.func,
  performances: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool
  ])
}

export function mapDispatchToProps (dispatch) {
  return {
    onLoadPerformances: (projectId, roleType) => dispatch(loadPerformances(projectId, roleType))
  }
}

const mapStateToProps = createStructuredSelector({
  performances: selectPerformances()
})

export default connect(mapStateToProps, mapDispatchToProps)(Performance)
