const {
  DB_USER,
  DB_PASSWORD,
  DB_CLUSTER,
  DB_NAME,
  DB_AUTH_SOURCE,
  DB_REPLICA_SET,
  NEXT_PUBLIC_NODE_ENV,
} = process.env;

const getURI = () => {
  if (NEXT_PUBLIC_NODE_ENV === 'production') {
    return `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_NAME}`;
  }

  return `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_NAME}?authSource=${DB_AUTH_SOURCE}&replicaSet=${DB_REPLICA_SET}`;
};

export default getURI;
