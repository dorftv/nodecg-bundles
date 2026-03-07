FROM node:18

WORKDIR /opt/nodecg

RUN git clone https://github.com/nodecg/nodecg.git . \
    && git checkout v2.5.3 \
    && npm ci \
    && npm run build

COPY ./bundles /opt/nodecg/bundles

EXPOSE 9090

CMD ["node", "index.js"]
