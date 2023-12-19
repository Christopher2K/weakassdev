# Tests

## API tests

API tests are all under `/apps/api/tests/*`. Every folder there corresponds to a specific part of
the test pyramid:

- unit
- functional
- e2e / integration

### Unit and functionnals tests

Running `unit` and `functionnal` tests is pretty easy. During developement, those tests should be
run inside the docker container. To get inside the container, your can hit the `yarn c:ex bash`
command. It will give you access to a bash process inside the developement container. From here.
`yarn api test:docker` is the base command. It will load and run the `unit` and the `functionnal`
suite and execute them. The database used is the one defined as `db-test` in the
`dev/docker/docker-compose.yml` file.

### E2E tests

Running e2e test is a bit more difficult. The admin space is build using `Inertia` and `Adonis`. You
will need the frontend asset compilation step before running the `e2e` suite. To do so, there is
another compose file your can run that will setup everything you need: apps, db and frontend. Follow
those steps:

1. Stop the regular compose file
2. Start the test app using the `yarn compose:test up`.
3. From here, if you run `yarn api e2e:local`, it should work as expected

### Debug

> I can't pass any argument to japa using the browser client.

That's a known bug on Adonis V5, go to `apps/api/test.ts` and replace the line
`processCliArgs(process.argv.slice(3))` by
`processCliArgs([...process.argv.slice(2), '--anyArgYouWannaPass'])`.
