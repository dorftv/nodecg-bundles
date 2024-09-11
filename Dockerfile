FROM node:18

USER root

WORKDIR /nodecg

RUN npm install -g \
    npm@latest \
    nodecg-cli@latest \
    yo@latest \
    generator-nodecg@latest


RUN nodecg setup

# remove when https://github.com/nodecg/nodecg/issues/746 is fixed
RUN npm install cheerio@1.0.0-rc.12

CMD ["nodejs", "index.js"]
