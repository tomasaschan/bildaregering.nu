import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './index.css'

const Majority = () => (
  <div className="majority banner">
    <h1>Ja!</h1>
    <p>Detta regerings&shy;alternativ har majoritet!</p>
  </div>
)

const Minority = () => (
  <div className="minority banner">
    <h1>Inte riktigt...</h1>
    <p>
      Detta regerings&shy;alternativ har inte majoritet, och behöver därför
      hitta fler samarbetspartners för att få igenom sina förslag.
    </p>
  </div>
)

const Conflict = () => (
  <div className="conflict banner">
    <h1>Sorry!</h1>
    <p>
      I detta regeringsalternativ ingår minst två partier som lovat att inte
      samarbeta med varandra. Bryt löften, eller hitta en annan konstellation!
    </p>
  </div>
)

const MajorityIndicator = ({ isConflict, isMajority }) =>
  isConflict ? <Conflict /> : isMajority ? <Majority /> : <Minority />

MajorityIndicator.propTypes = {
  isMajority: PropTypes.bool.isRequired,
  isConflict: PropTypes.bool.isRequired
}

const isConflict = selectedParties =>
  selectedParties
    .map(({ name }) => name)
    .some(party =>
      selectedParties.flatMap(({ hated }) => hated).includes(party)
    )

const mapStateToProps = ({ parties }) => ({
  isMajority:
    parties
      .filter(({ selected }) => selected)
      .map(({ seats }) => seats)
      .reduce((a, b) => a + b) > 175,
  isConflict: isConflict(parties.filter(({ selected }) => selected))
})

export default connect(mapStateToProps)(MajorityIndicator)
