import { connect } from '@dagger.io/dagger';

function urlToPath(url: URL): string {
  return url.toString().replace('file://', '');
}

const workspaceDir = urlToPath(new URL('../../', import.meta.url));

// initialize Dagger client
connect(
  async (client) => {
    const contextDir = client.host().directory(workspaceDir);

    // SET UP SERVICES
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
        ],
      })
      .withServiceBinding('db', dbService)
      .withExposedPort(1234)
      .withEnvVariable('SESSION_DRIVER', 'cookie')
      .withEnvVariable('SESSION_COOKIE_NAME', 'wad')
      .asService();

    const backendAddr = await backendService.endpoint({ port: 1234, scheme: 'http' });

    const source = client
      .container()
      .from('mcr.microsoft.com/playwright:v1.40.0-jammy')
      .withDirectory('/src', contextDir, {
        exclude: [
          '.git',
          'node_modules',
          'apps/api/node_modules',
          'apps/web/node_modules',
          'libs/config/node_modules',
          'libs/shared/node_modules',
          'libs/pipelines',
        ],
      });

    const runner = source.withWorkdir('/src').withExec(['yarn', 'install']);

    const out = await runner
      .withEnvVariable('CI', 'true')
      .withServiceBinding('backend', backendService)
      .withEnvVariable('PW_URL', backendAddr)
      .withExec(['yarn', 'api', 'playwright', 'test'])
      .stderr();

    console.log(out);
  },
  { LogOutput: process.stdout },
);
