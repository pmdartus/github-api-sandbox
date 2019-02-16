const { GraphQLClient } = require('graphql-request');

const { getInstallationToken } = require('../scripts/cert-to-jwt');

function gql(strings, ...keys) {
    return strings.reduce((acc, chunk, index) => {
        return acc + chunk + (keys[index] || '');
    }, '');
} 

async function createGithubClient() {
    const token = await getInstallationToken('673335');

    return new GraphQLClient('https://api.github.com/graphql', {
        headers: {
            Authorization: `bearer ${token}`,
            Accept: [
                // https://developer.github.com/v4/previews/#minimize-comments-preview
                'application/vnd.github.queen-beryl-preview+json',

                // https://developer.github.com/v4/previews/#checks
                'application/vnd.github.antiope-preview+json'
            ].join(', ')
        },
        credentials: 'include'
    });
}

module.exports = {
    gql,
    createGithubClient,
};