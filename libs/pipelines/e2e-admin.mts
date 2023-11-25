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

    const backendService = contextDir
      .dockerBuild({
        dockerfile: 'Dockerfile.backend',
        buildArgs: [
          { name: 'APP_KEY', value: '_AaX8Bp3Tz0BPqhup7ZonKmhnnCrQRhB' },
          {
            name: 'DATABASE_URL',
            value: 'postgres://weakasstest:weakasstest@db:5432/weakasstest',
          },
          {
            name: 'PORT',
            value: '1234',
          },
          {
            name: 'NODE_ENV',
            value: 'production',
          },
        ],
      })
      .withServiceBinding('db', dbService)
      .withExposedPort(1234)
      .withEnvVariable('SESSION_DRIVER', 'cookie')
      .withEnvVariable('SESSION_COOKIE_NAME', 'wad')
      .asService();

    const backendHostname = await backendService.endpoint({ port: 1234, scheme: 'http' });

    const testRunner = await client
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
      .withServiceBinding('app', backendService)
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
      .withEnvVariable('CI', 'true')
      .withEnvVariable('PW_URL_ADMIN', backendHostname)
      .withExec(['yarn', 'api', 'e2e'])
      .stderr();

    console.log(testRunner);
  },
  { LogOutput: process.stdout },
);
