FROM node:10-slim

LABEL "com.github.actions.name"="Test checks"
LABEL "com.github.actions.description"="Test check apis"
LABEL "com.github.actions.icon"="archive"
LABEL "com.github.actions.color"="red"

LABEL "repository"="https://github.com/pmdartus/github-api-sandbox"
LABEL "homepage"="https://github.com/pmdartus/github-api-sandbox"
LABEL "maintainer"="Pierre-Marie Dartus <dartus.pierremarie@gmail.com>"

ADD entrypoint.sh /entrypoint.sh
ADD request.js /request.js
ADD run.js /run.js
ENTRYPOINT ["/entrypoint.sh"]