import cloneDeep from 'lodash/cloneDeep';

export const printSummaryToConsole = () => {
  console.log(
    `
%c========================= Cliff Effects Dev Utilities =========================

- enableDev() - Enable the Dev HUD (without needing to go to /dev)

- clientClone - A deep clone of the current value of the loaded client

===============================================================================`,
    'color: blue',
  );
};

export const addEnableDevProperty = (devSetter) => {
  Object.defineProperties(
    window,
    {
      enableDev: {
        enumerable:   true,
        configurable: true,
        value:        devSetter,
      },
    }
  );
};

export const addClientGetterProperty = (clientGetter) => {
  Object.defineProperties(
    window,
    {
      clientClone: {
        enumerable:   true,
        configurable: true,
        get:          () => {
          return cloneDeep(clientGetter());
        },
      },
    }
  );
};
