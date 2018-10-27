// DATA MANAGEMENT
import { setNestedProperty } from './utils/setNestedProperty';
import { cloneDeep } from 'lodash';
import { convertForUpdate } from './utils/convertForUpdate';

// Data
// import { clientList } from '../config/dummyClients';
import { CLIENT_DEFAULTS } from './utils/CLIENT_DEFAULTS';

export default class ClientModel {
  constructor() {
    this.listeners = [];
    this.data = cloneDeep(CLIENT_DEFAULTS);
    this.default = cloneDeep(CLIENT_DEFAULTS);
    this.userChanged = {};
    this.housing = this.data.current.housing;
    this.isBlocking = false;
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners.splice(this.listeners.indexOf(listener), 1);
    };
  }

  broadcast() {
    this.listeners.forEach((listener) => {
      listener({ client: this.data, isBlocking: this.isBlocking });
    });
  }

  reset() {
    this.data = cloneDeep(CLIENT_DEFAULTS);
    this.userChanged = {};
    this.housing = this.data.current.housing;
    this.isBlocking = false;

    this.broadcast();
  }

  /** Load an individual client's data. Currently, the only source of client
   * data to load is a text input field in the Dev HUD.
   * @method
   * @param {object} params
   * @param {object} params.toLoad - A JSON object representing the client data
   * to be loaded. Must match the client data format (See
   * {@link CLIENT_DEFAULTS} for an example of the correct client data format)
   */
  loadClient = ({ toLoad }) => {
    this.data = Object.assign(cloneDeep(CLIENT_DEFAULTS), toLoad);
    this.broadcast();
  };  // End loadClient()

  updateClientValue = ({ route, value, time }) => {

    var clone       = cloneDeep(this.data),
        userChanged = { ...this.userChanged },  // only 1 deep
        routeList   = route.split('/'),
        id          = routeList[ 0 ],  // `routeList` gets mutated
        newEvent    = { time: time, route: routeList, value: value };

    setNestedProperty(newEvent, clone, this.userChanged[ id ]);
    // Only set if the input was valid...? For now, always.
    // Also, userChanged should be only one step deep
    if (time === 'future') {
      userChanged[ id ] = true;
    }

    // Hack for MVP (otherwise need dependency + history system)
    let oldHousing = this.oldHousing;
    if (route === 'housing') {
      // clone housing should be right now
      oldHousing = clone.current.housing;
    }

    if (clone.current.hasSection8) {
      clone.current.housing = 'voucher';
    } else {
      // Restore housing to previous value
      clone.current.housing = oldHousing;
    }

    clone.future.housing = clone.current.housing;

    this.data = clone;
    this.userChanged = userChanged;
    this.oldHousing = oldHousing;
    this.isBlocking = true;

    this.broadcast();
  };  // End onClientChange()

  changeCurrent = (evnt, data) => {
    data.time = 'current';
    var newData = convertForUpdate(data);
    this.updateClientValue(newData);
  };

  changeFuture = (evnt, data) => {
    data.time = 'future';
    var newData = convertForUpdate(data);
    this.updateClientValue(newData);
  };
}
