import cloneDeep from 'lodash/cloneDeep';

export const printSummaryToConsole = () => {
  console.log(
    `
%c========================= Cliff Effects Dev Utilities =========================

- enableDev() - Enable the Dev HUD (without needing to go to /dev)

- client      - The current value of the loaded client (a recursively frozen
                one, so that you can't change it, which could cause weirdness
                in the app)

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
      client: {
        enumerable:   true,
        configurable: true,
        get:          () => {
          return cloneDeep(clientGetter());
        },
      },
    }
  );
};
