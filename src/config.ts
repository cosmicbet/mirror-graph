const {
  ORM,
  SERVER_PORT,
  TERRA_URL,
  TERRA_LCD,
  TERRA_CHAINID,
  SENTRY_DSN,
  ENCRYPT_KEY,
} = process.env

const config = {
  ORM: ORM || 'default',
  PORT: SERVER_PORT ? +SERVER_PORT : 3858,
  TERRA_URL,
  TERRA_LCD,
  TERRA_CHAINID,
  SENTRY_DSN,
  ENCRYPT_KEY,
}

export default config
