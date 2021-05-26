# zerocoda-abusivo
A project to reserve your vaccine in Veneto in time

## Project purpose

This project was made because reserving a vaccine is very difficult in Veneto. This bots tries your codice fiscale and warns you as soon as you are able to reserve a vaccine.

## How to use it

- Clone this repo `git clone https://github.com/euberdeveloper/zerocoda-abusivo.git`
- Move to the root dir `cd zerocoda-abusivo`
- Install the npm dependencies `npm install`
- Create a `.env` similar to the `.env.example` by running `cp .env.example .env`
- Change the `.env` file with your data
- Execute the script `npm run serve`

**Note:** this bot requires **redis** database.

## The parameters

The `.env` file has hese parameters:

- __ULSS__: your ulss (es. `ulss8`, the one of Valdagno)
- __CODICE_FISCALE__: your codice fiscale
- __LAST_NUM_TESSERA_SANITARIA__: the last six digits of your tesserino sanitario (actually you can put whatever you want)
- __REDIS_HOST__: the hostname of the redis database that bullmq will use for the cron
- __REDIS_PORT__: the port of the redis database that bullmq will use for the cron
- __CRON__: the cron string that specifies how frequently the bot will check if you can reserve the vaccine (es. `*/5 * * * * *` is every 5 secs)

## License

This software is 100% legal and under the GPL license, use it only for open-source and public projects like this one.
