import { connect } from '@dagger.io/dagger';

function urlToPath(url: URL): string {
  return url.toString().replace('file://', '');
}

const workspaceDir = urlToPath(new URL('../../', import.meta.url));

connect(
  async (client) => {
    const contextDir = client.host().directory(workspaceDir);

    // Caches
    const rootNode = client.cacheVolume('rootNode');
    const apiNode = client.cacheVolume('apiNode');
    const webNode = client.cacheVolume('webNode');
    const sharedNode = client.cacheVolume('sharedNode');
    const configNode = client.cacheVolume('configNode');

    const dbService = client
      .container()
      .from('postgres:15.3-alpine3.18')
      .withEnvVariable('POSTGRES_PASSWORD', 'weakasstest')
      .withEnvVariable('POSTGRES_USER', 'weakasstest')
      .withEnvVariable('POSTGRES_DB', 'weakasstest')
      .withExposedPort(5432)
      .asService();

    const backend = client
      .container()
      .from('mcr.microsoft.com/playwright:v1.40.0-jammy')
      .withDirectory('/src', contextDir, {
        exclude: [
          '.git',
          '.env*',
          'node_modules',
          'apps/api/node_modules',
          'apps/api/.env*',
          'apps/web/node_modules',
          'libs/config/node_modules',
          'libs/shared/node_modules',
          'libs/pipelines',
        ],
      })
      .withMountedCache('node_modules', rootNode)
      .withMountedCache('apps/api/node_modules', apiNode)
      .withMountedCache('apps/web/node_modules', webNode)
      .withMountedCache('libs/shared/node_modules', sharedNode)
      .withMountedCache('libs/config/node_modules', configNode)
      .withServiceBinding('db', dbService)
      .withEnvVariable('APP_KEY', '_AaX8Bp3Tz0BPqhup7ZonKmhnnCrQRhB')
      .withEnvVariable('APP_NAME', 'wad')
      .withEnvVariable('DATABASE_URL', 'postgres://weakasstest:weakasstest@db:5432/weakasstest')
      .withEnvVariable('DRIVE_DISK', 'local')
      .withEnvVariable('HOST', '0.0.0.0')
      .withEnvVariable('NODE_ENV', 'development')
      .withEnvVariable('PORT', '1234')
      .withEnvVariable('SESSION_COOKIE_NAME', 'wad')
      .withEnvVariable('SESSION_DRIVER', 'cookie')
      .withWorkdir('/src')
      .withExec(['yarn', 'install'])
      .withExec(['yarn', 'build:api'])
      .withExec(['yarn', 'api', 'ace', 'migration:run']);

    const e2eTests = await backend
      .withEnvVariable('CI', 'true')
      .withEnvVariable('PW_URL', 'http://localhost:1234')
      .withExec(['yarn', 'api', 'test:e2e'])
      .stderr();

    console.log(e2eTests);
  },
  { LogOutput: process.stdout },
);
