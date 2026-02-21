#! /bin/sh


# add other variables to be subsituted inside default.conf.tempkate
envsubst '${LISTEN_PORT} ${HASURA_URL} ${HASURA_WS} ${BE_URL} ${VITE_GOOGLE_MAPS_API_KEY}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# add other variables to be subsituted inside default.conf.tempkate

# run nginx
nginx -g 'daemon off;'
