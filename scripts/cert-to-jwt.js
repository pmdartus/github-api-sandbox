/**
 * NodeJS implementation of the ruby script
 * https://developer.github.com/apps/building-github-apps/authenticating-with-github-apps/#authenticating-as-a-github-app
 */
require('dotenv').config();

const fs = require('fs');
const path = require('path');

const App = require('@octokit/app');

const app = new App({
    id: process.env.GITHUB_APP_CLIENT_ID,
    privateKey: fs.readFileSync(path.resolve(__dirname, '../sandbox-github-app.private-key.pem'))
});

module.exports = {
    async getInstallationToken(installationId) {
        return app.getInstallationAccessToken({
            installationId
        });
    }
}