import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { RadialChart } from 'react-vis'

import { toggleParty } from '../../store/actions'

import './index.css'

const PartyChooser = ({ parties, toggleParty, selectedSeats }) => (
  <div className="party-chooser">
    <RadialChart
      data={parties}
      height={300}
      width={300}
      colorType="literal"
      onValueClick={toggleParty}
    />
    <span>{selectedSeats}</span>
  </div>
)

PartyChooser.propTypes = {
  parties: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      angle: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
      radius: PropTypes.number.isRequired
    })
  ),
  toggleParty: PropTypes.func.isRequired,
  selectedSeats: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  parties: state.parties.map(({ name, seats, color, selected = false }) => ({
    label: name,
    angle: seats,
    color,
    radius: selected ? 1 : 0.8
  })),
  selectedSeats: state.parties
    .filter(({ selected }) => selected)
    .map(({ seats }) => seats)
    .reduce((a, b) => a + b, 0)
})

const mapDispatchToProps = dispatch => ({
  toggleParty: value => dispatch(toggleParty(value.label))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PartyChooser)
