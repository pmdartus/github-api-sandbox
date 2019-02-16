const { GraphQLClient } = require('graphql-request');

function gql(strings, ...keys) {
    return strings.reduce((acc, chunk, index) => {
        return acc + chunk + (keys[index] || '');
    }, '');
} 

function createGithubClient() {
    if (!process.env.GITHUB_TOKEN) {
        throw new Error(`Missing env variable GITHUB_TOKEN`);
    }

    return new GraphQLClient('https://api.github.com/graphql', {
        headers: {
            Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
            Accept: [
                // https://developer.github.com/v4/previews/#minimize-comments-preview
                'application/vnd.github.queen-beryl-preview+json'
            ].join(', ')
        },
        credentials: 'include'
    });
}

module.exports = {
    gql,
    createGithubClient,
};