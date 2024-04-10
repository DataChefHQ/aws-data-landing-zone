import * as bootstrap from './bootstrap';
import * as cost from './cost-allocation-tags';
import * as deploy from './deploy';
import * as diff from './diff';

/* Only available in TS version of the package */
export const scripts = {
  bootstrap,
  diff,
  deploy,
  cost,
};