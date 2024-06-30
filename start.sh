#!/bin/sh

echo "OUTBOUND_TRAFFIC_ALLOW: ${OUTBOUND_TRAFFIC_ALLOW}"
echo "ALLOWED_RAM: ${ALLOWED_RAM}"

if [ -z "${OUTBOUND_TRAFFIC_ALLOW}" ] || [ "${OUTBOUND_TRAFFIC_ALLOW}" = "false" ]; then
    iptables -I OUTPUT -o eth2 -j DROP
fi

su -s /bin/sh runner -c 'node --expose-gc /usr/bin/server.js'
