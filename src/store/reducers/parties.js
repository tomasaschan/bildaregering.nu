import { TOGGLE_PARTY } from '../actions'

const initialState = [
  { name: 'Sverigedemokraterna', seats: 62, color: '#dddd00' },
  {
    name: 'Kristdemokraterna',
    seats: 22,
    color: '#231977',
    hated: ['Vänsterpartiet']
  },
  {
    name: 'Moderaterna',
    seats: 70,
    color: '#1B49DD',
    hated: ['Vänsterpartiet']
  },
  {
    name: 'Liberalerna',
    seats: 20,
    color: '#6BB7EC',
    hated: ['Vänsterpartiet', 'Sverigedemokraterna']
  },
  {
    name: 'Centerpartiet',
    seats: 31,
    color: '#009933',
    hated: ['Vänsterpartiet', 'Sverigedemokraterna']
  },
  {
    name: 'Miljöpartiet',
    seats: 16,
    color: '#83CF39',
    hated: ['Sverigedemokraterna']
  },
  {
    name: 'Socialdemokraterna',
    seats: 100,
    color: '#EE2020',
    hated: ['Sverigedemokraterna']
  },
  {
    name: 'Vänsterpartiet',
    seats: 28,
    color: '#AF0000',
    hated: ['Sverigedemokraterna']
  }
]

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case TOGGLE_PARTY:
      return state.map(
        party =>
          party.name === action.party
            ? { ...party, selected: !party.selected }
            : { ...party }
      )
    default:
      return state
  }
}
