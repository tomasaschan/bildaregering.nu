import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Instructions from '../Instructions'
import PartyChooser from '../PartyChooser'
import './index.css'
import MajorityIndicator from '../MajorityIndicator'
import PartyList from '../PartyList'

const App = ({ anythingSelected }) => (
  <div className="app">
    {anythingSelected ? <MajorityIndicator /> : <Instructions />}
    <PartyChooser />
    <PartyList />
  </div>
)
App.propTypes = {
  anythingSelected: PropTypes.bool.isRequired
}

const mapStateToProps = ({ parties }) => ({
  anythingSelected: parties.filter(({ selected }) => selected).length > 0
})

export default connect(mapStateToProps)(App)
