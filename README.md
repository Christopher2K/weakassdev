# WeakA\*\*Dev Monorepo!

# Requirements

1. `mkcert`
2. `nss`
3. `docker` and `docker-compose`

# Instructions (not for windows people, sorry)

0. `./init.sh`
1. `yarn install`
2. Set `127.0.0.1 api.weakassdev.local` and `127.0.0.1 weakassdev.local` in your `/etc/hosts` file
3. `cp .env.example .env` - Generate a secret key if you want
4. `yarn web prepare`
5. `yarn c:up` should start the whole stuff
6. Website should be accessible at [https://weakassdev.local](https://weaskassdev.local)
