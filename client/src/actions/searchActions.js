import axios from '../services/api';
import types from './_types'

export function setLastLocation(location) {
  return dispatch => {
    axios
      .put('/api/users/setLastLocation', location)
      .then(user => {
        dispatch({ type: types.UPDATE_USER_SUCCESS, payload: user.data });
      })
      .catch(error => {
        console.error('Erro ao obter dados do item: ', error);
      });
  };
}

export function searchUsers(radius) {
  return dispatch => {
    axios
      .get(`/api/users/search/searchNearbyUsers?radius=${radius}`)
      .then(users => {
        dispatch({ type: types.SEARCH_NEARBY_USERS, payload: users.data });
      })
      .catch(error => {
        console.error('Erro ao obter usuários pŕoximos: ', error);
      });
  };
}
