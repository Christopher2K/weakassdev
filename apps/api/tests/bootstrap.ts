/**
 * File source: https://bit.ly/3ukaHTz
 *
 * Feel free to let us know via PR, if you find something broken in this contract
 * file.
 */

import type { Config } from '@japa/runner';
import TestUtils from '@ioc:Adonis/Core/TestUtils';
import Env from '@ioc:Adonis/Core/Env';
import { assert, runFailedTests, specReporter, apiClient } from '@japa/preset-adonis';
import { browserClient } from '@japa/browser-client';

import './japaConfig';

/*
|--------------------------------------------------------------------------
| Japa Plugins
|--------------------------------------------------------------------------
|
| Japa plugins allows you to add additional features to Japa. By default
| we register the assertion plugin.
|
| Feel free to remove existing plugins or add more.
|
*/
export const plugins: Required<Config>['plugins'] = [
  assert(),
  runFailedTests(),
  apiClient(),
  browserClient({
    contextOptions: {
      baseURL: process.env.PW_URL_ADMIN ?? 'http://localhost:8001',
      ignoreHTTPSErrors: true,
    },
    runInSuites: ['e2e'],
  }),
];

/*
|--------------------------------------------------------------------------
| Japa Reporters
|--------------------------------------------------------------------------
|
| Japa reporters displays/saves the progress of tests as they are executed.
| By default, we register the spec reporter to show a detailed report
| of tests on the terminal.
|
*/
export const reporters: Required<Config>['reporters'] = [specReporter()];

/*
|--------------------------------------------------------------------------
| Runner hooks
|--------------------------------------------------------------------------
|
| Runner hooks are executed after booting the AdonisJS app and
| before the test files are imported.
|
| You can perform actions like starting the HTTP server or running migrations
| within the runner hooks
|
*/
export const runnerHooks: Pick<Required<Config>, 'setup' | 'teardown'> = {
  setup: [
    () => {
      console.debug('====================================');
      console.debug('[Setup] Load commands');
      console.debug('====================================');
      return TestUtils.ace().loadCommands();
    },
    () => {
      console.debug('====================================');
      console.debug('[Setup] Migrate / Truncate');
      console.debug('[DATABASE]', Env.get('DATABASE_URL'));
      console.debug('====================================');
      return TestUtils.db().truncate();
    },
  ],
  teardown: [],
};

/*
|--------------------------------------------------------------------------
| Configure individual suites
|--------------------------------------------------------------------------
|
| The configureSuite method gets called for every test suite registered
| within ".adonisrc.json" file.
|
| You can use this method to configure suites. For example: Only start
| the HTTP server when it is a functional suite.
*/
export const configureSuite: Required<Config>['configureSuite'] = (suite) => {
  suite.setup(async () => {
    console.debug('====================================');
    console.debug('[Setup] Suite', suite.name.toUpperCase());
    if (suite.name === 'functional') {
      console.debug('[Setup] Start HTTP');
      await TestUtils.httpServer().start();
    }

    console.debug('====================================');
  });
};
