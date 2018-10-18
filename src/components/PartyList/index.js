import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './index.css'
import { toggleParty } from '../../store/actions'

const Party = ({ name, seats, color, selected, onClick }) => (
  <li
    onClick={onClick}
    style={selected ? { backgroundColor: color } : {}}
    className={`${selected ? 'selected' : ''}`}
  >
    <span>
      {name} ({seats})
    </span>
  </li>
)

const partyProps = {
  name: PropTypes.string.isRequired,
  seats: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  selected: PropTypes.bool
}

Party.propTypes = {
  ...partyProps,
  onClick: PropTypes.func.isRequired
}

const PartyList = ({ parties, toggle }) => (
  <ul className="party-list">
    {parties.map(party => (
      <Party key={party.name} {...party} onClick={toggle(party.name)} />
    ))}
  </ul>
)

PartyList.propTypes = {
  parties: PropTypes.arrayOf(PropTypes.shape(partyProps)).isRequired,
  toggle: PropTypes.func.isRequired
}

export default connect(
  ({ parties }) => ({
    parties: [...parties].sort((a, b) => a.seats < b.seats)
  }),
  dispatch => ({
    toggle: name => () => dispatch(toggleParty(name))
  })
)(PartyList)
