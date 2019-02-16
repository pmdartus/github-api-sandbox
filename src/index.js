require('dotenv').config();

const queries = require('./queries');
const mutations = require('./mutations');

const { createGithubClient } = require('./utils');

async function main() {
    const client = createGithubClient();

    const res = await client.request(mutations.minimizeComment);

    console.dir(res, {
        depth: 10
    });
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
