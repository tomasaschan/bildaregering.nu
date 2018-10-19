import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { RadialChart, makeVisFlexible } from 'react-vis'
import ChartistGraph from 'react-chartist'

import { toggleParty } from '../../store/actions'

import './index.css'

const PartyChart = props => {
  const options = {
    donut: true,
    donutWidth: 35,
    donutSolid: true,
    startAngle: 90,
    total: 349 * 2,
    showLabel: false,
    reverseData: true
  }
  const type = 'Pie'

  return (
    <div>
      <ChartistGraph type={type} options={options} data={props.data} />
    </div>
  )
}
PartyChart.propTypes = {
  data: PropTypes.shape({
    series: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number.isRequired,
        className: PropTypes.string.isRequired
      })
    ).isRequired
  })
}

const PartyChooser = ({ parties, toggleParty, selectedSeats }) => (
  <div className="party-chooser">
    {/* <RadialChart
      data={parties}
      colorType="literal"
      width={width}
      height={height}
      onValueClick={toggleParty}
    /> */}
    <PartyChart data={{ series: parties }} />
    <span>{selectedSeats}</span>
  </div>
)

PartyChooser.propTypes = {
  // parties: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     label: PropTypes.string.isRequired,
  //     angle: PropTypes.number.isRequired,
  //     color: PropTypes.string.isRequired,
  //     radius: PropTypes.number.isRequired
  //   })
  // ),
  parties: PropTypes.array.isRequired,
  toggleParty: PropTypes.func.isRequired,
  selectedSeats: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  // parties: state.parties.map(({ name, seats, color, selected = false }) => ({
  //   label: name,
  //   angle: seats,
  //   color,
  //   radius: selected ? 1 : 0.8
  // })),
  parties: state.parties.map(({ name, seats, selected }) => ({
    value: seats,
    className: `${name}${selected ? ' selected' : ''}`
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
