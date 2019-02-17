const request = require('./request');

const { GITHUB_SHA, GITHUB_TOKEN, GITHUB_EVENT_PATH, GITHUB_WORKSPACE } = process.env;
const event = require(GITHUB_EVENT_PATH);

const { repository } = event;
const {
    owner: { login: owner },
} = repository;
const { name: repo } = repository;

const checkName = 'Performance checks';

const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/vnd.github.antiope-preview+json',
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    'User-Agent': 'eslint-action',
};

const text = `
## Summary results

### :white_check_mark: Improvements

benchmark | base(\`808471b\`) | target(\`3440432\`) | trend
--- | --- | --- | ---
benchmark-table-wc/append/1k | 273.95 (±26.20 ms) | 255.65 (±6.60 ms) | -18.3ms (6.7%)
benchmark-table-wc/clear/1k | 38.70 (±4.55 ms) | 22.55 (±2.60 ms) | -16.2ms (41.7%)

### :x: Regressions

benchmark | base(\`808471b\`) | target(\`3440432\`) | trend
--- | --- | --- | ---
benchmark-table/create/10k | 883.35 (±5.50 ms) | 889.55 (±7.75 ms) | +6.2ms (0.7%)
benchmark-table-component/append/1k | 247.80 (±14.10 ms) | 253.70 (±5.35 ms) | +5.9ms (2.4%)
benchmark-table-component/create/10k | 1788.25 (±11.30 ms) | 1806.85 (±10.75 ms) | +18.6ms (1.0%)
benchmark-table-component/create/1k | 214.90 (±5.75 ms) | 220.50 (±6.10 ms) | +5.6ms (2.6%)


## Full results

<details>
 <summary>Full result</summary>
 
benchmark | base(\`808471b\`) | target(\`3440432\`) | trend
--- | --- | --- | ---
benchmark-table/append/1k | 151.55(±3.80 ms) | 150.05 (±4.05 ms) | -1.5ms (1.0%) 👌
benchmark-table/clear/1k | 6.20 (±0.40 ms) | 5.95 (±0.25 ms) | -0.3ms (4.0%) 👌
benchmark-table/create/10k | 883.35 (±5.50 ms) | 889.55 (±7.75 ms) | +6.2ms (0.7%) 👎
benchmark-table/create/1k | 117.75 (±2.55 ms) | 116.60 (±3.30 ms) | -1.2ms (1.0%) 👌
benchmark-table/update-10th/1k | 85.60 (±1.35 ms) | 83.95 (±3.50 ms) | -1.6ms (1.9%) 👍
benchmark-table-component/append/1k | 247.80 (±14.10 ms) | 253.70 (±5.35 ms) | +5.9ms (2.4%) 👎
benchmark-table-component/clear/1k | 11.45 (±1.30 ms) | 12.10 (±2.10 ms) | +0.7ms (5.7%) 👌
benchmark-table-component/create/10k | 1788.25 (±11.30 ms) | 1806.85 (±10.75 ms) | +18.6ms (1.0%) 👎
benchmark-table-component/create/1k | 214.90 (±5.75 ms) | 220.50 (±6.10 ms) | +5.6ms (2.6%) 👎
benchmark-table-component/update-10th/1k | 70.55 (±5.50 ms) | 70.35 (±5.25 ms) | -0.2ms (0.3%) 👌
benchmark-table-wc/append/1k | 273.95 (±26.20 ms) | 255.65 (±6.60 ms) | -18.3ms (6.7%) 👍
benchmark-table-wc/clear/1k | 38.70 (±4.55 ms) | 22.55 (±2.60 ms) | -16.2ms (41.7%) 👍
benchmark-table-wc/create/10k | 2017.10 (±18.45 ms) | 2013.70 (±22.25 ms) | -3.4ms (0.2%) 👌
benchmark-table-wc/create/1k | 228.75 (±5.10 ms) | 229.15 (±4.80 ms) | +0.4ms (0.2%) 👌
benchmark-table-wc/update-10th/1k | 67.45 (±5.25 ms) | 70.20 (±4.40 ms) | +2.7ms (4.1%) 👌

</details>
`;

async function createCheck() {
    const body = {
        name: checkName,
        head_sha: GITHUB_SHA,
        status: 'completed',
        started_at: new Date(),
        completed_at: new Date(),
        conclusion: 'failure',
        output: {
            title: 'Performance benchmark',
            summary: 'There are 4 benchmarks that regressed and 2 benchmarks improved.',
            text,
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
