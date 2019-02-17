FROM node:10-slim

LABEL "com.github.actions.name"="Test check runs"
LABEL "com.github.actions.description"="Test checks API"
LABEL "com.github.actions.icon"="cpu"
LABEL "com.github.actions.color"="orange"

LABEL "repository"="https://github.com/pmdartus/github-api-sandbox"
LABEL "homepage"="https://github.com/pmdartus/github-api-sandbox"
LABEL "maintainer"="Pierre-Marie Dartus <dartus.pierremarie@gmail.com>"

ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]