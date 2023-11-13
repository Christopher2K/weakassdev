# WeakA\*\*Dev Monorepo!

# Requirements

1. `mkcert`
2. `nss`
3. `docker` and `docker-compose`

# Instructions (not for windows people, sorry)

0. `./init.sh`
1. `yarn install`
2. Set `127.0.0.1 api.weakassdev.test` and `127.0.0.1 weakassdev.test` in your `/etc/hosts` file
3. `cp .env.example .env`
4. `cp .env.testing apps/api/.env.test`
5. Generate a secret key using `yarn api ace generate:key` and put the key in your `.env` file
6. `yarn web prepare`
7. `yarn api prepare`
8. `yarn c:up` should start the whole stuff
9. Website should be accessible at [https://weakassdev.test](https://weaskassdev.test)
