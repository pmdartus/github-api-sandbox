const request = require('./request');

const { GITHUB_SHA, GITHUB_TOKEN, GITHUB_EVENT_PATH, GITHUB_WORKSPACE } = process.env;
const event = require(GITHUB_EVENT_PATH);

const { repository } = event;
const {
    owner: { login: owner },
} = repository;
const { name: repo } = repository;

const checkName = 'My check';

const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/vnd.github.antiope-preview+json',
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    'User-Agent': 'eslint-action',
};

async function createCheck() {
    const body = {
        name: checkName,
        head_sha: GITHUB_SHA,
        status: 'completed',
        started_at: new Date(),
        completed_at: new Date(),
        conclusion: 'success',
        output: {
            title: 'Test checks',
            summary: 'There are 0 failures, 2 warnings, and 1 notices.',
            text:
                'You may have some misspelled words on lines 2 and 4. You also may want to add a section in your README about how to install your app.',
        },
    };

    const { data } = await request(
        `https://api.github.com/repos/${owner}/${repo}/check-runs`,
        {
            method: 'POST',
            headers,
            body,
        },
    );
    const { id } = data;
    return id;
}

async function run() {
    await createCheck();
}

function exitWithError(err) {
    console.error('Error', err.stack);
    // if (err.response) {
    //     console.error(err.response);
    // }
    if (err.data) {
        console.error(err.data);
    }
    process.exit(1);
}

run().catch(exitWithError);
